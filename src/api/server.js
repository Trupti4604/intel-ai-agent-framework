// src/api/server.js
const express = require('express');
const path = require('path');

const Orchestrator = require('../core/Orchestrator');
const Workflow = require('../core/Workflow');
const Task = require('../core/Task');
const MemoryStore = require('../memory/MemoryStore');

class APIServer {
  constructor(port = 3000) {
    this.app = express();
    this.port = port;
    this.orchestrator = new Orchestrator();
    this.memory = new MemoryStore();
    this.workflows = new Map();

    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    // Parse JSON requests
    this.app.use(express.json());

    // Serve UI files (optional dashboard)
    this.app.use(express.static(path.join(__dirname, '../../ui')));

    // Simple request logging
    this.app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }

  setupRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
      });
    });

    // Metrics & observability
    this.app.get('/metrics', (req, res) => {
      const metrics = this.orchestrator.getMetrics();
      res.json({
        orchestrator: metrics,
        activeWorkflows: this.workflows.size,
        timestamp: new Date().toISOString()
      });
    });

    // Execute a workflow
    this.app.post('/execute', async (req, res) => {
      try {
        const { workflowId, input } = req.body;

        const workflow = new Workflow(workflowId);

        workflow.addTask(
          new Task({
            id: 'process',
            name: 'Process Input',
            action: async (state) => {
              return {
                processed: true,
                data: state.input
              };
            }
          })
        );

        const result = await this.orchestrator.execute(workflow, input);
        res.json(result);

      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Execution status (basic demo)
    this.app.get('/status/:id', (req, res) => {
      res.json({
        executionId: req.params.id,
        status: 'completed'
      });
    });

    // View combined logs (audit support)
    this.app.get('/logs', (req, res) => {
      res.sendFile(
        path.join(__dirname, '../../logs/combined.log')
      );
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`   API Server running at http://localhost:${this.port}`);
      console.log(`   UI Dashboard: http://localhost:${this.port}`);
      console.log(`   Health:       http://localhost:${this.port}/health`);
      console.log(`   Metrics:      http://localhost:${this.port}/metrics`);
      console.log(`   Logs:         http://localhost:${this.port}/logs`);
    });
  }
}

// Start server if run directly
if (require.main === module) {
  const server = new APIServer();
  server.start();
}

module.exports = APIServer;

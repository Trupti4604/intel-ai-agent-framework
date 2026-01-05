const winston = require("winston");
const { v4: uuidv4 } = require("uuid");

class Orchestrator {
  constructor(config = {}) {
    this.config = {
      enableMetrics: true,
      maxRetries: 3,
      timeout: 30000,
      ...config
    };

    //  Metrics storage
    this.metrics = {
      totalExecutions: 0,
      successfulExecutions: 0,
      failedExecutions: 0,
      totalExecutionTime: 0
    };

    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/orchestrator.log" })
      ]
    });

    this.logger.info("Orchestrator initialized", { config: this.config });
  }

  async execute(workflow, agent) {
    const executionId = uuidv4();
    const startTime = Date.now();

    //  Increment execution count
    this.metrics.totalExecutions++;

    try {
      const executionOrder = workflow.getExecutionOrder();

      this.logger.info("Starting workflow execution", {
        executionId,
        workflowId: workflow.id,
        taskCount: executionOrder.length
      });

      let context = {};

      for (const task of executionOrder) {
        this.logger.info(`Executing task: ${task.name}`);

        // Supports Agent OR benchmark execution
        if (agent && typeof agent.executeTask === "function") {
          context = await agent.executeTask(task, context);
        } else {
          const result = await task.run(context);
          context = { ...context, ...result };
        }
      }

      const duration = Date.now() - startTime;

      //  Update success metrics
      this.metrics.successfulExecutions++;
      this.metrics.totalExecutionTime += duration;

      this.logger.info("Workflow execution completed", {
        executionId,
        duration
      });

      return {
        executionId,
        duration,
        result: context
      };

    } catch (error) {
      //  Update failure metrics
      this.metrics.failedExecutions++;

      this.logger.error("Workflow execution failed", {
        executionId,
        error: error.message
      });

      throw error;
    }
  }

  //  REQUIRED for /metrics API
  getMetrics() {
    return {
      ...this.metrics,
      averageExecutionTime:
        this.metrics.successfulExecutions > 0
          ? Math.round(
              this.metrics.totalExecutionTime /
              this.metrics.successfulExecutions
            )
          : 0
    };
  }
}

module.exports = Orchestrator;

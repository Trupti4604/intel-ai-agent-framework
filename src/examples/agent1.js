// src/examples/agent1.js
const Agent = require('../core/Agent');
const Task = require('../core/Task');

async function runDataProcessingAgent() {
  console.log('='.repeat(60));
  console.log(' DATA PROCESSING AGENT - ETL Pipeline');
  console.log('='.repeat(60));

  const agent = new Agent({
    name: 'Data Processing Agent',
    id: 'agent-etl-001'
  });

  const fetchTask = new Task({
    id: 'fetch',
    name: 'Fetch Data',
    action: async (state) => {
      console.log('   Fetching data from source...');
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        records: [
          { id: 1, value: 100, category: 'A' },
          { id: 2, value: 200, category: 'B' },
          { id: 3, value: 50, category: 'A' },
          { id: 4, value: 300, category: 'C' }
        ]
      };
    }
  });

  const transformTask = new Task({
    id: 'transform',
    name: 'Transform Data',
    dependencies: ['fetch'],
    action: async (state) => {
      console.log('   Transforming data...');
      const records = state.previousResult.result.records;
      const transformed = records.map(r => ({
        ...r,
        value: r.value * 1.1,
        processed: true
      }));
      return { transformed };
    }
  });

  const filterTask = new Task({
    id: 'filter',
    name: 'Filter Data',
    dependencies: ['transform'],
    action: async (state) => {
      console.log('   Filtering data...');
      const data = state.previousResult.result.transformed;
      const filtered = data.filter(r => r.value > 100);
      return { filtered, count: filtered.length };
    }
  });

  const saveTask = new Task({
    id: 'save',
    name: 'Save Results',
    dependencies: ['filter'],
    action: async (state) => {
      console.log('   Saving results...');
      const data = state.previousResult.result;
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        saved: true,
        recordCount: data.count,
        timestamp: new Date().toISOString()
      };
    }
  });

  agent.setWorkflow([fetchTask, transformTask, filterTask, saveTask]);

  const result = await agent.execute({
    source: 'database-001',
    batchId: 'batch-2025-001'
  });

  console.log('\n EXECUTION SUMMARY:');
  console.log('  Status:', result.success ? ' SUCCESS' : ' FAILED');
  console.log('  Duration:', result.duration + 'ms');
  console.log('  Records Processed:', result.result.results.save.result.recordCount);
  
  const metrics = await agent.getMetrics();
  console.log('\n AGENT METRICS:');
  console.log('  Total Executions:', metrics.executionsCompleted);
  console.log('  Success Rate:', metrics.successRate.toFixed(2) + '%');
  console.log('  Avg Duration:', metrics.averageDuration.toFixed(0) + 'ms');
  
  console.log('\n' + '='.repeat(60));
}

runDataProcessingAgent().catch(console.error);

module.exports = runDataProcessingAgent;
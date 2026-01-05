// src/examples/agent2.js
const Agent = require('../core/Agent');
const Task = require('../core/Task');

async function runCustomerSupportAgent() {
  console.log('='.repeat(60));
  console.log(' CUSTOMER SUPPORT AGENT - Query Handler');
  console.log('='.repeat(60));

  const agent = new Agent({
    name: 'Customer Support Agent',
    id: 'agent-support-001'
  });

  const analyzeTask = new Task({
    id: 'analyze',
    name: 'Analyze Query',
    action: async (state) => {
      console.log('   Analyzing customer query...');
      const query = state.input.query;
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        intent: 'product_inquiry',
        sentiment: 'neutral',
        priority: 'medium',
        keywords: ['product', 'price', 'availability']
      };
    }
  });

  const searchTask = new Task({
    id: 'search',
    name: 'Search Knowledge Base',
    dependencies: ['analyze'],
    action: async (state) => {
      console.log('   Searching knowledge base...');
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        articles: [
          { id: 'kb-001', title: 'Product Pricing Guide', relevance: 0.95 },
          { id: 'kb-002', title: 'Availability FAQ', relevance: 0.88 }
        ],
        bestMatch: 'kb-001'
      };
    }
  });

  const respondTask = new Task({
    id: 'respond',
    name: 'Generate Response',
    dependencies: ['search'],
    action: async (state) => {
      console.log('   Generating response...');
      const analysis = state.results.analyze.result;
      const searchResults = state.previousResult.result;
      
      return {
        response: 'Based on our pricing guide, I can help you with product information.',
        confidence: 0.92,
        sourceArticle: searchResults.bestMatch,
        suggestedActions: ['view_pricing', 'check_stock']
      };
    }
  });

  const logTask = new Task({
    id: 'log',
    name: 'Log Interaction',
    dependencies: ['respond'],
    action: async (state) => {
      console.log('   Logging interaction...');
      return {
        logged: true,
        ticketId: 'TKT-' + Date.now(),
        timestamp: new Date().toISOString()
      };
    }
  });

  agent.setWorkflow([analyzeTask, searchTask, respondTask, logTask]);

  const result = await agent.execute({
    query: 'What is the price of your premium product?',
    customerId: 'CUST-12345',
    channel: 'web'
  });

  console.log('\n EXECUTION SUMMARY:');
  console.log('  Status:', result.success ? ' SUCCESS' : ' FAILED');
  console.log('  Duration:', result.duration + 'ms');
  console.log('  Response:', result.result.results.respond.result.response);
  console.log('  Confidence:', (result.result.results.respond.result.confidence * 100).toFixed(1) + '%');
  
  const metrics = await agent.getMetrics();
  console.log('\n AGENT METRICS:');
  console.log('  Total Executions:', metrics.executionsCompleted);
  console.log('  Success Rate:', metrics.successRate.toFixed(2) + '%');
  console.log('  Avg Duration:', metrics.averageDuration.toFixed(0) + 'ms');
  
  console.log('\n' + '='.repeat(60));
}

runCustomerSupportAgent().catch(console.error);

module.exports = runCustomerSupportAgent;
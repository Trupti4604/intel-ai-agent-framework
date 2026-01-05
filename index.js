// index.js
const Agent = require('./src/core/Agent');
const Task = require('./src/core/Task');

async function quickDemo() {
  console.log('\n🚀 Intel AI Agent Framework - Quick Demo\n');

  const agent = new Agent({
    name: 'Quick Demo Agent',
    id: 'demo-001'
  });

  const reverseTask = new Task({
    id: 'reverse',
    name: 'Reverse String',
    action: async (state) => {
      const text = state.input.text;
      return text.split('').reverse().join('');
    }
  });

  agent.setWorkflow([reverseTask]);

  const result = await agent.execute({
    text: 'HELLO WORLD!!!'
  });

  if (result.success) {
    console.log('✅ Results:', result.result.results.reverse.result);
    console.log('⏱️  Duration:', result.duration + 'ms\n');
  } else {
    console.error('❌ Error:', result.error);
  }
}

if (require.main === module) {
  quickDemo().catch(console.error);
}

module.exports = quickDemo;
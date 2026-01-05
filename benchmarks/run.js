// benchmarks/run.js
const Orchestrator = require('../src/core/Orchestrator');
const Workflow = require('../src/core/Workflow');
const Task = require('../src/core/Task');

class Benchmark {
  constructor(name) {
    this.name = name;
    this.results = [];
  }

  async runBenchmark(fn, iterations = 10) {
    console.log(`\nRunning benchmark: ${this.name}`);
    console.log('-'.repeat(50));
    
    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      await fn();
      const duration = Date.now() - start;
      this.results.push(duration);
      process.stdout.write(`  Run ${i + 1}/${iterations}: ${duration}ms\r`);
    }
    
    console.log('\n');
    this.printStats();
  }

  printStats() {
    const avg = this.results.reduce((a, b) => a + b, 0) / this.results.length;
    const min = Math.min(...this.results);
    const max = Math.max(...this.results);
    const sorted = [...this.results].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    
    console.log(' Statistics:');
    console.log(`  Average: ${avg.toFixed(2)}ms`);
    console.log(`  Median:  ${median}ms`);
    console.log(`  Min:     ${min}ms`);
    console.log(`  Max:     ${max}ms`);
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log(' INTEL AI AGENT FRAMEWORK - PERFORMANCE BENCHMARKS');
  console.log('='.repeat(60));

  // Benchmark 1: Linear Workflow
  const bench1 = new Benchmark('Linear Workflow (4 tasks)');
  await bench1.runBenchmark(async () => {
    const orchestrator = new Orchestrator();
    const workflow = new Workflow('linear-test');
    
    for (let i = 1; i <= 4; i++) {
      workflow.addTask(new Task({
        id: `task${i}`,
        name: `Task ${i}`,
        dependencies: i > 1 ? [`task${i-1}`] : [],
        action: async () => {
          await new Promise(r => setTimeout(r, 10));
          return { result: i };
        }
      }));
    }
    
    await orchestrator.execute(workflow, { test: true });
  }, 10);

  // Benchmark 2: Parallel Workflow
  const bench2 = new Benchmark('Parallel Workflow (4 tasks)');
  await bench2.runBenchmark(async () => {
    const orchestrator = new Orchestrator();
    const workflow = new Workflow('parallel-test');
    
    for (let i = 1; i <= 4; i++) {
      workflow.addTask(new Task({
        id: `task${i}`,
        name: `Task ${i}`,
        action: async () => {
          await new Promise(r => setTimeout(r, 10));
          return { result: i };
        }
      }));
    }
    
    await orchestrator.execute(workflow, { test: true });
  }, 10);

  // Benchmark 3: Complex DAG
  const bench3 = new Benchmark('Complex DAG (8 tasks)');
  await bench3.runBenchmark(async () => {
    const orchestrator = new Orchestrator();
    const workflow = new Workflow('complex-test');
    
    workflow.addTask(new Task({
      id: 'a',
      name: 'Task A',
      action: async () => ({ result: 'a' })
    }));
    
    workflow.addTask(new Task({
      id: 'b',
      name: 'Task B',
      dependencies: ['a'],
      action: async () => ({ result: 'b' })
    }));
    
    workflow.addTask(new Task({
      id: 'c',
      name: 'Task C',
      dependencies: ['a'],
      action: async () => ({ result: 'c' })
    }));
    
    workflow.addTask(new Task({
      id: 'd',
      name: 'Task D',
      dependencies: ['b', 'c'],
      action: async () => ({ result: 'd' })
    }));
    
    await orchestrator.execute(workflow, { test: true });
  }, 10);

  console.log('\n' + '='.repeat(60));
  console.log(' BENCHMARK COMPLETE');
  console.log('='.repeat(60));
  console.log('\n Performance Optimization Opportunities:');
  console.log('  1. Intel DevCloud deployment for scalability');
  console.log('  2. OpenVINO optimization for ML models');
  console.log('  3. Apache Kafka for distributed messaging');
  console.log('  4. Task-level parallelization improvements');
  console.log('\n');
}

main().catch(console.error);

module.exports = { Benchmark };
Intel AI Agent Framework
1. Project Objective

To design and implement a custom AI Agent Framework that can define, orchestrate, execute, and monitor agentic workflows without using existing agent frameworks such as CrewAI, AutoGen, or n8n.

2. What This Framework Does

- Breaks a problem into tasks

- Organizes tasks into workflows

- Executes tasks sequentially or in parallel

- Tracks execution using logs and metrics

- Supports retries and timeouts

- Can be extended with new agents, tasks, or tools

3. Key Components
# Task

- Smallest unit of work

- Contains logic to process data

# Workflow

- Collection of tasks

- Defines execution order (linear / parallel / DAG)

# Orchestrator

- Controls workflow execution

- Handles retries, timeouts, and failures

- Records execution metrics

# Memory

- Stores intermediate task outputs

- Maintains execution context

4. Architecture Flow
API Request → Orchestrator → Workflow → Tasks → Result

5. API Support

The framework provides REST APIs to:

- Check system health

- View execution metrics

- Execute workflows programmatically

6. Observability

- Structured logging using Winston

- Execution time measurement

- Success and failure tracking

7. Benchmarking

Performance benchmarks are included to evaluate:

i. Linear workflows

ii. Parallel workflows

iii. Complex DAG workflows

Command:

npm run benchmark

8. Extensibility

- New tasks can be added without modifying core code

- New workflows can be defined dynamically

- Designed to support multi-agent and human-in-the-loop extensions

9. Conclusion

This project fulfills all requirements of Problem Statement – 2 by delivering a scalable, extensible, and observable AI Agent Framework ready for academic submission and future enhancements.
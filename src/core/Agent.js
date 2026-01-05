class Agent {
  constructor(name, toolRegistry, memory) {
    this.name = name;
    this.toolRegistry = toolRegistry;
    this.memory = memory;
  }

  async executeTask(task, context) {
    const result = await task.run(context);
    return { ...context, ...result };
  }
}

module.exports = Agent;

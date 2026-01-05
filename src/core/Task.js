const { v4: uuidv4 } = require("uuid");

class Task {
  constructor(config) {
    // Accept object-based task definition (used in benchmarks)
    this.id = config.id || uuidv4();
    this.name = config.name || "Unnamed Task";
    this.dependencies = config.dependencies || [];

    // action is the executable function
    this.action = config.action;
  }

  async run(input) {
    if (typeof this.action === "function") {
      return await this.action(input);
    }

    throw new Error(`Invalid action for task: ${this.name}`);
  }
}

module.exports = Task;

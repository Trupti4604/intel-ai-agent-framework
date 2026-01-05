const { v4: uuidv4 } = require("uuid");

class Workflow {
  constructor(name = "workflow") {
    this.id = uuidv4();
    this.name = name;
    this.tasks = [];
    this.dependencies = new Map();
  }

  addTask(task) {
    this.tasks.push(task);
    this.dependencies.set(task.id, task.dependencies || []);
  }

  getExecutionOrder() {
    const visited = new Set();
    const order = [];

    const visit = (task) => {
      if (visited.has(task.id)) return;

      const deps = this.dependencies.get(task.id) || [];
      for (const depId of deps) {
        const depTask = this.tasks.find(t => t.id === depId);
        if (depTask) visit(depTask);
      }

      visited.add(task.id);
      order.push(task);
    };

    for (const task of this.tasks) {
      visit(task);
    }

    return order;
  }
}

module.exports = Workflow;

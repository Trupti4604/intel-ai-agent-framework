// src/memory/MemoryStore.js

class MemoryStore {
  constructor() {
    this.storage = new Map();
    this.metadata = {
      createdAt: new Date().toISOString(),
      totalWrites: 0,
      totalReads: 0
    };
  }

  async store(workflowId, taskId, data) {
    const key = `${workflowId}:${taskId}`;
    const entry = {
      workflowId,
      taskId,
      data,
      timestamp: new Date().toISOString()
    };
    
    this.storage.set(key, entry);
    this.metadata.totalWrites++;
    
    return entry;
  }

  async retrieve(workflowId, taskId = null) {
    this.metadata.totalReads++;
    
    if (taskId) {
      const key = `${workflowId}:${taskId}`;
      return this.storage.get(key) || null;
    }

    // Retrieve all tasks for workflow
    const results = [];
    for (let [key, value] of this.storage) {
      if (key.startsWith(`${workflowId}:`)) {
        results.push(value);
      }
    }
    
    return results;
  }

  async clear(workflowId) {
    let deletedCount = 0;
    
    for (let key of this.storage.keys()) {
      if (key.startsWith(`${workflowId}:`)) {
        this.storage.delete(key);
        deletedCount++;
      }
    }
    
    return { deletedCount };
  }

  async clearAll() {
    const size = this.storage.size;
    this.storage.clear();
    return { deletedCount: size };
  }

  getStats() {
    const entries = Array.from(this.storage.values());
    const workflows = new Set(entries.map(e => e.workflowId));
    
    return {
      totalEntries: this.storage.size,
      totalWorkflows: workflows.size,
      memorySize: JSON.stringify(entries).length,
      ...this.metadata
    };
  }

  async search(query) {
    const results = [];
    
    for (let [key, value] of this.storage) {
      const dataStr = JSON.stringify(value).toLowerCase();
      if (dataStr.includes(query.toLowerCase())) {
        results.push(value);
      }
    }
    
    return results;
  }
}

module.exports = MemoryStore;
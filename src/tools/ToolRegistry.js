// src/tools/ToolRegistry.js
class ToolRegistry {
  constructor() {
    this.tools = new Map();
  }

  register(name, toolFunction, metadata = {}) {
    if (typeof toolFunction !== 'function') {
      throw new Error(`Tool ${name} must be a function`);
    }

    this.tools.set(name, {
      name,
      function: toolFunction,
      metadata
    });

    return this;
  }

  async execute(name, params = {}, context = {}) {
    const tool = this.tools.get(name);
    
    if (!tool) {
      throw new Error(`Tool not found: ${name}`);
    }

    try {
      const result = await tool.function(params, context);
      return {
        success: true,
        tool: name,
        result
      };
    } catch (error) {
      throw new Error(`Tool ${name} failed: ${error.message}`);
    }
  }

  get(name) {
    return this.tools.get(name);
  }

  has(name) {
    return this.tools.has(name);
  }

  list() {
    return Array.from(this.tools.values()).map(tool => ({
      name: tool.name,
      description: tool.metadata.description || ''
    }));
  }
}

const toolRegistry = new ToolRegistry();

toolRegistry.register(
  'fetch_data',
  async (params) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return { data: `Fetched: ${params.url || 'default'}` };
  },
  { description: 'Fetch data from URL' }
);

toolRegistry.register(
  'transform_data',
  async (params) => {
    const { data, operation } = params;
    if (operation === 'uppercase') {
      return { result: JSON.stringify(data).toUpperCase() };
    } else if (operation === 'reverse') {
      return { result: JSON.stringify(data).split('').reverse().join('') };
    }
    return { result: data };
  },
  { description: 'Transform data' }
);

module.exports = toolRegistry;
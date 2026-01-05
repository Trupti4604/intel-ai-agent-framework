#!/bin/bash

echo "=================================="
echo "Intel AI Agent Framework Setup"
echo "=================================="
echo ""

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p src/core
mkdir -p src/memory
mkdir -p src/api
mkdir -p src/examples
mkdir -p logs
mkdir -p benchmarks

# Initialize package.json if not exists
if [ ! -f "package.json" ]; then
    echo "📦 Initializing npm project..."
    npm init -y
fi

# Install dependencies
echo "📥 Installing dependencies..."
npm install express uuid winston

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy all the code files from the artifacts into their respective directories"
echo "2. Run: node src/examples/agent1.js"
echo "3. In another terminal: node src/examples/agent2.js"
echo "4. Run benchmarks: node benchmarks/run.js"
echo ""
echo "API Endpoints:"
echo "- Agent 1: http://localhost:3000"
echo "- Agent 2: http://localhost:3001"
echo ""
echo "Check logs at: logs/orchestrator.log"
echo ""
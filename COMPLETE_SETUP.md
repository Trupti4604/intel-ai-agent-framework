# 🚀 Intel AI Agent Framework - Complete Setup Guide

## 📁 Step 1: Create Directory Structure

```bash
cd ~/intel-ai-agent-framework
mkdir -p src/core src/memory src/tools src/api src/examples benchmarks logs
```

## 📝 Step 2: Copy All Files

Copy each file from the artifacts above into the correct location:

### Core Files (src/core/)
1. **Task.js** → `src/core/Task.js`
2. **Workflow.js** → `src/core/Workflow.js`
3. **Orchestrator.js** → `src/core/Orchestrator.js`
4. **Agent.js** → `src/core/Agent.js`

### Memory (src/memory/)
5. **MemoryStore.js** → `src/memory/MemoryStore.js`

### Tools (src/tools/)
6. **ToolRegistry.js** → `src/tools/ToolRegistry.js`

### API (src/api/)
7. **server.js** → `src/api/server.js`

### Examples (src/examples/)
8. **agent1.js** → `src/examples/agent1.js`
9. **agent2.js** → `src/examples/agent2.js`

### Benchmarks (benchmarks/)
10. **run.js** → `benchmarks/run.js`

### Root Files
11. **index.js** → `index.js` (project root)
12. **package.json** → `package.json` (project root)

## ✅ Step 3: Verify Directory Structure

Your directory should look like this:

```
intel-ai-agent-framework/
├── package.json
├── index.js
├── src/
│   ├── core/
│   │   ├── Agent.js
│   │   ├── Task.js
│   │   ├── Workflow.js
│   │   └── Orchestrator.js
│   ├── memory/
│   │   └── MemoryStore.js
│   ├── tools/
│   │   └── ToolRegistry.js
│   ├── api/
│   │   └── server.js
│   └── examples/
│       ├── agent1.js
│       └── agent2.js
├── benchmarks/
│   └── run.js
└── logs/ (empty directory)
```

## 🔧 Step 4: Install Dependencies

```bash
npm install
```

This will install:
- express (API server)
- uuid (unique IDs)
- winston (logging)

## 🚀 Step 5: Run the Project

### Option 1: Quick Demo (2 minutes)
```bash
npm start
```

**Expected Output:**
```
🚀 Intel AI Agent Framework - Quick Demo

✅ Results: !!!DLROW OLLEH
⏱️  Duration: 15ms
```

### Option 2: Data Processing Agent (5 minutes)
```bash
npm run agent1
```

**Expected Output:**
```
============================================================
📊 DATA PROCESSING AGENT - ETL Pipeline
============================================================

🚀 Executing Agent: Data Processing Agent
  📥 Fetching data from source...
  🔄 Transforming data...
  🔍 Filtering data...
  💾 Saving results...
✅ Agent Data Processing Agent completed in XXXms

📋 EXECUTION SUMMARY:
  Status: ✅ SUCCESS
  Duration: XXXms
  Records Processed: 3
```

### Option 3: Customer Support Agent (5 minutes)
```bash
npm run agent2
```

**Expected Output:**
```
============================================================
🎧 CUSTOMER SUPPORT AGENT - Query Handler
============================================================

🚀 Executing Agent: Customer Support Agent
  🔍 Analyzing customer query...
  📚 Searching knowledge base...
  💬 Generating response...
  📝 Logging interaction...
✅ Agent Customer Support Agent completed in XXXms
```

### Option 4: Run Benchmarks (10 minutes)
```bash
npm run benchmark
```

**Expected Output:**
```
============================================================
🎯 INTEL AI AGENT FRAMEWORK - PERFORMANCE BENCHMARKS
============================================================

Running benchmark: Linear Workflow (4 tasks)
--------------------------------------------------
  Run 10/10: 52ms

📊 Statistics:
  Average: 51.20ms
  Median:  51ms
  Min:     49ms
  Max:     55ms
```

### Option 5: Start API Server
```bash
npm run server
```

Then test with:
```bash
curl http://localhost:3000/health
curl http://localhost:3000/metrics
```

## 🧪 Step 6: Test Everything

Run all tests in sequence:
```bash
npm run test
```

## 📊 Step 7: For Presentation

Open 4 terminals and run:

**Terminal 1:**
```bash
npm start
```

**Terminal 2:**
```bash
npm run agent1
```

**Terminal 3:**
```bash
npm run agent2
```

**Terminal 4:**
```bash
npm run benchmark
```

## 🎯 Quick Commands Reference

| Command | Description | Duration |
|---------|-------------|----------|
| `npm install` | Install dependencies | 30 sec |
| `npm start` | Quick demo | 5 sec |
| `npm run agent1` | Data Processing Agent | 5 sec |
| `npm run agent2` | Customer Support Agent | 5 sec |
| `npm run benchmark` | Performance tests | 30 sec |
| `npm run server` | Start API server | Continuous |
| `npm run test` | Run all demos | 15 sec |

## ⚠️ Troubleshooting

### Issue: "Cannot find module"
```bash
npm install
```

### Issue: Port 3000 in use
Edit `src/api/server.js`, change port to 3001

### Issue: Permission denied
```bash
chmod +x index.js
```

### Issue: Node not found
Make sure Node.js is installed:
```bash
node --version
npm --version
```

## ✅ Success Checklist

- [ ] All 12 files copied
- [ ] `npm install` completed
- [ ] `npm start` works
- [ ] `npm run agent1` works
- [ ] `npm run agent2` works
- [ ] `npm run benchmark` works

## 🎉 You're Ready!

Your Intel AI Agent Framework is now ready for presentation!
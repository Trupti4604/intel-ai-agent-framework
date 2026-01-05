async function runWorkflow() {
  await fetch('/api/execute', { method: 'POST' });
  loadLogs();
  loadMetrics();
}

async function loadLogs() {
  const res = await fetch('/api/logs');
  document.getElementById('logs').innerText = await res.text();
}

async function loadMetrics() {
  const res = await fetch('/api/metrics');
  document.getElementById('metrics').innerText = await res.text();
}

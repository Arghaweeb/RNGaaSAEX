// Simulate nodes generating entropy

import crypto from 'crypto';
import { ingestChunk, recordHeartbeat } from './randomService';

const NODES = ['jp-kuroho-01', 'us-west-02', 'eu-berlin-03', 'sg-alpha-04'];

function simulateNode(nodeId: string) {
  // Generate random bytes
  const bytes = crypto.randomBytes(64);

  ingestChunk({
    nodeId,
    bytes,
    timestamp: Date.now(),
  });

  recordHeartbeat({
    nodeId,
    status: 'active',
    timestamp: Date.now(),
  });
}

function startSimulator() {
  // Singleton guard
  if ((globalThis as any).__simulatorRunning) return;
  (globalThis as any).__simulatorRunning = true;

  console.log('[Simulator] Starting node simulator...');

  // Run every 1 second
  setInterval(() => {
    NODES.forEach(simulateNode);
  }, 1000);

  // Initial run
  NODES.forEach(simulateNode);
}

export { startSimulator };

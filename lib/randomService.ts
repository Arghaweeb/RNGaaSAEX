// Glue logic for RNGaaS

import crypto from 'crypto';
import { buffer } from './buffer';
import { nodeRegistry } from './nodes';
import { roundStore } from './rounds';
import type { RandomChunk, Heartbeat, RandomResponse, StatusResponse } from './types';

export function ingestChunk(chunk: RandomChunk) {
  buffer.append(chunk.bytes);
  nodeRegistry.incrementChunks(chunk.nodeId);
}

export function recordHeartbeat(hb: Heartbeat) {
  nodeRegistry.recordHeartbeat(hb);
}

export function getRandom(bytes: number, format: 'hex' | 'base64' = 'hex'): RandomResponse | null {
  const data = buffer.consume(bytes);
  if (!data) return null;

  // Simulate round generation
  const roundId = newRoundIfNeeded(data);

  return {
    bytes: format === 'hex' ? data.toString('hex') : data.toString('base64'),
    format,
    roundId,
    timestamp: Date.now(),
  };
}

export function getStatus(): StatusResponse {
  return {
    buffer: buffer.getStats(),
    nodes: nodeRegistry.getAll(),
    currentRound: roundStore.getCurrentRoundId(),
  };
}

export function newRoundIfNeeded(randomData: Buffer): number {
  const roundId = roundStore.incrementRound();

  // Simulate blockhash and metadata
  const blockhash = crypto.randomBytes(32).toString('hex');
  const metadataHash = crypto.createHash('sha256').update(`meta-${roundId}`).digest('hex');

  // R_i = SHA256(node bytes + blockhash + round_id)
  const R_i = crypto.createHash('sha256')
    .update(randomData)
    .update(blockhash)
    .update(roundId.toString())
    .digest('hex');

  // C_i = SHA256(R_i + round_id + metadata_hash)
  const C_i = crypto.createHash('sha256')
    .update(R_i)
    .update(roundId.toString())
    .update(metadataHash)
    .digest('hex');

  roundStore.add({
    roundId,
    R_i,
    C_i,
    metadataHash,
    timestamp: Date.now(),
    bytesUsed: randomData.length,
  });

  return roundId;
}

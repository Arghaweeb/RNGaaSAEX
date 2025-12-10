// Core types for RNGaaS

export interface RandomChunk {
  nodeId: string;
  bytes: Buffer;
  timestamp: number;
}

export interface Heartbeat {
  nodeId: string;
  status: 'active' | 'idle' | 'offline';
  timestamp: number;
}

export interface NodeInfo {
  id: string;
  status: 'active' | 'idle' | 'offline';
  lastHeartbeat: number;
  chunksSubmitted: number;
}

export interface BufferStats {
  totalBytes: number;
  bytesConsumed: number;
  bytesAvailable: number;
}

export interface RoundInfo {
  roundId: number;
  R_i: string; // SHA256 hash
  C_i: string; // SHA256 commitment
  metadataHash: string;
  timestamp: number;
  bytesUsed: number;
}

export interface RandomResponse {
  bytes: string;
  format: 'hex' | 'base64';
  roundId: number;
  timestamp: number;
}

export interface StatusResponse {
  buffer: BufferStats;
  nodes: NodeInfo[];
  currentRound: number;
}

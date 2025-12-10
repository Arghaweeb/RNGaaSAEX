// Track node status and heartbeats

import type { NodeInfo, Heartbeat } from './types';

class NodeRegistry {
  private nodes = new Map<string, NodeInfo>();

  recordHeartbeat(hb: Heartbeat) {
    const existing = this.nodes.get(hb.nodeId);
    if (existing) {
      existing.status = hb.status;
      existing.lastHeartbeat = hb.timestamp;
    } else {
      this.nodes.set(hb.nodeId, {
        id: hb.nodeId,
        status: hb.status,
        lastHeartbeat: hb.timestamp,
        chunksSubmitted: 0,
      });
    }
  }

  incrementChunks(nodeId: string) {
    const node = this.nodes.get(nodeId);
    if (node) node.chunksSubmitted++;
  }

  getAll(): NodeInfo[] {
    return Array.from(this.nodes.values());
  }
}

export const nodeRegistry = new NodeRegistry();

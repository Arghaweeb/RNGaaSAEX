'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { StatusResponse } from '@/lib/types';

export default function Dashboard() {
  const [status, setStatus] = useState<StatusResponse | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch('/api/status');
      const data = await res.json();
      setStatus(data);
    };

    // Initial fetch + trigger simulator
    fetch('/api/init');
    fetchStatus();

    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">RNGaaS Dashboard</h1>

      <div className="mb-4">
        <Link href="/random-tester" className="text-blue-600 underline">
          → Random Tester
        </Link>
      </div>

      {/* Buffer Stats */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Buffer Status</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Total Bytes</div>
            <div className="text-2xl font-mono">{status.buffer.totalBytes}</div>
          </div>
          <div>
            <div className="text-gray-500">Consumed</div>
            <div className="text-2xl font-mono">{status.buffer.bytesConsumed}</div>
          </div>
          <div>
            <div className="text-gray-500">Available</div>
            <div className="text-2xl font-mono text-green-600">{status.buffer.bytesAvailable}</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Current Round: <span className="font-mono">{status.currentRound}</span>
        </div>
      </div>

      {/* Nodes Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Active Nodes</h2>
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left">
              <th className="pb-2">Node ID</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Chunks</th>
              <th className="pb-2">Last Heartbeat</th>
            </tr>
          </thead>
          <tbody>
            {status.nodes.map((node) => (
              <tr key={node.id} className="border-b last:border-0">
                <td className="py-2 font-mono text-xs">{node.id}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    node.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                  }`}>
                    {node.status}
                  </span>
                </td>
                <td className="py-2">{node.chunksSubmitted}</td>
                <td className="py-2 text-xs text-gray-500">
                  {new Date(node.lastHeartbeat).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

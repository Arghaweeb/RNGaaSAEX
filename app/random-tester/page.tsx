'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { RandomResponse } from '@/lib/types';

export default function RandomTester() {
  const [bytes, setBytes] = useState(32);
  const [format, setFormat] = useState<'hex' | 'base64'>('hex');
  const [result, setResult] = useState<RandomResponse | null>(null);
  const [error, setError] = useState('');

  const fetchRandom = async () => {
    setError('');
    try {
      const res = await fetch(`/api/random?bytes=${bytes}&format=${format}`);
      if (!res.ok) {
        setError('Insufficient entropy in buffer');
        return;
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('Request failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link href="/" className="text-blue-600 underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6">Random Number Tester</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Bytes</label>
          <input
            type="number"
            value={bytes}
            onChange={(e) => setBytes(parseInt(e.target.value) || 32)}
            className="border rounded px-3 py-2 w-32"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as 'hex' | 'base64')}
            className="border rounded px-3 py-2"
          >
            <option value="hex">Hex</option>
            <option value="base64">Base64</option>
          </select>
        </div>

        <button
          onClick={fetchRandom}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Generate Random
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 text-red-800">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">Random Data</div>
            <div className="font-mono text-xs bg-gray-50 p-3 rounded break-all">
              {result.bytes}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Format</div>
              <div className="font-mono">{result.format}</div>
            </div>
            <div>
              <div className="text-gray-500">Round ID</div>
              <div className="font-mono">{result.roundId}</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Generated: {new Date(result.timestamp).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}

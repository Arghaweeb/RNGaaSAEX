import { NextRequest, NextResponse } from 'next/server';
import { ingestChunk } from '@/lib/randomService';

export async function POST(
  req: NextRequest,
  { params }: { params: { nodeId: string } }
) {
  const { bytes } = await req.json();
  const buffer = Buffer.from(bytes, 'hex');

  ingestChunk({
    nodeId: params.nodeId,
    bytes: buffer,
    timestamp: Date.now(),
  });

  return NextResponse.json({ success: true });
}

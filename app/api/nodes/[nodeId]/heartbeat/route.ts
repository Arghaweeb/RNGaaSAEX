import { NextRequest, NextResponse } from 'next/server';
import { recordHeartbeat } from '@/lib/randomService';

export async function POST(
  req: NextRequest,
  { params }: { params: { nodeId: string } }
) {
  const { status } = await req.json();

  recordHeartbeat({
    nodeId: params.nodeId,
    status: status || 'active',
    timestamp: Date.now(),
  });

  return NextResponse.json({ success: true });
}

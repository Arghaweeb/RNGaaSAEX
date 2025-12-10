// Auto-start simulator on first request
import { NextResponse } from 'next/server';
import { startSimulator } from '@/lib/nodeSimulator';

// Start simulator when this module loads
startSimulator();

export async function GET() {
  return NextResponse.json({ simulator: 'running' });
}

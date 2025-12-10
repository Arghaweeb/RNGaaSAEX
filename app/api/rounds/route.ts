import { NextResponse } from 'next/server';
import { roundStore } from '@/lib/rounds';

export async function GET() {
  return NextResponse.json({ rounds: roundStore.getRecent(20) });
}

import { NextResponse } from 'next/server';
import { getStatus } from '@/lib/randomService';

export async function GET() {
  return NextResponse.json(getStatus());
}

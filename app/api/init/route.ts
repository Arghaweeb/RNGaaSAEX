import { NextResponse } from 'next/server';
import { initService } from '@/lib/randomService';

export async function POST() {
  const result = initService();
  return NextResponse.json(result);
}

export async function GET() {
  const result = initService();
  return NextResponse.json(result);
}

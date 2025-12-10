import { NextRequest, NextResponse } from 'next/server';
import { getRandom } from '@/lib/randomService';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const bytes = parseInt(searchParams.get('bytes') || '32');
  const format = (searchParams.get('format') || 'hex') as 'hex' | 'base64';

  const result = getRandom(bytes, format);
  if (!result) {
    return NextResponse.json({ error: 'Insufficient entropy' }, { status: 503 });
  }

  return NextResponse.json(result);
}

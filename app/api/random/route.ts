import { NextResponse } from 'next/server';
import { generateRandom } from '@/lib/randomService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const min = parseInt(searchParams.get('min') || '0');
  const max = parseInt(searchParams.get('max') || '100');
  const count = parseInt(searchParams.get('count') || '1');
  const algorithm = (searchParams.get('algorithm') || 'standard') as 'standard' | 'crypto' | 'gaussian';

  try {
    const result = generateRandom({ min, max, count, algorithm });

    return NextResponse.json({
      success: true,
      data: result,
      params: { min, max, count, algorithm },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { min = 0, max = 100, count = 1, algorithm = 'standard' } = body;

    const result = generateRandom({ min, max, count, algorithm });

    return NextResponse.json({
      success: true,
      data: result,
      params: { min, max, count, algorithm },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

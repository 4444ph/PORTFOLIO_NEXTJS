import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Visitor } from '@/models/Visitor';

function getClientIp(req: NextRequest): string {
  // Check forwarded headers for proxied environments (Vercel, Cloudflare, etc.)
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;
  return 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const body = await req.json().catch(() => ({}));
    const path = body.path || '/';

    // Today's date string in UTC (YYYY-MM-DD)
    const date = new Date().toISOString().split('T')[0];

    await dbConnect();

    // Upsert: if this IP already has a record for today, do nothing (dedup)
    await Visitor.updateOne(
      { ip, date },
      { $setOnInsert: { ip, date, path, visitedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    // Silently ignore duplicate key errors (race condition on the unique index)
    console.error('[visitors/track]', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

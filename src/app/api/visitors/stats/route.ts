import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Visitor } from '@/models/Visitor';

export async function GET() {
  try {
    await dbConnect();

    const todayStr = new Date().toISOString().split('T')[0];

    // Total unique visitors (all time) = total documents in collection
    const totalVisitors = await Visitor.countDocuments();

    // Unique visitors today
    const visitorsToday = await Visitor.countDocuments({ date: todayStr });

    // Daily unique visitors for the last 7 days
    const last7Days: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = await Visitor.countDocuments({ date: dateStr });
      // Format for chart display: "Mon", "Tue", etc.
      const label = d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
      last7Days.push({ date: label, count });
    }

    return NextResponse.json({
      totalVisitors,
      visitorsToday,
      last7Days,
    });
  } catch (error) {
    console.error('[visitors/stats]', error);
    return NextResponse.json({ error: 'Failed to fetch visitor stats' }, { status: 500 });
  }
}

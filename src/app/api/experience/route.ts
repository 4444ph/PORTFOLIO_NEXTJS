import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Experience } from '@/models/Experience';

export async function GET() {
  await dbConnect();
  try {
    const experiences = await Experience.find({}).sort({ order: 1 });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
  }
}

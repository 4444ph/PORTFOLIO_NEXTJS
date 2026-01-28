import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Project } from '@/models/Project';

export async function GET() {
  await dbConnect();
  try {
    const projects = await Project.find({}).sort({ order: 1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

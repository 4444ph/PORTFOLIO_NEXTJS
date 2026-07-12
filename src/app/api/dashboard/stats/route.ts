import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Project } from '@/models/Project';
import { Skill } from '@/models/Skill';
import { Experience } from '@/models/Experience';
import { Visitor } from '@/models/Visitor';

export async function GET() {
  try {
    await dbConnect();

    const [projects, skills, experience, totalVisitors] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Visitor.countDocuments(),
    ]);

    return NextResponse.json({ projects, skills, experience, totalVisitors });
  } catch (error) {
    console.error('[dashboard/stats]', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}

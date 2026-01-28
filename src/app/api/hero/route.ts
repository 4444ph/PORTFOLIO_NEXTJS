import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { HeroContent } from '@/models/HeroContent';

export async function GET() {
  try {
    await dbConnect();
    const hero = await HeroContent.findOne();
    
    return NextResponse.json(hero || {}, { status: 200 });
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero content' },
      { status: 500 }
    );
  }
}


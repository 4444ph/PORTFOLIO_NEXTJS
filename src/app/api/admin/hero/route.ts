import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { HeroContent } from '@/models/HeroContent';
import { verifySession } from '@/lib/auth';

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

export async function POST(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    
    const hero = await HeroContent.create(data);
    
    return NextResponse.json(hero, { status: 201 });
  } catch (error) {
    console.error('Error creating hero content:', error);
    return NextResponse.json(
      { error: `Failed to create hero content: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    const { _id, ...updateData } = data;
    
    const hero = await HeroContent.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!hero) {
      return NextResponse.json(
        { error: 'Hero content not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(hero, { status: 200 });
  } catch (error) {
    console.error('Error updating hero content:', error);
    return NextResponse.json(
      { error: 'Failed to update hero content' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const hero = await HeroContent.findByIdAndDelete(id);
    
    if (!hero) {
      return NextResponse.json(
        { error: 'Hero content not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Hero content deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting hero content:', error);
    return NextResponse.json(
      { error: 'Failed to delete hero content' },
      { status: 500 }
    );
  }
}

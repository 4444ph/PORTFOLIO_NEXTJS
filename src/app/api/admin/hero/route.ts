import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { HeroContent } from '@/models/HeroContent';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    // Exclude heavy binary data, we only need metadata
    const hero = await HeroContent.findOne().select('-resumeData');
    
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
    const formData = await request.formData();
    
    // Extract textual data
    const heroData: any = {
      title: formData.get('title'),
      subtitle: formData.get('subtitle'),
      description: formData.get('description'),
      imageUrl: formData.get('imageUrl'),
      ctaText: formData.get('ctaText'),
      ctaLink: formData.get('ctaLink'),
    };

    // Handle resume file
    const resumeFile = formData.get('resume') as File | null;
    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      heroData.resumeData = buffer;
      heroData.resumeContentType = resumeFile.type;
      heroData.resumeFileName = resumeFile.name;
    }
    
    const hero = await HeroContent.create(heroData);
    
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
    const formData = await request.formData();
    const _id = formData.get('_id') as string;

    const updateData: any = {
      title: formData.get('title'),
      subtitle: formData.get('subtitle'),
      description: formData.get('description'),
      imageUrl: formData.get('imageUrl'),
      ctaText: formData.get('ctaText'),
      ctaLink: formData.get('ctaLink'),
    };
    
    // Handle remove resume flag
    const removeResume = formData.get('removeResume');
    if (removeResume === 'true') {
      updateData.$unset = { 
        resumeData: 1, 
        resumeContentType: 1, 
        resumeFileName: 1 
      };
    } else {
      // Handle resume file update only if not removing
      const resumeFile = formData.get('resume') as File | null;
      if (resumeFile && resumeFile.size > 0) {
        const buffer = Buffer.from(await resumeFile.arrayBuffer());
        updateData.resumeData = buffer;
        updateData.resumeContentType = resumeFile.type;
        updateData.resumeFileName = resumeFile.name;
      }
    }
    
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
      { error: `Failed to update hero content: ${error instanceof Error ? error.message : String(error)}` },
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

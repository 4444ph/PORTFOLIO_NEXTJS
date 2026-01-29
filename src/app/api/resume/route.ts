import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { HeroContent } from '@/models/HeroContent';

export async function GET() {
  try {
    await dbConnect();
    const hero = await HeroContent.findOne();
    
    if (!hero || !hero.resumeData) {
      return new NextResponse('Resume not found', { status: 404 });
    }
    
    // Create appropriate headers for PDF download
    const headers = new Headers();
    headers.set('Content-Type', hero.resumeContentType || 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${hero.resumeFileName || 'resume.pdf'}"`);
    
    return new NextResponse(new Uint8Array(hero.resumeData), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Error serving resume:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Hero } from '@/lib/db/models';

// GET /api/hero - Fetch hero content for public site
export async function GET() {
  try {
    await connectDB();
    
    const hero = await Hero.findOne({ isVisible: true });
    
    if (!hero) {
      // Return default content if none exists
      return NextResponse.json({
        hero: {
          title: 'Advancing Biotechnology Innovation',
          subtitle: 'Open to Research Opportunities',
          description: 'Biotechnology graduate student passionate about molecular biology, genetic engineering, and developing sustainable solutions for healthcare and agriculture.',
          ctaPrimary: { text: 'Get in Touch', href: '#contact' },
          ctaSecondary: { text: 'View CV', href: '#' },
        }
      });
    }
    
    return NextResponse.json({ hero });
  } catch (error) {
    console.error('GET /api/hero error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero content' },
      { status: 500 }
    );
  }
}

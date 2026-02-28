import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import { Testimonial } from '@/lib/db/models';

export async function GET() {
  try {
    await dbConnect();
    
    const testimonials = await Testimonial.find({ isVisible: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error('Testimonials fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

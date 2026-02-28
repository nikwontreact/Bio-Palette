import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import dbConnect from '@/lib/db/mongoose';
import { Testimonial } from '@/lib/db/models';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const testimonials = await Testimonial.find()
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

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const data = await request.json();
    
    const testimonial = await Testimonial.create({
      ...data,
      updatedBy: session.user.id,
    });

    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error) {
    console.error('Testimonial create error:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}

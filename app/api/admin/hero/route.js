import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Hero, AuditLog } from '@/lib/db/models';

// GET /api/admin/hero - Fetch hero content
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    await connectDB();
    let hero = await Hero.findOne();
    // Create default hero if none exists
    if (!hero) {
      hero = await Hero.create({
        title: 'Your Title',
        subtitle: 'Your Subtitle',
        description: 'Your description here',
        ctaPrimary: { text: 'Get Started', href: '#contact' },
        ctaSecondary: { text: 'Learn More', href: '#about' },
        isVisible: true,
      });
    }
    return NextResponse.json({ hero });
  } catch (error) {
    console.error('GET /api/admin/hero error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero content' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/hero - Update hero content
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { title, subtitle, description, ctaPrimary, ctaSecondary, isVisible } = body;
    
    // Validation
    if (!title || !subtitle || !description) {
      return NextResponse.json(
        { error: 'Title, subtitle, and description are required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    let hero = await Hero.findOne();
    const oldData = hero ? hero.toObject() : null;
    
    if (hero) {
      // Update existing
      hero.title = title;
      hero.subtitle = subtitle;
      hero.description = description;
      hero.ctaPrimary = ctaPrimary;
      hero.ctaSecondary = ctaSecondary;
      hero.isVisible = isVisible !== undefined ? isVisible : true;
      hero.updatedAt = new Date();
      await hero.save();
    } else {
      // Create new
      hero = await Hero.create({
        title,
        subtitle,
        description,
        ctaPrimary,
        ctaSecondary,
        isVisible: isVisible !== undefined ? isVisible : true,
      });
    }
    
    // Log the change
    await AuditLog.create({
      userId: session.user.id,
      action: oldData ? 'update' : 'create',
      resource: 'hero',
      resourceId: hero._id,
      changes: {
        old: oldData,
        new: hero.toObject(),
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });
    
    return NextResponse.json({ 
      hero,
      message: 'Hero content updated successfully' 
    });
  } catch (error) {
    console.error('PUT /api/admin/hero error:', error);
    return NextResponse.json(
      { error: 'Failed to update hero content' },
      { status: 500 }
    );
  }
}

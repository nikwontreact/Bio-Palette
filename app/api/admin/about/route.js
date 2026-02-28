import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { About, AuditLog } from '@/lib/db/models';

// GET /api/admin/about - Fetch about content
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
    let about = await About.findOne();

    // Create default about if none exists
    if (!about) {
      about = await About.create({
        bio: 'Your bio here',
        education: [],
        highlights: [],
        isVisible: true,
      });
    }

    return NextResponse.json({ about });
  } catch (error) {
    console.error('GET /api/admin/about error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about content' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/about - Update about content
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { bio, education, highlights, profileImage, isVisible } = body;

    // Validation
    if (!bio) {
      return NextResponse.json(
        { error: 'Bio is required' },
        { status: 400 }
      );
    }

    let about = await About.findOne();
    const oldData = about ? about.toObject() : null;

    if (about) {
      // Update existing
      about.bio = bio;
      about.education = education || [];
      about.highlights = highlights || [];
      about.profileImage = profileImage;
      about.isVisible = isVisible !== undefined ? isVisible : true;
      about.updatedAt = new Date();
      await about.save();
    } else {
      // Create new
      about = await About.create({
        bio,
        education: education || [],
        highlights: highlights || [],
        profileImage,
        isVisible: isVisible !== undefined ? isVisible : true,
      });
    }

    // Log the change
    await AuditLog.create({
      userId: session.user.id,
      action: oldData ? 'update' : 'create',
      resource: 'about',
      resourceId: about._id,
      changes: {
        old: oldData,
        new: about.toObject(),
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.json({ 
      about,
      message: 'About content updated successfully' 
    });
  } catch (error) {
    console.error('PUT /api/admin/about error:', error);
    return NextResponse.json(
      { error: 'Failed to update about content' },
      { status: 500 }
    );
  }
}

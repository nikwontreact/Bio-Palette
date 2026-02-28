import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Footer, AuditLog } from '@/lib/db/models';

// GET /api/admin/footer - Fetch footer content
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
    let footer = await Footer.findOne();
    
    // Create default footer if none exists
    if (!footer) {
      footer = await Footer.create({
        columns: [],
        copyright: `© ${new Date().getFullYear()} Your Name. All rights reserved.`,
        socialLinks: {},
        isVisible: true,
      });
    }
    
    return NextResponse.json({ footer });
  } catch (error) {
    console.error('GET /api/admin/footer error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer content' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/footer - Update footer content
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
    const { columns, copyright, socialLinks, isVisible } = body;
    
    let footer = await Footer.findOne();
    const oldData = footer ? footer.toObject() : null;
    
    if (footer) {
      // Update existing
      footer.columns = columns || [];
      footer.copyright = copyright || `© ${new Date().getFullYear()} Your Name. All rights reserved.`;
      footer.socialLinks = socialLinks || {};
      footer.isVisible = isVisible !== undefined ? isVisible : true;
      footer.updatedAt = new Date();
      await footer.save();
    } else {
      // Create new
      footer = await Footer.create({
        columns: columns || [],
        copyright: copyright || `© ${new Date().getFullYear()} Your Name. All rights reserved.`,
        socialLinks: socialLinks || {},
        isVisible: isVisible !== undefined ? isVisible : true,
      });
    }
    
    // Log the change
    await AuditLog.create({
      userId: session.user.id,
      action: oldData ? 'update' : 'create',
      resource: 'footer',
      resourceId: footer._id,
      changes: {
        old: oldData,
        new: footer.toObject(),
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });
    
    return NextResponse.json({ 
      footer,
      message: 'Footer content updated successfully' 
    });
  } catch (error) {
    console.error('PUT /api/admin/footer error:', error);
    return NextResponse.json(
      { error: 'Failed to update footer content' },
      { status: 500 }
    );
  }
}

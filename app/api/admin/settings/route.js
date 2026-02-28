import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Settings, AuditLog } from '@/lib/db/models';

// GET /api/admin/settings - Fetch site settings
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
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({
        siteName: 'Nikhil Sode',
        siteTitle: 'Full Stack Developer',
        siteDescription: 'Analytical Full Stack Developer with proven experience designing responsive, high-performance web applications',
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('GET /api/admin/settings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/settings - Update site settings
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
    const { 
      siteName, 
      siteTitle, 
      siteDescription,
      themeColor,
      email, 
      phone, 
      location,
      socialLinks,
      logo,
      favicon 
    } = body;

    // Validation
    if (!siteName) {
      return NextResponse.json(
        { error: 'Site name is required' },
        { status: 400 }
      );
    }

    let settings = await Settings.findOne();
    const oldData = settings ? settings.toObject() : null;

    if (settings) {
      // Update existing
      settings.siteName = siteName;
      settings.siteTitle = siteTitle;
      settings.siteDescription = siteDescription;
      settings.themeColor = themeColor !== undefined ? themeColor : 330;
      settings.email = email;
      settings.phone = phone;
      settings.location = location;
      settings.socialLinks = socialLinks || {};
      settings.logo = logo;
      settings.favicon = favicon;
      settings.updatedAt = new Date();
      await settings.save();
    } else {
      // Create new
      settings = await Settings.create({
        siteName,
        siteTitle,
        siteDescription,
        themeColor: themeColor !== undefined ? themeColor : 330,
        email,
        phone,
        location,
        socialLinks: socialLinks || {},
        logo,
        favicon,
      });
    }

    // Log the change
    await AuditLog.create({
      userId: session.user.id,
      action: oldData ? 'update' : 'create',
      resource: 'settings',
      resourceId: settings._id,
      changes: {
        old: oldData,
        new: settings.toObject(),
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.json({ 
      settings,
      message: 'Settings updated successfully' 
    });
  } catch (error) {
    console.error('PUT /api/admin/settings error:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

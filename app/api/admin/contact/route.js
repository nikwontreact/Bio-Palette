import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Contact, AuditLog } from '@/lib/db/models';

// GET /api/admin/contact - Fetch contact info
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
    let contact = await Contact.findOne();
    
    // Create default contact if none exists
    if (!contact) {
      contact = await Contact.create({
        email: 'your@email.com',
        phone: '+1 (555) 000-0000',
        location: 'Your Location',
        availability: {
          status: 'Available',
          message: 'Open to opportunities',
        },
        socialLinks: {},
        isVisible: true,
      });
    }
    
    return NextResponse.json({ contact });
  } catch (error) {
    console.error('GET /api/admin/contact error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/contact - Update contact info
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
    const { email, phone, location, availability, socialLinks, isVisible } = body;
    
    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    let contact = await Contact.findOne();
    const oldData = contact ? contact.toObject() : null;
    
    if (contact) {
      // Update existing
      contact.email = email;
      contact.phone = phone;
      contact.location = location;
      contact.availability = availability || { status: 'Available', message: '' };
      contact.socialLinks = socialLinks || {};
      contact.isVisible = isVisible !== undefined ? isVisible : true;
      contact.updatedAt = new Date();
      await contact.save();
    } else {
      // Create new
      contact = await Contact.create({
        email,
        phone,
        location,
        availability: availability || { status: 'Available', message: '' },
        socialLinks: socialLinks || {},
        isVisible: isVisible !== undefined ? isVisible : true,
      });
    }
    
    // Log the change
    await AuditLog.create({
      userId: session.user.id,
      action: oldData ? 'update' : 'create',
      resource: 'contact',
      resourceId: contact._id,
      changes: {
        old: oldData,
        new: contact.toObject(),
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });
    
    return NextResponse.json({ 
      contact,
      message: 'Contact info updated successfully' 
    });
  } catch (error) {
    console.error('PUT /api/admin/contact error:', error);
    return NextResponse.json(
      { error: 'Failed to update contact info' },
      { status: 500 }
    );
  }
}

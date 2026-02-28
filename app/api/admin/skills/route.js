import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Skill, AuditLog } from '@/lib/db/models';

// GET /api/admin/skills - Fetch all skills
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
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const query = category ? { category } : {};
    const skills = await Skill.find(query).sort({ category: 1, order: 1, createdAt: -1 });
    
    return NextResponse.json({ skills });
  } catch (error) {
    console.error('GET /api/admin/skills error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST /api/admin/skills - Create new skill
export async function POST(request) {
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
      name, 
      category, 
      proficiency, 
      icon,
      isVisible,
      order 
    } = body;
    
    // Validation
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }
    
    // Get the highest order number in this category and add 1
    const maxOrder = await Skill.findOne({ category }).sort({ order: -1 }).select('order');
    const newOrder = order !== undefined ? order : (maxOrder?.order || 0) + 1;
    
    const skill = await Skill.create({
      name,
      category,
      proficiency: proficiency || 'Intermediate',
      icon,
      isVisible: isVisible !== undefined ? isVisible : true,
      order: newOrder,
    });
    
    // Log the change
    await AuditLog.create({
      userId: session.user.id,
      action: 'create',
      resource: 'skill',
      resourceId: skill._id,
      changes: {
        old: null,
        new: skill.toObject(),
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });
    
    return NextResponse.json({ 
      skill,
      message: 'Skill created successfully' 
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/skills error:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Skill, AuditLog } from '@/lib/db/models';

// GET /api/admin/skills/[id] - Fetch single skill
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectDB();
    const skill = await Skill.findById(params.id);
    
    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ skill });
  } catch (error) {
    console.error('GET /api/admin/skills/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skill' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/skills/[id] - Update skill
export async function PUT(request, { params }) {
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
    
    const skill = await Skill.findById(params.id);
    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }
    
    const oldData = skill.toObject();
    
    // Update fields
    skill.name = name;
    skill.category = category;
    skill.proficiency = proficiency || 'Intermediate';
    skill.icon = icon;
    skill.isVisible = isVisible !== undefined ? isVisible : true;
    if (order !== undefined) skill.order = order;
    skill.updatedAt = new Date();
    await skill.save();
    
    // Log the change
    await AuditLog.create({
      userId: session.user.id,
      action: 'update',
      resource: 'skill',
      resourceId: skill._id,
      changes: {
        old: oldData,
        new: skill.toObject(),
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });
    
    return NextResponse.json({ 
      skill,
      message: 'Skill updated successfully' 
    });
  } catch (error) {
    console.error('PUT /api/admin/skills/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/skills/[id] - Delete skill
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectDB();
    const skill = await Skill.findById(params.id);
    
    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }
    
    const oldData = skill.toObject();
    await skill.deleteOne();
    
    // Log the deletion
    await AuditLog.create({
      userId: session.user.id,
      action: 'delete',
      resource: 'skill',
      resourceId: params.id,
      changes: {
        old: oldData,
        new: null,
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });
    
    return NextResponse.json({ 
      message: 'Skill deleted successfully' 
    });
  } catch (error) {
    console.error('DELETE /api/admin/skills/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}

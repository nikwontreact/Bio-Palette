import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Project, AuditLog } from '@/lib/db/models';

// GET /api/admin/projects - Fetch all projects
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
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('GET /api/admin/projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects - Create new project
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
      title, 
      shortDescription, 
      longDescription, 
      technologies, 
      status, 
      image,
      githubUrl,
      liveUrl,
      isVisible,
      order 
    } = body;

    // Validation
    if (!title || !shortDescription) {
      return NextResponse.json(
        { error: 'Title and short description are required' },
        { status: 400 }
      );
    }

    // Get the highest order number and add 1
    const maxOrder = await Project.findOne().sort({ order: -1 }).select('order');
    const newOrder = order !== undefined ? order : (maxOrder?.order || 0) + 1;

    const project = await Project.create({
      title,
      shortDescription,
      longDescription,
      technologies: technologies || [],
      status: status || 'In Progress',
      image,
      githubUrl,
      liveUrl,
      isVisible: isVisible !== undefined ? isVisible : true,
      order: newOrder,
    });

    // Log the change
    await AuditLog.create({
      userId: session.user.id,
      action: 'create',
      resource: 'project',
      resourceId: project._id,
      changes: {
        old: null,
        new: project.toObject(),
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.json({ 
      project,
      message: 'Project created successfully' 
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/projects error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

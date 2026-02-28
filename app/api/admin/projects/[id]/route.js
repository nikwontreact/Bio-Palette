import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Project, AuditLog } from '@/lib/db/models';

// GET /api/admin/projects/[id] - Fetch single project
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
    const project = await Project.findById(params.id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('GET /api/admin/projects/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/projects/[id] - Update project
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

    const project = await Project.findById(params.id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const oldData = project.toObject();

    // Update fields
    project.title = title;
    project.shortDescription = shortDescription;
    project.longDescription = longDescription;
    project.technologies = technologies || [];
    project.status = status || 'In Progress';
    project.image = image;
    project.githubUrl = githubUrl;
    project.liveUrl = liveUrl;
    project.isVisible = isVisible !== undefined ? isVisible : true;
    if (order !== undefined) project.order = order;
    project.updatedBy = session.user.id;
    project.updatedAt = new Date();

    await project.save();

    // Log the change
    await AuditLog.create({
      userId: session.user.id,
      action: 'update',
      resource: 'project',
      resourceId: project._id,
      changes: {
        old: oldData,
        new: project.toObject(),
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.json({ 
      project,
      message: 'Project updated successfully' 
    });
  } catch (error) {
    console.error('PUT /api/admin/projects/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/projects/[id] - Delete project
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
    
    const project = await Project.findById(params.id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const oldData = project.toObject();
    await project.deleteOne();

    // Log the deletion
    await AuditLog.create({
      userId: session.user.id,
      action: 'delete',
      resource: 'project',
      resourceId: params.id,
      changes: {
        old: oldData,
        new: null,
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.json({ 
      message: 'Project deleted successfully' 
    });
  } catch (error) {
    console.error('DELETE /api/admin/projects/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}

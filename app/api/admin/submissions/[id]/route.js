import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Submission, AuditLog } from '@/lib/db/models';

// GET /api/admin/submissions/[id] - Fetch single submission
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
    const submission = await Submission.findById(params.id);
    
    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ submission });
  } catch (error) {
    console.error('GET /api/admin/submissions/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/submissions/[id] - Update submission status
export async function PATCH(request, { params }) {
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
    const { status } = body;
    
    // Validation
    const validStatuses = ['New', 'Read', 'Replied', 'Archived'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: New, Read, Replied, Archived' },
        { status: 400 }
      );
    }
    
    const submission = await Submission.findById(params.id);
    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }
    
    const oldStatus = submission.status;
    submission.status = status;
    await submission.save();
    
    // Log the change
    await AuditLog.create({
      userId: session.user.id,
      action: 'update',
      resource: 'submission',
      resourceId: submission._id,
      changes: {
        old: { status: oldStatus },
        new: { status },
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });
    
    return NextResponse.json({ 
      submission,
      message: 'Submission status updated successfully' 
    });
  } catch (error) {
    console.error('PATCH /api/admin/submissions/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update submission status' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/submissions/[id] - Delete submission
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
    const submission = await Submission.findById(params.id);
    
    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }
    
    const oldData = submission.toObject();
    await submission.deleteOne();
    
    // Log the deletion
    await AuditLog.create({
      userId: session.user.id,
      action: 'delete',
      resource: 'submission',
      resourceId: params.id,
      changes: {
        old: oldData,
        new: null,
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });
    
    return NextResponse.json({ 
      message: 'Submission deleted successfully' 
    });
  } catch (error) {
    console.error('DELETE /api/admin/submissions/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Submission } from '@/lib/db/models';
import { contactSchema } from '@/lib/validations/contact';

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request data
    const validatedData = contactSchema.parse(body);

    // Connect to database
    await connectDB();

    // Get client info
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create submission
    const submission = await Submission.create({
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject || 'No subject',
      message: validatedData.message,
      status: 'New',
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
        data: {
          id: submission._id,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    // Handle Zod validation errors
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle MongoDB errors
    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Database error',
        },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { Subscription } from '@/lib/db/models';
import { newsletterSchema } from '@/lib/validations/contact';

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request data
    const validatedData = newsletterSchema.parse(body);

    // Connect to database
    await connectDB();

    // Check for existing subscription
    const existingSubscription = await Subscription.findOne({
      email: validatedData.email.toLowerCase(),
    });

    if (existingSubscription) {
      // If already subscribed and active
      if (existingSubscription.status === 'Active') {
        return NextResponse.json(
          {
            success: true,
            message: 'You are already subscribed',
          },
          { status: 200 }
        );
      }

      // If previously unsubscribed, reactivate
      existingSubscription.status = 'Active';
      existingSubscription.subscribedAt = new Date();
      existingSubscription.unsubscribedAt = null;
      await existingSubscription.save();

      return NextResponse.json(
        {
          success: true,
          message: 'Subscription reactivated successfully',
        },
        { status: 200 }
      );
    }

    // Get client info
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Create new subscription
    await Subscription.create({
      email: validatedData.email.toLowerCase(),
      status: 'Active',
      source: 'footer',
      ipAddress,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Subscribed successfully',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);

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

    // Handle duplicate key error (shouldn't happen due to check above, but just in case)
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: true,
          message: 'You are already subscribed',
        },
        { status: 200 }
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

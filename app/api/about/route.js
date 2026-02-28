import connectDB from '@/lib/db/mongoose';
import { About } from '@/lib/db/models';

// GET /api/about - Fetch about content for public site
export async function GET() {
  try {
    await connectDB();
    
    const about = await About.findOne({ isVisible: true }).lean();
    
    if (!about) {
      return Response.json({ about: null }, { status: 200 });
    }

    return Response.json({ about }, { status: 200 });
  } catch (error) {
    console.error('Error fetching about:', error);
    return Response.json(
      { error: 'Failed to fetch about content' },
      { status: 500 }
    );
  }
}

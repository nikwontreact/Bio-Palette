import connectDB from '@/lib/db/mongoose';
import { Footer } from '@/lib/db/models';

// GET /api/footer - Fetch footer content for public site
export async function GET() {
  try {
    await connectDB();
    
    const footer = await Footer.findOne().lean();
    
    if (!footer) {
      return Response.json({ footer: null }, { status: 200 });
    }

    return Response.json({ footer }, { status: 200 });
  } catch (error) {
    console.error('Error fetching footer:', error);
    return Response.json(
      { error: 'Failed to fetch footer content' },
      { status: 500 }
    );
  }
}

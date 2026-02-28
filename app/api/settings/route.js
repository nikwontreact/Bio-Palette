import connectDB from '@/lib/db/mongoose';
import { Settings } from '@/lib/db/models';

// GET /api/settings - Fetch site settings for public site
export async function GET() {
  try {
    await connectDB();
    
    const settings = await Settings.findOne().lean();
    
    if (!settings) {
      return Response.json({ settings: null }, { status: 200 });
    }

    return Response.json({ settings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return Response.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

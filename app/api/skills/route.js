import connectDB from '@/lib/db/mongoose';
import { Skill } from '@/lib/db/models';

// GET /api/skills - Fetch all visible skills for public site
export async function GET() {
  try {
    await connectDB();
    
    const skills = await Skill.find({ isVisible: true })
      .sort({ category: 1, order: 1 })
      .lean();

    return Response.json({ skills }, { status: 200 });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return Response.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

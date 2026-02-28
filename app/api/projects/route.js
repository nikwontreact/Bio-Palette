import connectDB from '@/lib/db/mongoose';
import { Project } from '@/lib/db/models';

// GET /api/projects - Fetch all visible projects for public site
export async function GET() {
  try {
    await connectDB();
    
    const projects = await Project.find({ isVisible: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return Response.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

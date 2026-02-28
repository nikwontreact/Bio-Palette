import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import { AuditLog } from '@/lib/db/models';

// GET /api/admin/activity - Fetch recent activity
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Fetch recent audit logs
    const logs = await AuditLog.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('action resource createdAt')
      .lean();

    // Format the logs for display
    const formattedLogs = logs.map(log => {
      const timeAgo = getTimeAgo(new Date(log.createdAt));
      const actionText = formatAction(log.action, log.resource);
      
      return {
        action: actionText,
        time: timeAgo,
        resource: log.resource
      };
    });

    return NextResponse.json({ 
      activity: formattedLogs 
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}

function formatAction(action, resource) {
  const resourceNames = {
    'Hero': 'Hero section',
    'About': 'About section',
    'Project': 'Project',
    'Skill': 'Skill',
    'Contact': 'Contact info',
    'Footer': 'Footer',
    'Settings': 'Settings',
    'Submission': 'Message'
  };

  const actionVerbs = {
    'create': 'created',
    'update': 'updated',
    'delete': 'deleted'
  };

  const resourceName = resourceNames[resource] || resource;
  const verb = actionVerbs[action] || action;

  return `${resourceName} ${verb}`;
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}

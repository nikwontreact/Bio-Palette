'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  TrendingUp, 
  MessageSquare, 
  Eye,
  ArrowRight,
  Briefcase,
  Activity,
  Clock,
  Loader2
} from 'lucide-react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    views: 0,
    messages: 0,
    projects: 0,
    engagement: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchActivity();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch real data from APIs
      const [projectsRes, submissionsRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/submissions')
      ]);

      const projectsData = await projectsRes.json();
      const submissionsData = await submissionsRes.json();

      // Count unread messages
      const unreadMessages = submissionsData.submissions?.filter(
        sub => sub.status !== 'read'
      ).length || 0;

      setStats({
        views: 0, // No analytics API yet
        messages: unreadMessages,
        projects: projectsData.projects?.length || 0,
        engagement: 0 // No analytics API yet
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivity = async () => {
    try {
      const res = await fetch('/api/admin/activity');
      if (res.ok) {
        const data = await res.json();
        setRecentActivity(data.activity || []);
      }
    } catch (error) {
      console.error('Failed to fetch activity:', error);
    }
  };

  const getActivityIcon = (resource) => {
    const icons = {
      'Hero': Sparkles,
      'Project': Briefcase,
      'Submission': MessageSquare,
      'Message': MessageSquare,
      'Settings': Activity,
      'About': Activity,
      'Contact': Activity,
      'Footer': Activity,
      'Skill': Activity,
    };
    return icons[resource] || Activity;
  };

  const quickActions = [
    {
      title: 'Edit Hero',
      description: 'Update your landing section',
      icon: Sparkles,
      href: '/admin/hero',
    },
    {
      title: 'Manage Projects',
      description: 'Add or edit your work',
      icon: Briefcase,
      href: '/admin/projects',
    },
    {
      title: 'View Messages',
      description: 'Check contact submissions',
      icon: MessageSquare,
      href: '/admin/submissions',
    },
    {
      title: 'Site Settings',
      description: 'Configure your portfolio',
      icon: Activity,
      href: '/admin/settings',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-violet-400 transition-all shadow-md hover:shadow-xl hover:shadow-violet-500/20 hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Eye className="w-6 h-6 text-white" />
            </div>
            {stats.views > 0 && <TrendingUp className="w-5 h-5 text-emerald-600" />}
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
            {stats.views > 0 ? stats.views.toLocaleString() : '0'}
          </p>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Views</p>
          {stats.views === 0 && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">No analytics yet</p>
          )}
        </div>

        <div className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-pink-400 transition-all shadow-md hover:shadow-xl hover:shadow-pink-500/20 hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-600" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            {stats.messages > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-pink-600 animate-pulse" />
                <span className="text-xs font-semibold text-pink-600">New</span>
              </div>
            )}
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.messages}</p>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">New Messages</p>
          {stats.messages > 0 && (
            <Link href="/admin/submissions" className="text-xs text-pink-600 hover:text-pink-700 font-medium mt-2 inline-flex items-center gap-1">
              View messages <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        <div className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all shadow-md hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/80" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.projects}</p>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Projects</p>
          <Link href="/admin/projects" className="text-xs text-primary hover:text-primary/80 font-medium mt-2 inline-flex items-center gap-1">
            Manage projects <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 transition-all shadow-md hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Activity className="w-6 h-6 text-white" />
            </div>
            {stats.engagement > 0 && <TrendingUp className="w-5 h-5 text-emerald-600" />}
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
            {stats.engagement > 0 ? `${stats.engagement}%` : '0%'}
          </p>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Engagement</p>
          {stats.engagement === 0 && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">No analytics yet</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1.5">
                {action.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
        {recentActivity.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">No recent activity</p>
            <p className="text-xs text-slate-500 dark:text-slate-500">Your actions will appear here</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700 shadow-sm">
            {recentActivity.map((activity, index) => {
              const IconComponent = getActivityIcon(activity.resource);
              return (
                <div
                  key={index}
                  className="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary dark:text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{activity.action}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Loader2, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Inbox,
  Phone,
  DollarSign,
  Briefcase,
  MessageSquare,
  Filter
} from 'lucide-react';

export default function SubmissionsPage() {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/admin/submissions');
      const data = await res.json();
      
      if (data.submissions) {
        setSubmissions(data.submissions);
      }
    } catch (error) {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success('Status updated');
        fetchSubmissions();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Submission deleted');
        fetchSubmissions();
      }
    } catch (error) {
      toast.error('Failed to delete submission');
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return sub.status === 'unread';
    if (filterType === 'read') return sub.status === 'read';
    return sub.projectType === filterType;
  });

  const stats = {
    total: submissions.length,
    unread: submissions.filter(s => s.status === 'unread').length,
    freelance: submissions.filter(s => s.projectType === 'freelance').length,
    fulltime: submissions.filter(s => s.projectType === 'fulltime').length,
    consultation: submissions.filter(s => s.projectType === 'consultation').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Contact Submissions</h1>
        <p className="text-base text-slate-600 dark:text-slate-400">Manage messages from your contact form</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 border border-primary/20 dark:border-primary/30 shadow-sm">
          <p className="text-xs text-primary dark:text-primary mb-1">Unread</p>
          <p className="text-2xl font-bold text-primary dark:text-primary">{stats.unread}</p>
        </div>
        <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 border border-primary/20 dark:border-primary/30 shadow-sm">
          <p className="text-xs text-primary dark:text-primary mb-1">Freelance</p>
          <p className="text-2xl font-bold text-primary dark:text-primary">{stats.freelance}</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800 shadow-sm">
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">Full-time</p>
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{stats.fulltime}</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 border border-amber-200 dark:border-amber-800 shadow-sm">
          <p className="text-xs text-amber-600 dark:text-amber-400 mb-1">Consultation</p>
          <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{stats.consultation}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filter:</span>
          <Button
            size="sm"
            variant={filterType === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterType('all')}
            className={filterType === 'all' ? 'bg-primary' : ''}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filterType === 'unread' ? 'default' : 'outline'}
            onClick={() => setFilterType('unread')}
            className={filterType === 'unread' ? 'bg-primary' : ''}
          >
            Unread
          </Button>
          <Button
            size="sm"
            variant={filterType === 'read' ? 'default' : 'outline'}
            onClick={() => setFilterType('read')}
            className={filterType === 'read' ? 'bg-emerald-600' : ''}
          >
            Read
          </Button>
          <Button
            size="sm"
            variant={filterType === 'freelance' ? 'default' : 'outline'}
            onClick={() => setFilterType('freelance')}
            className={filterType === 'freelance' ? 'bg-primary' : ''}
          >
            Freelance
          </Button>
          <Button
            size="sm"
            variant={filterType === 'fulltime' ? 'default' : 'outline'}
            onClick={() => setFilterType('fulltime')}
            className={filterType === 'fulltime' ? 'bg-emerald-600' : ''}
          >
            Full-time
          </Button>
          <Button
            size="sm"
            variant={filterType === 'consultation' ? 'default' : 'outline'}
            onClick={() => setFilterType('consultation')}
            className={filterType === 'consultation' ? 'bg-amber-600' : ''}
          >
            Consultation
          </Button>
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-12 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            {submissions.length === 0 ? 'No submissions yet' : 'No submissions match this filter'}
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {submissions.length === 0 
              ? 'Messages from your contact form will appear here'
              : 'Try selecting a different filter'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <div
              key={submission._id}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-medium shadow-lg shadow-primary/25 flex-shrink-0">
                    {submission.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{submission.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{submission.email}</p>
                    {submission.phone && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                        <Phone className="h-3 w-3" />
                        {submission.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge 
                    className={`${
                      submission.status === 'read' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' 
                        : 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border-primary/20 dark:border-primary/30'
                    } border`}
                  >
                    {submission.status === 'read' ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Read</>
                    ) : (
                      <><Clock className="h-3 w-3 mr-1" /> Unread</>
                    )}
                  </Badge>
                  {submission.projectType && (
                    <Badge variant="secondary" className="text-xs bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border-primary/20 dark:border-primary/30">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {submission.projectType}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {/* Project Details */}
                <div className="grid md:grid-cols-3 gap-3">
                  {submission.projectType && (
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        Project Type
                      </p>
                      <p className="text-sm text-slate-900 dark:text-white capitalize">{submission.projectType}</p>
                    </div>
                  )}
                  {submission.budget && (
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        Budget
                      </p>
                      <p className="text-sm text-slate-900 dark:text-white">{submission.budget}</p>
                    </div>
                  )}
                  {submission.preferredContact && (
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Preferred Contact
                      </p>
                      <p className="text-sm text-slate-900 dark:text-white capitalize">{submission.preferredContact}</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Message</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{submission.message}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(submission.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    {submission.status !== 'read' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(submission._id, 'read')}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(submission._id)}
                      className="border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

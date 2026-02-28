'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Save, 
  Loader2, 
  Settings as SettingsIcon, 
  User, 
  Link as LinkIcon, 
  Sparkles,
  Mail,
  Phone,
  MapPin,
  FileDown,
  Upload,
  X
} from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    siteName: '',
    siteTitle: '',
    siteDescription: '',
    email: '',
    phone: '',
    location: '',
    resumeUrl: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      
      if (data.settings) {
        setFormData({
          siteName: data.settings.siteName || '',
          siteTitle: data.settings.siteTitle || '',
          siteDescription: data.settings.siteDescription || '',
          email: data.settings.email || '',
          phone: data.settings.phone || '',
          location: data.settings.location || '',
          resumeUrl: data.settings.resumeUrl || '',
          socialLinks: data.settings.socialLinks || {
            linkedin: '',
            github: '',
            twitter: '',
          },
        });
      }
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Upload resume if selected
      let resumeUrl = formData.resumeUrl;
      if (resumeFile) {
        setUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('file', resumeFile);

        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.url) {
          resumeUrl = uploadData.url;
        }
        setUploading(false);
      }

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, resumeUrl }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save');
      }

      // Update formData with new resume URL
      setFormData({ ...formData, resumeUrl });
      setResumeFile(null);

      toast.success('Settings saved successfully! ✨');
    } catch (error) {
      toast.error(error.message || 'Failed to save settings');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Resume must be less than 10MB');
      return;
    }

    setResumeFile(file);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Site Settings</h1>
        <p className="text-base text-slate-600 dark:text-slate-400">Configure your portfolio's global settings and appearance</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Information */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">General Information</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Basic site information</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Site Name *</Label>
              <Input
                id="siteName"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                placeholder="Your Name"
                required
                className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Displayed in header, footer, and browser title
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteTitle" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Site Title</Label>
              <Input
                id="siteTitle"
                value={formData.siteTitle}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                placeholder="Portfolio Title"
                className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="siteDescription" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={formData.siteDescription}
                onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                placeholder="Brief description for SEO and social sharing"
                rows={3}
                className="border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Your contact details</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Your City, Country"
                className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <FileDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Resume/CV</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Upload your resume for download</p>
            </div>
          </div>

          <div className="space-y-4">
            {formData.resumeUrl && (
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                    <FileDown className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Current Resume</p>
                    <a 
                      href={formData.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-medium"
                    >
                      View Resume →
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, resumeUrl: '' })}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  title="Remove resume"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            )}

            {resumeFile && (
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                    <Upload className="h-5 w-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{resumeFile.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Ready to upload</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setResumeFile(null)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  title="Cancel upload"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            )}

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center hover:border-primary dark:hover:border-primary transition-colors">
              <Label 
                htmlFor="resume" 
                className="cursor-pointer inline-flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                    {formData.resumeUrl ? 'Replace Resume' : 'Upload Resume'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    PDF only, max 10MB
                  </p>
                </div>
              </Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf"
                onChange={handleResumeChange}
                className="hidden"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Your resume will be available for download via the floating action button on your portfolio
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <LinkIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Social Media Links</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Connect your social profiles</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm font-semibold text-slate-700 dark:text-slate-300">LinkedIn</Label>
              <Input
                id="linkedin"
                value={formData.socialLinks.linkedin}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                })}
                placeholder="https://linkedin.com/in/username"
                className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github" className="text-sm font-semibold text-slate-700 dark:text-slate-300">GitHub</Label>
              <Input
                id="github"
                value={formData.socialLinks.github}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, github: e.target.value }
                })}
                placeholder="https://github.com/username"
                className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="twitter" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Twitter/X</Label>
              <Input
                id="twitter"
                value={formData.socialLinks.twitter}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                })}
                placeholder="https://twitter.com/username"
                className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="sticky bottom-6 z-10">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-xl flex items-center justify-center">
            <Button
              type="submit"
              disabled={saving || uploading}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 px-12 h-12 text-base font-semibold transition-all"
            >
              {saving || uploading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {uploading ? 'Uploading...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save All Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

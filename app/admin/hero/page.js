'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Save, Eye, Loader2, Sparkles, Type, Link as LinkIcon } from 'lucide-react';

export default function HeroEditorPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    ctaPrimary: { text: '', href: '' },
    ctaSecondary: { text: '', href: '' },
    isVisible: true,
  });

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch('/api/admin/hero');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setFormData(data.hero);
    } catch (error) {
      toast.error('Failed to load hero content');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save');
      }

      toast.success('Hero section updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update hero content');
    } finally {
      setSaving(false);
    }
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Hero Section</h1>
          <p className="text-base text-slate-600 dark:text-slate-400">Manage your landing page hero content</p>
        </div>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary dark:hover:border-primary transition-all"
        >
          <Eye className="w-4 h-4" />
          Preview
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Title */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
                  <Type className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Main Title</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="title" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Building Modern Web Applications"
                    required
                    className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Use \n for line breaks in the title
                </p>
              </div>
            </div>

            {/* Subtitle */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-600 transition-colors shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Badge Text</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="subtitle" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subtitle *</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Available for Freelance Projects"
                    required
                    className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
                  <Type className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Description</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="description" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Your compelling description..."
                    rows={4}
                    required
                    className="border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Primary CTA */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <LinkIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Primary Button</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="ctaPrimaryText" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Button Text</Label>
                  <Input
                    id="ctaPrimaryText"
                    value={formData.ctaPrimary?.text || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      ctaPrimary: { ...formData.ctaPrimary, text: e.target.value }
                    })}
                    placeholder="Get in Touch"
                    className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="ctaPrimaryHref" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Link/Section</Label>
                  <Input
                    id="ctaPrimaryHref"
                    value={formData.ctaPrimary?.href || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      ctaPrimary: { ...formData.ctaPrimary, href: e.target.value }
                    })}
                    placeholder="#contact"
                    className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600 transition-colors shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <LinkIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Secondary Button</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="ctaSecondaryText" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Button Text</Label>
                  <Input
                    id="ctaSecondaryText"
                    value={formData.ctaSecondary?.text || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      ctaSecondary: { ...formData.ctaSecondary, text: e.target.value }
                    })}
                    placeholder="View Projects"
                    className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="ctaSecondaryHref" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Link/Section</Label>
                  <Input
                    id="ctaSecondaryHref"
                    value={formData.ctaSecondary?.href || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      ctaSecondary: { ...formData.ctaSecondary, href: e.target.value }
                    })}
                    placeholder="#about"
                    className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Section Visibility</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Show this section on your site</p>
                </div>
                <Switch
                  checked={formData.isVisible}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVisible: checked })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-6 z-10">
          <div className="flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-xl">
            <Button
              type="submit"
              disabled={saving}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg shadow-primary/30 hover:shadow-xl px-12 h-12 text-base font-semibold"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

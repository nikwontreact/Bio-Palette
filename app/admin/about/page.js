'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  Save, 
  Loader2, 
  User, 
  GraduationCap, 
  Plus, 
  Trash2, 
  Award,
  Sparkles,
  Calendar,
  BookOpen,
  Star,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

export default function AboutEditorPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    profileImage: '',
    education: [],
    highlights: [],
    isVisible: true,
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/admin/about');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      
      // Ensure highlights are objects with text property
      const about = {
        ...data.about,
        highlights: (data.about.highlights || []).map(h => 
          typeof h === 'string' ? { text: h, icon: '' } : h
        )
      };
      
      setFormData(about);
    } catch (error) {
      toast.error('Failed to load about content');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      console.log('Submitting formData:', formData);
      
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save');
      }

      toast.success('About section updated! ✨');
    } catch (error) {
      toast.error(error.message || 'Failed to update about content');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to upload');
      }

      const data = await res.json();
      console.log('Upload response:', data);
      setFormData(prev => ({ ...prev, profileImage: data.url }));
      toast.success('Image uploaded successfully! 📸');
    } catch (error) {
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', institution: '', year: '', focus: '' }]
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const removeEducation = (index) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index)
    });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, { text: '', icon: '' }]
    });
  };

  const updateHighlight = (index, field, value) => {
    const updated = [...formData.highlights];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, highlights: updated });
  };

  const removeHighlight = (index) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index)
    });
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
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">About Section</h1>
        <p className="text-base text-slate-600 dark:text-slate-400">Tell your story and showcase your journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bio Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Story</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Share your professional biography</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileImage" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Profile Image</Label>
              
              {/* Image Preview */}
              {formData.profileImage && (
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img 
                    src={formData.profileImage} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover rounded-full border-4 border-primary/20"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                    onClick={() => setFormData(prev => ({ ...prev, profileImage: '' }))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Upload Button */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-sm text-slate-600">Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 text-slate-600" />
                          <span className="text-sm text-slate-600">Upload from computer</span>
                        </>
                      )}
                    </div>
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </div>
              </div>

              {/* Or URL Input */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or use URL</span>
                </div>
              </div>

              <Input
                id="profileImage"
                value={formData.profileImage || ''}
                onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                placeholder="https://example.com/your-photo.jpg"
                type="url"
                className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Upload an image or enter a URL. Max size: 5MB. Supported: JPG, PNG, GIF, WebP
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Biography *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell your story... What drives you? What are you passionate about?"
                rows={6}
                required
                className="resize-none border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Write in first person to connect with your audience
              </p>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Education</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Your academic background</p>
              </div>
            </div>
            <Button
              type="button"
              onClick={addEducation}
              size="sm"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg shadow-primary/25"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>

          {formData.education.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700">
              <GraduationCap className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">No education entries yet</p>
              <Button
                type="button"
                onClick={addEducation}
                variant="outline"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Entry
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-semibold shadow-lg shadow-primary/25">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">Education #{index + 1}</h3>
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeEducation(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Degree *</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        placeholder="B.S. in Computer Science"
                        required
                        className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Institution *</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        placeholder="University of California"
                        required
                        className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Year
                      </Label>
                      <Input
                        value={edu.year}
                        onChange={(e) => updateEducation(index, 'year', e.target.value)}
                        placeholder="2018 - 2022"
                        className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Focus/Honors</Label>
                      <Input
                        value={edu.focus}
                        onChange={(e) => updateEducation(index, 'focus', e.target.value)}
                        placeholder="Software Engineering & Web Development"
                        className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Highlights Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Highlights</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Key achievements and facts</p>
              </div>
            </div>
            <Button
              type="button"
              onClick={addHighlight}
              size="sm"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg shadow-amber-500/25"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Highlight
            </Button>
          </div>

          {formData.highlights.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700">
              <Star className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">No highlights yet</p>
              <Button
                type="button"
                onClick={addHighlight}
                variant="outline"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Highlight
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {formData.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-lg hover:shadow-amber-500/10 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        value={highlight?.text || ''}
                        onChange={(e) => updateHighlight(index, 'text', e.target.value)}
                        placeholder="50+ Projects Completed"
                        required
                        className="h-11 border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visibility & Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Visibility Toggle */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Section Visibility</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Show on your site</p>
                </div>
              </div>
              <Switch
                checked={formData.isVisible}
                onCheckedChange={(checked) => setFormData({ ...formData, isVisible: checked })}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center">
            <Button
              type="submit"
              disabled={saving}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg shadow-primary/25 w-full"
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

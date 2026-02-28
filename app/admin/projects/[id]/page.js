'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Save, ArrowLeft, Loader2, X, Eye } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    technologies: [],
    status: 'In Progress',
    image: '',
    githubUrl: '',
    liveUrl: '',
    isVisible: true,
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/admin/projects/${params.id}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setFormData(data.project);
    } catch (error) {
      toast.error('Failed to load project');
      console.error(error);
      router.push('/admin/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/projects/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update');
      }

      const data = await res.json();
      setFormData(data.project);
      toast.success('Project updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update project');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology();
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
    <div className="max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/admin/projects')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Edit Project</h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          Update project information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Info Card */}
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Basic Information</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Project title and descriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="font-semibold text-slate-700 dark:text-slate-300">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Protein Structure Analysis"
                  required
                  className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600"
                />
              </div>

              <div>
                <Label htmlFor="shortDescription" className="font-semibold text-slate-700 dark:text-slate-300">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => handleChange('shortDescription', e.target.value)}
                  placeholder="A brief overview of your project..."
                  rows={3}
                  required
                  className="resize-none dark:bg-slate-900 dark:text-white dark:border-slate-600"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  This will be shown in the project card
                </p>
              </div>

              <div>
                <Label htmlFor="longDescription" className="font-semibold text-slate-700 dark:text-slate-300">Long Description</Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription || ''}
                  onChange={(e) => handleChange('longDescription', e.target.value)}
                  placeholder="Detailed description of your project, methodology, results..."
                  rows={6}
                  className="resize-none dark:bg-slate-900 dark:text-white dark:border-slate-600"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Optional: Detailed information shown when expanded
                </p>
              </div>

              <div>
                <Label htmlFor="status" className="font-semibold text-slate-700 dark:text-slate-300">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Technologies Card */}
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Technologies</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Tools and technologies used in this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleTechKeyDown}
                  placeholder="e.g., Python, CRISPR, Machine Learning"
                  className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600"
                />
                <Button type="button" onClick={addTechnology}>
                  Add
                </Button>
              </div>
              
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="ml-1 hover:text-red-600 dark:hover:text-red-400"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Links Card */}
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Links & Media</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Project links and image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="image" className="font-semibold text-slate-700 dark:text-slate-300">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image || ''}
                  onChange={(e) => handleChange('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600"
                />
              </div>

              <div>
                <Label htmlFor="githubUrl" className="font-semibold text-slate-700 dark:text-slate-300">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  value={formData.githubUrl || ''}
                  onChange={(e) => handleChange('githubUrl', e.target.value)}
                  placeholder="https://github.com/username/repo"
                  type="url"
                  className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600"
                />
              </div>

              <div>
                <Label htmlFor="liveUrl" className="font-semibold text-slate-700 dark:text-slate-300">Live Demo URL</Label>
                <Input
                  id="liveUrl"
                  value={formData.liveUrl || ''}
                  onChange={(e) => handleChange('liveUrl', e.target.value)}
                  placeholder="https://demo.example.com"
                  type="url"
                  className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600"
                />
              </div>
            </CardContent>
          </Card>

          {/* Visibility Card */}
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Visibility</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Control whether this project is visible on the site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isVisible" className="text-base font-semibold text-slate-700 dark:text-slate-300">Show Project</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Toggle to show or hide this project on your portfolio
                  </p>
                </div>
                <Switch
                  id="isVisible"
                  checked={formData.isVisible}
                  onCheckedChange={(checked) => handleChange('isVisible', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button type="submit" disabled={saving} className="min-w-[120px]">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button type="button" variant="outline" asChild>
              <a href="/#projects" target="_blank">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </a>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

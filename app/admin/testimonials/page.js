'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Plus, 
  Loader2, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star,
  MessageSquare,
  Upload,
  X,
  Save,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function TestimonialsPage() {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    image: '',
    rating: 5,
    text: '',
    projectType: '',
    isVisible: true,
    order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      
      if (data.testimonials) {
        setTestimonials(data.testimonials);
      }
    } catch (error) {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        return data.url;
      }
      throw new Error('Upload failed');
    } catch (error) {
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let imageUrl = formData.image;
    if (imageFile) {
      imageUrl = await uploadImage();
      if (!imageUrl) return;
    }

    const payload = { ...formData, image: imageUrl };

    try {
      const url = editingId 
        ? `/api/admin/testimonials/${editingId}`
        : '/api/admin/testimonials';
      
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? 'Testimonial updated' : 'Testimonial created');
        resetForm();
        fetchTestimonials();
      }
    } catch (error) {
      toast.error('Failed to save testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial._id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company || '',
      image: testimonial.image || '',
      rating: testimonial.rating,
      text: testimonial.text,
      projectType: testimonial.projectType || '',
      isVisible: testimonial.isVisible,
      order: testimonial.order,
    });
    setImagePreview(testimonial.image || '');
    setIsCreating(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Testimonial deleted');
        fetchTestimonials();
      }
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  const toggleVisibility = async (testimonial) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${testimonial._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...testimonial, isVisible: !testimonial.isVisible }),
      });

      if (res.ok) {
        toast.success(`Testimonial ${!testimonial.isVisible ? 'shown' : 'hidden'}`);
        fetchTestimonials();
      }
    } catch (error) {
      toast.error('Failed to update visibility');
    }
  };

  const updateOrder = async (id, newOrder) => {
    try {
      const testimonial = testimonials.find(t => t._id === id);
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...testimonial, order: newOrder }),
      });

      if (res.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      company: '',
      image: '',
      rating: 5,
      text: '',
      projectType: '',
      isVisible: true,
      order: 0,
    });
    setEditingId(null);
    setIsCreating(false);
    setImageFile(null);
    setImagePreview('');
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Testimonials</h1>
          <p className="text-base text-slate-600 dark:text-slate-400">Manage client testimonials and reviews</p>
        </div>
        {!isCreating && (
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg shadow-primary/25"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Testimonial
          </Button>
        )}
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Testimonial' : 'New Testimonial'}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={resetForm}
              className="border-slate-200 dark:border-slate-600"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold text-slate-700 dark:text-slate-300">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="John Doe"
                  className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="font-semibold text-slate-700 dark:text-slate-300">Role *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  placeholder="CEO"
                  className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="font-semibold text-slate-700 dark:text-slate-300">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Inc"
                  className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectType" className="font-semibold text-slate-700 dark:text-slate-300">Project Type</Label>
                <Select 
                  value={formData.projectType} 
                  onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                >
                  <SelectTrigger className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freelance">Freelance Project</SelectItem>
                    <SelectItem value="fulltime">Full-time Position</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating" className="font-semibold text-slate-700 dark:text-slate-300">Rating *</Label>
                <Select 
                  value={formData.rating.toString()} 
                  onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                >
                  <SelectTrigger className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        <div className="flex items-center gap-1">
                          {[...Array(num)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order" className="font-semibold text-slate-700 dark:text-slate-300">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="h-11 dark:bg-slate-900 dark:text-white dark:border-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text" className="font-semibold text-slate-700 dark:text-slate-300">Testimonial Text *</Label>
              <Textarea
                id="text"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                required
                rows={4}
                placeholder="This developer exceeded all expectations..."
                className="resize-none dark:bg-slate-900 dark:text-white dark:border-slate-600"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold text-slate-700 dark:text-slate-300">Profile Image</Label>
              <div className="flex items-start gap-4">
                {imagePreview && (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-200 dark:border-slate-600"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                        setFormData({ ...formData, image: '' });
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer dark:bg-slate-900 dark:text-white dark:border-slate-600"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Max 5MB. Recommended: Square image, 200x200px
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isVisible"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="rounded border-slate-300 dark:border-slate-600"
              />
              <Label htmlFor="isVisible" className="cursor-pointer text-slate-700 dark:text-slate-300">
                Show on website
              </Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={uploading}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg shadow-primary/25"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingId ? 'Update' : 'Create'}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      {testimonials.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-12 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No testimonials yet</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Add your first client testimonial</p>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg shadow-primary/25"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Profile Image */}
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 dark:border-slate-600 flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-medium text-xl shadow-lg shadow-primary/25 flex-shrink-0">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h3>
                        {!testimonial.isVisible && (
                          <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-900">
                            <EyeOff className="h-3 w-3 mr-1" />
                            Hidden
                          </Badge>
                        )}
                        {testimonial.projectType && (
                          <Badge variant="secondary" className="text-xs bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border-primary/20 dark:border-primary/30">
                            {testimonial.projectType}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {testimonial.role}{testimonial.company && ` at ${testimonial.company}`}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Order: {testimonial.order}</span>
                      <div className="flex flex-col gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateOrder(testimonial._id, testimonial.order - 1)}
                          disabled={index === 0}
                          className="h-6 w-6 p-0"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateOrder(testimonial._id, testimonial.order + 1)}
                          disabled={index === testimonials.length - 1}
                          className="h-6 w-6 p-0"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 mb-4">
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic">"{testimonial.text}"</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(testimonial)}
                      className="border-slate-200 dark:border-slate-600 hover:bg-primary/10 hover:border-primary hover:text-primary"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleVisibility(testimonial)}
                      className="border-slate-200 dark:border-slate-600 hover:bg-primary/10 hover:border-primary hover:text-primary"
                    >
                      {testimonial.isVisible ? (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Show
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(testimonial._id)}
                      className="border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
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

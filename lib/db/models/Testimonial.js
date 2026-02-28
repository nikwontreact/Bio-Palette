import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
  text: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Indexes
TestimonialSchema.index({ order: 1 });
TestimonialSchema.index({ isVisible: 1 });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

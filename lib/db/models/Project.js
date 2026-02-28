import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  technologies: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'On Hold', 'Published', 'Archived'],
    default: 'In Progress',
  },
  icon: {
    type: String,
    default: 'Code2',
  },
  githubUrl: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  demoUrl: {
    type: String,
  },
  links: {
    github: { type: String },
    live: { type: String },
    demo: { type: String },
  },
  order: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Indexes
ProjectSchema.index({ order: 1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ isVisible: 1 });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

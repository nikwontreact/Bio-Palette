import mongoose from 'mongoose';

const FooterSchema = new mongoose.Schema({
  columns: [{
    title: { type: String, required: true },
    links: [{
      text: { type: String, required: true },
      href: { type: String, required: true },
    }],
  }],
  copyright: {
    type: String,
    required: true,
  },
  socialLinks: {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
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

export default mongoose.models.Footer || mongoose.model('Footer', FooterSchema);

import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  availability: {
    status: {
      type: String,
      enum: ['Available', 'Busy', 'Not Available'],
      default: 'Available',
    },
    message: { type: String },
  },
  socialLinks: {
    linkedin: { type: String },
    github: { type: String },
    researchgate: { type: String },
    orcid: { type: String },
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

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

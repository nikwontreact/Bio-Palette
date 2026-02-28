import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  projectType: {
    type: String,
    enum: ['freelance', 'fulltime', 'consultation', 'other'],
  },
  budget: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  preferredContact: {
    type: String,
    enum: ['email', 'phone', 'whatsapp'],
    default: 'email',
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Replied', 'Archived'],
    default: 'New',
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  readAt: {
    type: Date,
  },
  repliedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Indexes
SubmissionSchema.index({ createdAt: -1 });
SubmissionSchema.index({ status: 1 });
SubmissionSchema.index({ projectType: 1 });

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);

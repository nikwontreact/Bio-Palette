import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  resource: {
    type: String,
    required: true,
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  changes: {
    type: mongoose.Schema.Types.Mixed,
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
}, {
  timestamps: true,
});

// Indexes
AuditLogSchema.index({ userId: 1 });
AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ resource: 1 });

export default mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);

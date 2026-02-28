import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Unsubscribed'],
    default: 'Active',
  },
  source: {
    type: String,
    default: 'footer',
  },
  ipAddress: {
    type: String,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Indexes
SubscriptionSchema.index({ email: 1 });
SubscriptionSchema.index({ status: 1 });

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);

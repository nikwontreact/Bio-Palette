import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  proficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate',
  },
  icon: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  order: {
    type: Number,
    default: 0,
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
SkillSchema.index({ category: 1 });
SkillSchema.index({ order: 1 });
SkillSchema.index({ isVisible: 1 });

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);

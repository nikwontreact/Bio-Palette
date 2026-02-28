import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: true,
    default: 'I\'m a full-stack developer with expertise in building modern web applications using the MERN stack. I specialize in creating scalable, user-friendly solutions that solve real-world problems.\n\nWith a passion for clean code and innovative design, I transform ideas into powerful digital experiences. From responsive frontends to robust backend APIs, I handle every aspect of web development with precision and creativity.',
  },
  profileImage: {
    type: String,
  },
  education: [{
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String },
    focus: { type: String },
  }],
  highlights: [{
    icon: { type: String },
    text: { type: String, required: true },
  }],
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

export default mongoose.models.About || mongoose.model('About', AboutSchema);

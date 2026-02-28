import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Building Modern\nWeb Applications\nWith MERN Stack',
  },
  subtitle: {
    type: String,
    required: true,
    default: 'Available for Freelance Projects',
  },
  description: {
    type: String,
    required: true,
    default: 'Full-stack developer specializing in MongoDB, Express.js, React, and Node.js. Creating scalable, performant web applications with modern technologies and best practices.',
  },
  ctaPrimary: {
    text: { type: String, required: true, default: 'Get in Touch' },
    href: { type: String, required: true, default: '#contact' },
  },
  ctaSecondary: {
    text: { type: String, required: true, default: 'View Projects' },
    href: { type: String, required: true, default: '#projects' },
  },
  backgroundImage: {
    type: String,
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

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);

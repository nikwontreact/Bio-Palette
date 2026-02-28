import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    default: 'Nikhil Sode',
  },
  siteTitle: {
    type: String,
    default: 'Full Stack Developer',
  },
  siteDescription: {
    type: String,
    default: 'Analytical Full Stack Developer with proven experience designing responsive, high-performance web applications',
  },
  themeColor: {
    type: Number,
    default: 200, // Blue hue
    min: 0,
    max: 360,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  resumeUrl: {
    type: String,
  },
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
  },
  logo: {
    type: String,
  },
  favicon: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

import mongoose from 'mongoose';
import { User } from '../lib/db/models/index.js';
import { hashPassword } from '../lib/auth/password.js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

async function createAdmin() {
  try {
    console.log('🔐 Creating Admin User...\n');
    
    // Default admin credentials
    const name = 'Admin User';
    const email = 'admin@example.com';
    const password = 'admin123';

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('ℹ️  Admin user already exists!');
      console.log(`Email: ${existingUser.email}`);
      console.log(`\nYou can login at: http://localhost:3000/login`);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin user
    const admin = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!\n');
    console.log('Login Credentials:');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${password}`);
    console.log(`\nYou can now login at: http://localhost:3000/login`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();

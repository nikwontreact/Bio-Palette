import mongoose from 'mongoose';
import * as Models from '../lib/db/models/index.js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

async function seed() {
  try {
    console.log('🌱 Starting database seed...');
    console.log('📡 Connecting to:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    await Models.Hero.deleteMany({});
    await Models.About.deleteMany({});
    await Models.Contact.deleteMany({});
    await Models.Footer.deleteMany({});
    await Models.Project.deleteMany({});
    await Models.Skill.deleteMany({});
    await Models.Settings.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Hero
    await Models.Hero.create({
      title: 'Full Stack Developer\nCrafting Scalable\nWeb Solutions',
      subtitle: 'Open to Opportunities',
      description: 'Analytical Full Stack Developer with proven experience designing responsive, high-performance web applications using React.js, JavaScript, and Python. Skilled in API integration, UI optimization, and cross-functional collaboration to deliver efficient, maintainable, and scalable solutions.',
      ctaPrimary: {
        text: 'Get in Touch',
        href: '#contact',
      },
      ctaSecondary: {
        text: 'View Projects',
        href: '#projects',
      },
      isVisible: true,
    });
    console.log('✅ Seeded Hero');

    // Seed About
    await Models.About.create({
      bio: "I'm a Full Stack Developer passionate about creating efficient, maintainable, and scalable web solutions. With hands-on experience in React.js, JavaScript, Python, and modern frameworks, I focus on delivering business value through clean code, technical precision, and continuous improvement.\n\nI thrive in collaborative environments where I can contribute to cross-functional teams, optimize UI/UX experiences, and build high-performance applications. Currently expanding my expertise in Node.js, Express, MongoDB, and JWT-based authentication to strengthen my full-stack capabilities.",
      education: [
        {
          degree: 'B.Tech - Computer Science Engineering',
          institution: 'IK Gujral Punjab Technical University, Mohali',
          year: '2018 - 2022',
          focus: 'Software Engineering & Web Development',
        },
        {
          degree: 'Diploma - Computer Science Engineering',
          institution: 'SNDP Polytechnic, Chandwad, Maharashtra',
          year: '2015 - 2018',
          focus: 'Computer Science Fundamentals',
        },
      ],
      highlights: [
        { text: 'React.js & Python Expert' },
        { text: 'UI/UX Optimization' },
        { text: 'API Integration Specialist' },
        { text: 'Agile Workflow' },
        { text: 'Performance Optimization' },
        { text: 'Responsive Design' },
      ],
      isVisible: true,
    });
    console.log('✅ Seeded About');

    // Seed Contact
    await Models.Contact.create({
      email: 'nikhilsdsde@gmail.com',
      phone: '8999491750',
      location: 'India',
      availability: {
        status: 'Available',
        message: 'Open to full-time opportunities and freelance projects',
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/in/nikhil-sode',
        github: 'https://github.com/nikhilsode',
        twitter: '#',
      },
      isVisible: true,
    });
    console.log('✅ Seeded Contact');

    // Seed Footer
    await Models.Footer.create({
      columns: [
        {
          title: 'Navigation',
          links: [
            { text: 'About', href: '#about' },
            { text: 'Projects', href: '#projects' },
            { text: 'Skills', href: '#skills' },
            { text: 'Contact', href: '#contact' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { text: 'Portfolio', href: '#projects' },
            { text: 'Resume', href: '#' },
            { text: 'GitHub', href: 'https://github.com/nikhilsode' },
            { text: 'LinkedIn', href: 'https://linkedin.com/in/nikhil-sode' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Nikhil Sode. All rights reserved.`,
      socialLinks: {
        linkedin: 'https://linkedin.com/in/nikhil-sode',
        github: 'https://github.com/nikhilsode',
        twitter: '#',
      },
      isVisible: true,
    });
    console.log('✅ Seeded Footer');

    // Seed Settings
    await Models.Settings.create({
      siteName: 'Nikhil Sode',
      siteTitle: 'Full Stack Developer',
      siteDescription: 'Analytical Full Stack Developer with proven experience designing responsive, high-performance web applications',
      themeColor: 200,
      email: 'nikhilsdsde@gmail.com',
      phone: '8999491750',
      location: 'India',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/nikhil-sode',
        github: 'https://github.com/nikhilsode',
        twitter: '',
      },
    });
    console.log('✅ Seeded Settings');

    // Seed Projects
    await Models.Project.create([
      {
        title: 'Portfolio Website',
        shortDescription: 'Personal portfolio website to showcase projects and achievements with responsive design.',
        longDescription: 'Designed and developed a personal portfolio website to showcase projects and achievements. Utilized semantic HTML and modular CSS for maintainable and scalable code. Implemented responsive design principles for optimal viewing across all devices.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'GitHub Pages'],
        status: 'Completed',
        icon: 'Globe',
        githubUrl: 'https://github.com/nikhilsode/portfolio',
        liveUrl: '#',
        isVisible: true,
      },
      {
        title: 'Task App',
        shortDescription: 'Responsive task management web application with task creation, editing, and filtering functionality.',
        longDescription: 'Developed a responsive task management web application with task creation, editing, and filtering functionality. Implemented React Hooks for state management, improving UI responsiveness by 40%. Designed a minimal, intuitive UI optimized for cross-device performance.',
        technologies: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
        status: 'Completed',
        icon: 'Layers',
        githubUrl: 'https://github.com/nikhilsode/task-app',
        liveUrl: '#',
        isVisible: true,
      },
      {
        title: 'ShoppingCart WebApp',
        shortDescription: 'Responsive Shopping Cart app using React.js with Framer Motion animations and Axios integration.',
        longDescription: 'Built a responsive Shopping Cart app using React.js, Tailwind CSS, Framer Motion, and Axios, reducing component complexity by 20% through modular structure. Integrated REST APIs and improved data-fetch reliability with optimized fetch logic, cutting redundant requests by 40%. Implemented add/remove/quantity-update cart features with smooth animations and UI optimizations, improving interaction responsiveness by 25%.',
        technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Axios', 'REST APIs'],
        status: 'Completed',
        icon: 'Code2',
        githubUrl: 'https://github.com/nikhilsode/shopping-cart',
        liveUrl: 'https://dummy-json-shopping-cart.vercel.app',
        isVisible: true,
      },
      {
        title: 'Web Development Internship',
        shortDescription: 'Completed a web development internship at Q-Spiders, gaining hands-on experience in HTML5, CSS3, JavaScript, React.js, and Python.',
        longDescription: 'Completed a comprehensive web development internship focusing on design, API integration, and debugging within an Agile workflow. Enhanced understanding of version control (Git/GitHub) in software development best practices. Gained practical experience in building responsive web applications and working with modern development tools.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Python', 'Git', 'GitHub', 'Agile'],
        status: 'Completed',
        icon: 'Server',
        githubUrl: '#',
        liveUrl: '#',
        isVisible: true,
      },
    ]);
    console.log('✅ Seeded Projects');

    // Seed Skills
    await Models.Skill.create([
      // Languages
      { name: 'JavaScript', category: 'Languages', icon: 'Code2', tags: ['Frontend', 'Backend'], isVisible: true },
      { name: 'Python', category: 'Languages', icon: 'Code2', tags: ['Backend', 'Scripting'], isVisible: true },
      { name: 'HTML5', category: 'Languages', icon: 'Code2', tags: ['Frontend', 'Markup'], isVisible: true },
      { name: 'CSS3', category: 'Languages', icon: 'Code2', tags: ['Frontend', 'Styling'], isVisible: true },
      
      // Frameworks & Libraries
      { name: 'React.js', category: 'Frameworks & Libraries', icon: 'Layers', tags: ['Frontend', 'UI'], isVisible: true },
      { name: 'Node.js', category: 'Frameworks & Libraries', icon: 'Server', tags: ['Backend', 'Runtime'], isVisible: true },
      { name: 'Express', category: 'Frameworks & Libraries', icon: 'Server', tags: ['Backend', 'API'], isVisible: true },
      { name: 'Mongoose', category: 'Frameworks & Libraries', icon: 'Database', tags: ['Database', 'ODM'], isVisible: true },
      { name: 'Tailwind CSS', category: 'Frameworks & Libraries', icon: 'Layers', tags: ['CSS', 'Styling'], isVisible: true },
      { name: 'Framer Motion', category: 'Frameworks & Libraries', icon: 'Zap', tags: ['Animation', 'UI'], isVisible: true },
      { name: 'React Router', category: 'Frameworks & Libraries', icon: 'Globe', tags: ['Routing', 'SPA'], isVisible: true },
      
      // APIs & Database
      { name: 'REST APIs', category: 'APIs & Database', icon: 'Globe', tags: ['API', 'Integration'], isVisible: true },
      { name: 'JSON', category: 'APIs & Database', icon: 'Database', tags: ['Data Format'], isVisible: true },
      { name: 'Axios', category: 'APIs & Database', icon: 'Globe', tags: ['HTTP Client'], isVisible: true },
      { name: 'MongoDB', category: 'APIs & Database', icon: 'Database', tags: ['NoSQL', 'Database'], isVisible: true },
      
      // Tools & Other Skills
      { name: 'Git', category: 'Tools & Other Skills', icon: 'GitBranch', tags: ['Version Control'], isVisible: true },
      { name: 'GitHub', category: 'Tools & Other Skills', icon: 'GitBranch', tags: ['Version Control', 'Collaboration'], isVisible: true },
      { name: 'VS Code', category: 'Tools & Other Skills', icon: 'Code2', tags: ['IDE', 'Editor'], isVisible: true },
      { name: 'Chrome DevTools', category: 'Tools & Other Skills', icon: 'Wrench', tags: ['Debugging'], isVisible: true },
      { name: 'Postman', category: 'Tools & Other Skills', icon: 'Globe', tags: ['API Testing'], isVisible: true },
      { name: 'Responsive Design', category: 'Tools & Other Skills', icon: 'Layers', tags: ['UI/UX', 'Mobile'], isVisible: true },
      { name: 'Debugging', category: 'Tools & Other Skills', icon: 'Wrench', tags: ['Problem Solving'], isVisible: true },
      { name: 'Version Control', category: 'Tools & Other Skills', icon: 'GitBranch', tags: ['Git', 'Workflow'], isVisible: true },
      { name: 'Agile Workflow', category: 'Tools & Other Skills', icon: 'Settings', tags: ['Methodology'], isVisible: true },
    ]);
    console.log('✅ Seeded Skills');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();

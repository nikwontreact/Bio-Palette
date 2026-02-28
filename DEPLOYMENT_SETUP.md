# CI/CD Deployment Setup Guide

## Prerequisites
- GitHub repository connected
- Vercel account (free tier works)
- MongoDB Atlas database
- Cloudinary account

## Step 1: Set up Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository: `nikwontreact/Bio-Palette`
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./` (leave as root)
   - Build Command: `npm run build`
   - Output Directory: `.next`

## Step 2: Add Environment Variables to Vercel

In Vercel Project Settings → Environment Variables, add:

```
MONGODB_URI=mongodb+srv://x11niks_db_user:g54sC3TBKOIvWMKR@cluster0.bsc43n7.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0

NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=K1tjXxbRt8qHk1Gx+rwGHN/jh4ZItgW0a3J9neENYBY=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dwynm2z9t
CLOUDINARY_API_KEY=962956357489383
CLOUDINARY_API_SECRET=HbjQu4MYPSARuZqTHvoQpaGE3nc

NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

**Important:** Update `NEXTAUTH_URL` with your actual Vercel domain after first deployment.

## Step 3: Set up GitHub Secrets

Go to GitHub Repository → Settings → Secrets and variables → Actions

Add these secrets:

### Required for CI/CD:
```
MONGODB_URI=<your-mongodb-uri>
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<your-secret>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dwynm2z9t
CLOUDINARY_API_KEY=962956357489383
CLOUDINARY_API_SECRET=HbjQu4MYPSARuZqTHvoQpaGE3nc
```

### Required for Vercel Deployment:
```
VERCEL_TOKEN=<get-from-vercel-account-settings>
VERCEL_ORG_ID=<get-from-vercel-project-settings>
VERCEL_PROJECT_ID=<get-from-vercel-project-settings>
```

### How to get Vercel tokens:
1. **VERCEL_TOKEN**: 
   - Go to Vercel → Account Settings → Tokens
   - Create new token with name "GitHub Actions"
   - Copy the token

2. **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**:
   - Go to your Vercel project settings
   - Scroll to "Project ID" section
   - Copy both IDs

## Step 4: Deploy

### Option A: Automatic Deployment (Recommended)
1. Push to `main` branch:
   ```bash
   git push origin main
   ```
2. GitHub Actions will automatically:
   - Run linter
   - Build the project
   - Deploy to Vercel (if on main branch)

### Option B: Manual Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

## Step 5: Verify Deployment

1. Check GitHub Actions: 
   - Go to repository → Actions tab
   - Verify CI/CD pipeline passed

2. Check Vercel:
   - Go to Vercel dashboard
   - Verify deployment status
   - Click on deployment URL

3. Test the site:
   - Visit your production URL
   - Test admin login: `https://your-domain.vercel.app/admin/login`
   - Upload an image to test Cloudinary
   - Toggle dark mode

## Step 6: Post-Deployment

1. **Update NEXTAUTH_URL**:
   - Copy your Vercel production URL
   - Update `NEXTAUTH_URL` in Vercel environment variables
   - Redeploy

2. **Create Admin User**:
   ```bash
   # Connect to your production database
   # Run the create-admin script locally pointing to production DB
   MONGODB_URI="<production-uri>" node scripts/create-admin.js
   ```

3. **Set up Custom Domain** (Optional):
   - Go to Vercel → Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed
   - Update `NEXTAUTH_URL` with custom domain

## Monitoring

- **Vercel Dashboard**: Monitor deployments, logs, and analytics
- **GitHub Actions**: Check build status and logs
- **MongoDB Atlas**: Monitor database performance

## Troubleshooting

### Build fails on Vercel:
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check Vercel build logs

### Authentication not working:
- Verify `NEXTAUTH_URL` matches your domain exactly
- Check `NEXTAUTH_SECRET` is set
- Clear browser cookies and try again

### Images not uploading:
- Verify Cloudinary credentials
- Check API key permissions
- Test Cloudinary connection

## Rollback

If deployment fails:
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback in Vercel dashboard
# Go to Deployments → Previous deployment → Promote to Production
```

## CI/CD Pipeline Flow

```
Push to GitHub
    ↓
GitHub Actions triggered
    ↓
Install dependencies
    ↓
Run linter (optional)
    ↓
Build Next.js app
    ↓
Deploy to Vercel (if main branch)
    ↓
Production live! 🚀
```

## Next Steps

- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure CDN caching
- [ ] Set up database backups
- [ ] Add performance monitoring
- [ ] Set up error tracking

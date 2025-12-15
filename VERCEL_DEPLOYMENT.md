# Vercel Deployment Guide

Follow these steps to deploy your Bevabid Photography website to Vercel.

## Prerequisites

✅ Your code is pushed to GitHub (see `GITHUB_SETUP.md`)
✅ You have a Vercel account (sign up at [vercel.com](https://vercel.com) if needed)
✅ Your Supabase project is set up and configured

## Step 1: Prepare Your Project

### 1.1 Test the Build Locally

Before deploying, make sure your project builds successfully:

```bash
# Install dependencies (if not already done)
npm install

# Test the build
npm run build
```

If the build succeeds, you're ready to deploy!

### 1.2 Verify Environment Variables

Make sure you have these values ready:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

You can find these in your Supabase Dashboard → Settings → API

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Website (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account (recommended) or create an account

2. **Create New Project**
   - Click **"Add New..."** → **"Project"**
   - You'll see a list of your GitHub repositories
   - Find and select `bevabid-photography` (or your repo name)
   - Click **"Import"**

3. **Configure Project**
   - **Framework Preset**: Should auto-detect as "Next.js" ✅
   - **Root Directory**: Leave as `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**
   - Click **"Environment Variables"** section
   - Add each variable:
     
     **Variable 1:**
     - Name: `NEXT_PUBLIC_SUPABASE_URL`
     - Value: `https://your-project.supabase.co` (your Supabase URL)
     - Environment: Select all (Production, Preview, Development)
     
     **Variable 2:**
     - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Value: `your-anon-key-here` (your Supabase anon key)
     - Environment: Select all (Production, Preview, Development)

5. **Deploy**
   - Click **"Deploy"** button
   - Wait for the build to complete (usually 2-5 minutes)
   - You'll see a success message with your live URL!

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # From your project directory
   cd "c:\Users\IBLIS\Desktop\bevabid photography"
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No** (for first deployment)
   - Project name? `bevabid-photography` (or your choice)
   - Directory? `./` (press Enter)
   - Override settings? **No**

5. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   # Paste your Supabase URL when prompted
   # Select: Production, Preview, Development
   
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   # Paste your Supabase anon key when prompted
   # Select: Production, Preview, Development
   ```

6. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

## Step 3: Verify Deployment

1. **Check Your Live Site**
   - Visit the URL provided by Vercel (e.g., `bevabid-photography.vercel.app`)
   - Test all pages:
     - ✅ Home page loads
     - ✅ Navigation works
     - ✅ Portfolio page works
     - ✅ Contact form works
     - ✅ Animation displays correctly

2. **Check Build Logs**
   - Go to your Vercel dashboard
   - Click on your project
   - Check the "Deployments" tab for any errors

## Step 4: Post-Deployment Configuration

### 4.1 Update Supabase Settings (if needed)

If you have CORS restrictions:
1. Go to Supabase Dashboard → Settings → API
2. Add your Vercel domain to allowed origins:
   - `https://your-project.vercel.app`
   - `https://your-custom-domain.com` (if using custom domain)

### 4.2 Set Up Custom Domain (Optional)

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

### 4.3 Enable Analytics (Optional)

1. In Vercel Dashboard → Your Project → Analytics
2. Enable Vercel Analytics (free tier available)

## Troubleshooting

### Build Fails

**Error: ERESOLVE dependency conflict**
- This is fixed! The project now uses compatible versions of `three` and `postprocessing`
- An `.npmrc` file with `legacy-peer-deps=true` is included as a fallback
- If you still see this error, Vercel should use the `.npmrc` file automatically

**Error: Module not found**
- Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: Environment variable missing**
- Double-check all environment variables are set in Vercel
- Make sure variable names match exactly (case-sensitive)

**Error: Build timeout**
- Check for large files or slow operations
- Optimize images and assets

### Site Works but Animation Doesn't Show

- Check browser console for errors
- Verify WebGL is supported in the browser
- Check that Three.js and postprocessing are properly installed

### Supabase Connection Issues

- Verify environment variables are correct
- Check Supabase project is active
- Review Supabase logs in dashboard

## Updating Your Deployment

After making changes:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your changes description"
   git push
   ```

2. **Vercel Auto-Deploys**
   - Vercel automatically detects GitHub pushes
   - Creates a new deployment automatically
   - You'll get a notification when it's done

3. **Manual Deploy (if needed)**
   ```bash
   vercel --prod
   ```

## Important Notes

⚠️ **Security:**
- Never commit `.env.local` to GitHub (already in `.gitignore`)
- Always use environment variables in Vercel dashboard
- Keep your Supabase service role key secret

✅ **Best Practices:**
- Test locally before pushing
- Use preview deployments for testing
- Monitor Vercel logs for errors
- Set up error tracking (Sentry, etc.)

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Check deployment logs in Vercel dashboard

---

**Your site should now be live! 🎉**

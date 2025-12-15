# Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
Ensure all environment variables are set in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)

### 2. Supabase Setup

#### Storage Buckets
1. Go to Supabase Dashboard → Storage
2. Create bucket: `videos`
   - Set as Public: Yes
   - Allowed MIME types: `video/*`
3. Create bucket: `images`
   - Set as Public: Yes
   - Allowed MIME types: `image/*`

#### Database
1. Go to Supabase Dashboard → SQL Editor
2. Run the SQL from `supabase-schema.sql`
3. Verify tables are created:
   - `videos`
   - `case_studies`
   - `case_study_results`
   - `case_study_media`
   - `showcase_items`
   - `contact_submissions`

#### Row Level Security (RLS)
- Review and adjust RLS policies based on your authentication setup
- Currently set to allow public read access
- Admin policies need proper authentication checks

### 3. Authentication (CRITICAL)
⚠️ **The admin panel currently has NO authentication. You MUST implement authentication before deploying to production.**

Options:
- Supabase Auth
- NextAuth.js
- Custom authentication solution

### 4. Build & Test
```bash
npm run build
npm start
```

Test all pages:
- [ ] Home page loads correctly
- [ ] Navigation works
- [ ] All pages are accessible
- [ ] Contact form works (check Supabase)
- [ ] Admin panel (with auth) works
- [ ] Video uploads work
- [ ] Responsive design on mobile/tablet

## Vercel Deployment

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (optional, for server-side operations)
6. Click "Deploy"

### Step 3: Post-Deployment
1. Verify the site is live
2. Test all functionality
3. Set up custom domain (optional)
4. Configure analytics (optional)

## Security Checklist

Before going live:
- [ ] Admin panel authentication implemented
- [ ] RLS policies configured correctly
- [ ] Contact form has rate limiting
- [ ] CORS policies set up
- [ ] Error handling in place
- [ ] Logging configured
- [ ] Backup strategy in place

## Performance Optimization

### Images
- Use Next.js Image component (already implemented)
- Optimize logo SVG
- Compress any additional images

### Videos
- Use optimized video formats (WebM, MP4)
- Implement lazy loading (already in place)
- Consider video CDN for large files

### Code
- Already using Next.js App Router
- Code splitting automatic
- Consider adding loading states

## Monitoring

Set up:
- Error tracking (Sentry, etc.)
- Analytics (Google Analytics, Vercel Analytics)
- Uptime monitoring
- Performance monitoring

## Support

For issues or questions:
1. Check Supabase logs
2. Check Vercel logs
3. Review browser console
4. Check network requests

---

**Remember**: Always test in a staging environment before deploying to production!


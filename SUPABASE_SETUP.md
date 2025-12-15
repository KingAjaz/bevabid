# Supabase Setup Guide

This guide will walk you through setting up Supabase for your Bevabid Photography application.

## 📋 Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com) if you don't have one)
- Your project folder ready

---

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Fill in the project details:
   - **Name**: `bevabid-photography` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is fine for development
5. Click **"Create new project"**
6. Wait 2-3 minutes for the project to be provisioned

---

## Step 2: Get Your API Keys

1. Once your project is ready, go to **Settings** → **API** (in the left sidebar)
2. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

3. Copy both values - you'll need them in the next step

---

## Step 3: Configure Environment Variables

1. In your project root folder, create a file named `.env.local` (if it doesn't exist)
2. Add the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Replace `your_project_url_here` with your Project URL from Step 2
4. Replace `your_anon_key_here` with your anon/public key from Step 2

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **Important**: 
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep your keys secure and private

---

## Step 4: Set Up Storage Buckets

Your app needs two storage buckets for videos and images.

### Create the `videos` Bucket

1. In Supabase Dashboard, go to **Storage** (left sidebar)
2. Click **"New bucket"**
3. Configure:
   - **Name**: `videos`
   - **Public bucket**: ✅ **Enable this** (toggle ON)
   - **File size limit**: 50 MB (or adjust based on your needs)
   - **Allowed MIME types**: `video/*`
4. Click **"Create bucket"**

### Create the `images` Bucket

1. Click **"New bucket"** again
2. Configure:
   - **Name**: `images`
   - **Public bucket**: ✅ **Enable this** (toggle ON)
   - **File size limit**: 5 MB (or adjust based on your needs)
   - **Allowed MIME types**: `image/*`
3. Click **"Create bucket"**

### Set Storage Policies (Important!)

After creating buckets, you need to set up policies so your app can upload files:

1. Click on the **`videos`** bucket
2. Go to **"Policies"** tab
3. Click **"New Policy"** → **"Create a policy from scratch"**
4. Configure:
   - **Policy name**: `Allow public uploads`
   - **Allowed operation**: `INSERT`
   - **Policy definition**: 
     ```sql
     (bucket_id = 'videos')
     ```
   - **Policy command**: `INSERT`
   - **Target roles**: `public`
5. Click **"Review"** → **"Save policy"**

6. Repeat for **`images`** bucket with the same settings (change bucket_id to `images`)

---

## Step 5: Set Up Database Schema

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open the file `supabase-schema.sql` from your project
4. Copy **ALL** the SQL code from that file
5. Paste it into the SQL Editor
6. Click **"Run"** (or press `Ctrl+Enter` / `Cmd+Enter`)
7. You should see a success message

### Verify Tables Were Created

1. Go to **Table Editor** (left sidebar)
2. You should see these tables:
   - ✅ `videos`
   - ✅ `case_studies`
   - ✅ `case_study_results`
   - ✅ `case_study_media`
   - ✅ `showcase_items`
   - ✅ `contact_submissions`

---

## Step 6: Test Your Setup

1. Make sure your `.env.local` file is configured correctly
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Visit [http://localhost:3000](http://localhost:3000)
4. Try accessing the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)
5. Try uploading a test video/image (if the admin panel is working)

---

## Step 7: Verify Everything Works

### Check Environment Variables

Open your browser console (F12) and check for any Supabase connection errors.

### Test Storage Upload

1. Go to `/admin` page
2. Try uploading a small test video or image
3. Check Supabase Dashboard → Storage → `videos` or `images` bucket
4. You should see your uploaded file

### Test Database Connection

You can test by checking if the tables are accessible:
- Go to Supabase Dashboard → Table Editor
- Try viewing the `videos` table
- You should see an empty table (or any test data you added)

---

## 🔒 Security Notes

### Current Setup (Development)
- Storage buckets are **public** - anyone can view files
- Database has **public read access** - anyone can read data
- Admin operations have **no authentication** - ⚠️ **NOT FOR PRODUCTION**

### Before Production
1. **Add Authentication**: Implement Supabase Auth or NextAuth.js
2. **Update RLS Policies**: Add proper authentication checks
3. **Restrict Storage**: Make buckets private and use signed URLs
4. **Review Permissions**: Only allow necessary operations

---

## 🐛 Troubleshooting

### "Invalid API key" Error
- ✅ Check that your `.env.local` file has the correct keys
- ✅ Make sure there are no extra spaces or quotes
- ✅ Restart your dev server after changing `.env.local`

### "Bucket not found" Error
- ✅ Verify bucket names are exactly `videos` and `images` (lowercase)
- ✅ Check that buckets are created in Supabase Dashboard
- ✅ Ensure buckets are set to **Public**

### "Permission denied" Error
- ✅ Check Storage Policies are set up (Step 4)
- ✅ Verify RLS policies allow the operations you need
- ✅ Check that buckets are public (for now, in development)

### Database Tables Not Showing
- ✅ Verify SQL script ran successfully
- ✅ Check Table Editor in Supabase Dashboard
- ✅ Look for any error messages in SQL Editor

### Can't Upload Files
- ✅ Check file size is under the bucket limit
- ✅ Verify MIME type is allowed (`video/*` or `image/*`)
- ✅ Check browser console for specific error messages
- ✅ Verify Storage Policies are configured

---

## 📚 Next Steps

After setup is complete:

1. **Add Sample Data**: 
   - Upload some test videos/images through the admin panel
   - Add a test case study

2. **Implement Authentication**:
   - Set up Supabase Auth or NextAuth.js
   - Protect admin routes

3. **Customize Content**:
   - Replace placeholder content
   - Add your actual portfolio items

4. **Test All Features**:
   - Contact form submissions
   - Video playback
   - Case study pages
   - Portfolio gallery

---

## 📞 Need Help?

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Supabase Discord**: [https://discord.supabase.com](https://discord.supabase.com)
- **Project Issues**: Check your project's README.md or QUICK_START.md

---

**Setup Complete!** 🎉

Your Supabase backend is now ready. You can start building and testing your application!

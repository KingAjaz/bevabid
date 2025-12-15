# Authentication Setup Guide

This guide will help you set up authentication for the admin panel using Supabase Auth.

## 📋 Overview

The admin panel now uses Supabase Authentication to protect admin routes. Users must sign in with email and password to access the admin panel.

---

## Step 1: Enable Email Authentication in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Providers** (left sidebar)
3. Find **Email** provider
4. Make sure it's **Enabled** (toggle should be ON)
5. Configure settings:
   - **Enable email confirmations**: Optional (recommended for production)
   - **Secure email change**: Recommended
   - **Double confirm email changes**: Recommended

---

## Step 2: Create an Admin User

### Option A: Using Supabase Dashboard (Easiest)

1. Go to **Authentication** → **Users** in Supabase Dashboard
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email**: Your admin email (e.g., `admin@yourdomain.com`)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Check this (so you can login immediately)
4. Click **"Create user"**

### Option B: Using SQL (Alternative)

1. Go to **SQL Editor** in Supabase Dashboard
2. Run this SQL (replace with your email and password):

```sql
-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@yourdomain.com',  -- Change this
  crypt('your_secure_password', gen_salt('bf')),  -- Change this
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  '',
  ''
);

-- Get the user ID from above, then run:
-- INSERT INTO auth.identities (id, user_id, identity_data, provider, created_at, updated_at)
-- VALUES (gen_random_uuid(), 'USER_ID_FROM_ABOVE', '{"sub":"USER_ID_FROM_ABOVE"}', 'email', NOW(), NOW());
```

**Note**: Option A is much easier and recommended!

---

## Step 3: Test the Login

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
   - You should be automatically redirected to `/admin/login`

3. Enter your admin credentials:
   - **Email**: The email you created
   - **Password**: The password you set

4. Click **"Sign In"**

5. You should be redirected to the admin panel

---

## Step 4: Update RLS Policies (Important!)

Currently, the database allows public access. You should update Row Level Security (RLS) policies to require authentication for admin operations.

### Update Admin Policies

1. Go to **SQL Editor** in Supabase Dashboard
2. Run this SQL to update policies:

```sql
-- Drop existing admin policies
DROP POLICY IF EXISTS "Admins can insert videos" ON videos;
DROP POLICY IF EXISTS "Admins can update videos" ON videos;
DROP POLICY IF EXISTS "Admins can delete videos" ON videos;

-- Create authenticated-only policies
CREATE POLICY "Authenticated users can insert videos" ON videos
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update videos" ON videos
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete videos" ON videos
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Repeat for other tables (case_studies, showcase_items, etc.)
-- Case Studies
DROP POLICY IF EXISTS "Admins can insert case_studies" ON case_studies;
DROP POLICY IF EXISTS "Admins can update case_studies" ON case_studies;
DROP POLICY IF EXISTS "Admins can delete case_studies" ON case_studies;

CREATE POLICY "Authenticated users can insert case_studies" ON case_studies
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update case_studies" ON case_studies
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete case_studies" ON case_studies
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Showcase Items
DROP POLICY IF EXISTS "Admins can insert showcase_items" ON showcase_items;
DROP POLICY IF EXISTS "Admins can update showcase_items" ON showcase_items;
DROP POLICY IF EXISTS "Admins can delete showcase_items" ON showcase_items;

CREATE POLICY "Authenticated users can insert showcase_items" ON showcase_items
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update showcase_items" ON showcase_items
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete showcase_items" ON showcase_items
  FOR DELETE 
  USING (auth.role() = 'authenticated');
```

---

## Step 5: Update Storage Policies

Update storage bucket policies to require authentication for uploads:

1. Go to **Storage** → **Policies** in Supabase Dashboard
2. For the `videos` bucket:
   - Remove or update the public INSERT policy
   - Create a new policy:
     - **Policy name**: `Authenticated users can upload videos`
     - **Allowed operation**: `INSERT`
     - **Policy definition**: `auth.role() = 'authenticated'`
     - **Target roles**: `authenticated`

3. Repeat for the `images` bucket

Or use SQL:

```sql
-- Update storage policies (run in SQL Editor)
-- Note: Storage policies are managed differently, use the Dashboard for this
```

---

## 🔒 Security Best Practices

### 1. Use Strong Passwords
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, and symbols
- Don't reuse passwords

### 2. Enable Email Confirmation (Production)
- Go to **Authentication** → **Settings**
- Enable **"Enable email confirmations"**
- Users must verify email before accessing

### 3. Limit Admin Access
- Only create admin accounts for trusted users
- Regularly review active sessions
- Monitor authentication logs

### 4. Use Environment Variables
- Never hardcode credentials
- Use `.env.local` for development
- Use secure environment variables in production

### 5. Enable Rate Limiting
- Supabase has built-in rate limiting
- Consider additional rate limiting for production

---

## 🎯 Advanced: Role-Based Access Control

If you need multiple admin roles (e.g., admin, editor, viewer), you can:

1. Add a `role` column to user metadata
2. Create a `user_roles` table
3. Update RLS policies to check roles
4. Update the `useAuth` hook to include role checking

Example:

```sql
-- Add role to user metadata
ALTER TABLE auth.users ADD COLUMN user_role TEXT DEFAULT 'viewer';

-- Update policies to check specific roles
CREATE POLICY "Admins can delete videos" ON videos
  FOR DELETE 
  USING (
    auth.role() = 'authenticated' 
    AND (auth.jwt() ->> 'user_role') = 'admin'
  );
```

---

## 🐛 Troubleshooting

### "Invalid login credentials" Error
- ✅ Check email and password are correct
- ✅ Verify user exists in Supabase Dashboard → Authentication → Users
- ✅ Check if email confirmation is required (disable for testing)

### "User not authenticated" Error
- ✅ Check that you're logged in (check browser console)
- ✅ Verify session is valid
- ✅ Try logging out and back in

### Can't Access Admin Panel
- ✅ Check that you're redirected to `/admin/login`
- ✅ Verify authentication state in browser console
- ✅ Check Supabase Dashboard → Authentication → Users for your account

### RLS Policy Errors
- ✅ Verify policies are created correctly
- ✅ Check that `auth.role() = 'authenticated'` is correct
- ✅ Test policies in Supabase Dashboard → Table Editor

---

## 📚 Next Steps

1. **Test Authentication**: Log in and out multiple times
2. **Test Protected Routes**: Try accessing `/admin` without logging in
3. **Update RLS Policies**: Secure your database operations
4. **Add Password Reset**: Implement password reset functionality (optional)
5. **Add Session Management**: Implement session timeout (optional)

---

## 📞 Need Help?

- **Supabase Auth Docs**: [https://supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth)
- **Supabase RLS Docs**: [https://supabase.com/docs/guides/auth/row-level-security](https://supabase.com/docs/guides/auth/row-level-security)
- **Project Issues**: Check your project's README.md

---

**Authentication Setup Complete!** 🔐

Your admin panel is now protected with authentication. Remember to:
- Keep admin credentials secure
- Update RLS policies for production
- Enable email confirmation for production
- Regularly review active sessions

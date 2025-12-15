# GitHub Setup Guide

Follow these steps to push your code to GitHub:

## Step 0: Configure Git (First Time Only)

Before committing, you need to tell Git who you are:

```bash
# Set your name (use your actual name or GitHub username)
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"
```

**Note**: If you want to set this only for this repository (not globally), remove `--global` from the commands above.

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `bevabid-photography` (or your preferred name)
   - **Description**: "Creative Media Agency Website"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Add and Commit Your Files

Run these commands in your terminal:

```bash
# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Bevabid photography website"
```

**Note**: If you haven't configured Git yet (Step 0), you'll need to do that first before committing.

## Step 3: Connect to GitHub and Push

After creating the repository on GitHub, you'll see a page with setup instructions. Use these commands:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/bevabid-photography.git

# Rename the default branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

If you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/bevabid-photography.git
git branch -M main
git push -u origin main
```

## Important Notes

- **Never commit `.env.local`** - This file contains your Supabase API keys and should stay local
- The `.gitignore` file is already configured to exclude sensitive files
- If you get authentication errors, you may need to:
  - Use a Personal Access Token instead of password
  - Set up SSH keys
  - Use GitHub Desktop app

## Future Updates

After making changes, use these commands:

```bash
git add .
git commit -m "Description of your changes"
git push
```

# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set Up Supabase Storage
1. Go to Storage in Supabase Dashboard
2. Create bucket: `videos` (Public)
3. Create bucket: `images` (Public)

### 4. Set Up Database
1. Go to SQL Editor in Supabase Dashboard
2. Copy and run the SQL from `supabase-schema.sql`

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
app/
  ├── page.tsx          # Home page
  ├── about/            # About page
  ├── services/         # Services page
  ├── portfolio/        # Portfolio page
  ├── case-studies/     # Case studies
  ├── contact/          # Contact page
  └── admin/            # Admin panel

components/
  ├── Navigation.tsx    # Main navigation
  ├── Footer.tsx        # Footer
  └── sections/         # Page sections

lib/
  └── supabase.ts       # Supabase client
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts`:
- Primary Black: `#000000`
- Primary White: `#ffffff`
- Primary Red: `#c1121f`

### Content
- Update dummy content in page files
- Replace placeholder images/videos
- Customize copy in all pages

### Logo
- Replace `public/logo.svg` with your logo
- Ensure it's optimized SVG

## 🔧 Common Tasks

### Add a New Page
1. Create folder in `app/`
2. Add `page.tsx`
3. Add route to `components/Navigation.tsx`

### Upload Videos
1. Go to `/admin`
2. Use upload interface
3. Videos stored in Supabase Storage

### Add Case Study
1. Go to `/admin`
2. Switch to "Case Studies" tab
3. Add new case study

## ⚠️ Important Notes

- **Admin Panel**: No authentication yet - add before production!
- **Contact Form**: Currently placeholder - integrate with Supabase or email service
- **Videos**: Placeholder URLs - replace with actual Supabase storage URLs

## 📚 Next Steps

1. Replace dummy content with real content
2. Add authentication to admin panel
3. Integrate contact form with email service
4. Upload actual videos to Supabase
5. Customize design to match brand
6. Test on mobile devices
7. Deploy to Vercel

## 🆘 Troubleshooting

### Logo not showing?
- Ensure `logo.svg` is in `public/` folder
- Check file path in `components/Navigation.tsx`

### Supabase errors?
- Verify environment variables are set
- Check Supabase project is active
- Verify storage buckets are created

### Build errors?
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Check Node.js version (18+ recommended)

---

Need help? Check the full README.md or DEPLOYMENT.md


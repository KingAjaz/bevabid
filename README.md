# Bevabid - Creative Media Agency Website

A production-ready, luxury marketing website for Bevabid, a creative media agency specializing in videography, animations, CGI, UI/UX, reel creation, and media & advertising.

## 🚀 Features

- **Cinematic Design**: Dark, luxury aesthetic with bold typography and premium visuals
- **Heavy Animations**: Framer Motion and GSAP for smooth, elegant animations
- **Full-Featured Pages**:
  - Home with animated hero, services preview, and featured showcase
  - About page with brand story and values
  - Services page with detailed service offerings
  - Portfolio with video grid and modal viewer
  - Case Studies with detailed project breakdowns
  - Contact form with luxury styling
  - Admin panel for content management
- **Supabase Integration**: Ready for video uploads and content management
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **Database & Storage**: Supabase (PostgreSQL + Storage)
- **Deployment**: Vercel (ready)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bevabid-photography
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🗄️ Supabase Setup

### Storage Buckets

Create the following storage buckets in Supabase:

1. **videos** - For video uploads
   - Public: Yes
   - Allowed MIME types: video/*

2. **images** - For image uploads
   - Public: Yes
   - Allowed MIME types: image/*

### Database Schema

See `supabase-schema.sql` for the complete database schema. Run this in your Supabase SQL editor to set up the tables.

## 📁 Project Structure

```
bevabid-photography/
├── app/
│   ├── about/              # About page
│   ├── admin/              # Admin panel
│   ├── case-studies/       # Case studies pages
│   ├── contact/            # Contact page
│   ├── portfolio/          # Portfolio page
│   ├── services/           # Services page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── sections/           # Page sections
│   ├── Footer.tsx          # Footer component
│   ├── Navigation.tsx      # Navigation component
│   └── VideoModal.tsx      # Video modal component
├── lib/
│   └── supabase.ts         # Supabase client
└── public/
    └── logo.svg            # Logo file
```

## 🎨 Design System

### Colors
- **Primary Black**: `#000000`
- **Primary White**: `#ffffff`
- **Primary Red**: `#c1121f`

### Typography
- Font: Inter (via Next.js Google Fonts)
- Large, bold headings
- Cinematic spacing

## 🚢 Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The site will be automatically deployed on every push to the main branch.

## 📝 Content Management

### Admin Panel

Access the admin panel at `/admin` (authentication not yet implemented - add before production).

Features:
- Upload videos to Supabase Storage
- Manage showcase items
- Add/edit/delete case studies

### Adding Content

1. **Videos**: Upload through admin panel or directly to Supabase Storage
2. **Case Studies**: Add through admin panel or Supabase dashboard
3. **Portfolio Items**: Manage through admin panel

## 🔒 Security Notes

⚠️ **Important**: Before deploying to production:

1. Implement authentication for the admin panel
2. Set up proper CORS policies
3. Configure Supabase Row Level Security (RLS)
4. Add rate limiting for contact form
5. Set up proper error handling and logging

## 📄 License

All rights reserved. This project is proprietary.

## 🤝 Support

For questions or support, contact the development team.

---

Built with ❤️ for Bevabid


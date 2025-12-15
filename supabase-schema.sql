-- Bevabid Database Schema
-- Run this in your Supabase SQL Editor

-- Videos table for portfolio/showcase
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0
);

-- Case studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  category TEXT NOT NULL,
  year INTEGER,
  overview TEXT,
  problem TEXT,
  solution TEXT,
  outcome TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE
);

-- Case study results/metrics
CREATE TABLE IF NOT EXISTS case_study_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
  metric TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Case study videos/media
CREATE TABLE IF NOT EXISTS case_study_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL, -- 'video' or 'image'
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Showcase items (featured content)
CREATE TABLE IF NOT EXISTS showcase_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  item_type TEXT NOT NULL, -- 'video' or 'image'
  media_url TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_videos_featured ON videos(featured);
CREATE INDEX IF NOT EXISTS idx_case_studies_category ON case_studies(category);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(featured);
CREATE INDEX IF NOT EXISTS idx_showcase_featured ON showcase_items(featured);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE showcase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access policies (adjust based on your needs)
CREATE POLICY "Public videos are viewable by everyone" ON videos
  FOR SELECT USING (true);

CREATE POLICY "Public case studies are viewable by everyone" ON case_studies
  FOR SELECT USING (true);

CREATE POLICY "Public showcase items are viewable by everyone" ON showcase_items
  FOR SELECT USING (true);

-- Admin policies (adjust based on your authentication setup)
-- These are placeholder policies - implement proper authentication
CREATE POLICY "Admins can insert videos" ON videos
  FOR INSERT WITH CHECK (true); -- Replace with proper auth check

CREATE POLICY "Admins can update videos" ON videos
  FOR UPDATE USING (true); -- Replace with proper auth check

CREATE POLICY "Admins can delete videos" ON videos
  FOR DELETE USING (true); -- Replace with proper auth check

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_showcase_items_updated_at BEFORE UPDATE ON showcase_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


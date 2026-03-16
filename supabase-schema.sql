-- Supabase Schema for AI Automation Landing Page
-- Run this in your Supabase SQL Editor

-- Waitlist signups
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  interest TEXT, -- 'ai-automation', 'saas-development', 'both'
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Availability slots (admin sets these)
CREATE TABLE IF NOT EXISTS availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discovery call bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  availability_id UUID REFERENCES availability(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  project_description TEXT,
  budget_range TEXT, -- 'under-5k', '5k-15k', '15k-50k', '50k-plus'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_availability_date ON availability(date);
CREATE INDEX IF NOT EXISTS idx_availability_available ON availability(date, is_booked) WHERE is_booked = FALSE;
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for waitlist and bookings
CREATE POLICY "Allow anonymous waitlist signups" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous booking creation" ON bookings FOR INSERT WITH CHECK (true);

-- Allow anonymous reads on availability (so users can see open slots)
CREATE POLICY "Allow anonymous availability reads" ON availability FOR SELECT USING (true);

-- Allow service role full access (for admin API routes using service key)
-- Note: Use SUPABASE_SERVICE_ROLE_KEY in admin API routes for full access

-- Page view tracking (lightweight, privacy-friendly analytics)
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  device_type TEXT, -- 'desktop', 'mobile', 'tablet'
  browser TEXT,
  country TEXT,
  screen_width INTEGER,
  session_id TEXT, -- random per-session ID, not tied to identity
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous page view inserts" ON page_views FOR INSERT WITH CHECK (true);

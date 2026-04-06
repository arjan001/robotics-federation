-- ============================================================
-- Database Schema for Robotics Competition Platform
-- Generated from existing application data models
-- Compatible with: PostgreSQL / Supabase
-- ============================================================

-- Enable UUID extension (Supabase has this by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- REGISTRATION TABLES
-- ============================================================

-- Partner/Sponsor Registrations
CREATE TABLE partner_registrations (
    id TEXT PRIMARY KEY,
    organization_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    partnership_type TEXT NOT NULL CHECK (partnership_type IN ('sponsor', 'technology', 'educational', 'media', 'venue', 'mentorship', 'other')),
    website TEXT,
    contribution TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in-progress', 'confirmed', 'declined')),
    follow_up_date DATE,
    follow_up_notes TEXT,
    registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Team Registrations
CREATE TABLE team_registrations (
    id TEXT PRIMARY KEY,
    school_name TEXT NOT NULL,
    city TEXT NOT NULL,
    county TEXT,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    team_name TEXT NOT NULL,
    member_count INTEGER NOT NULL DEFAULT 1,
    age_range TEXT,
    experience TEXT,
    competition_track TEXT NOT NULL CHECK (competition_track IN ('explore', 'innovators', 'challengers')),
    has_equipment TEXT DEFAULT 'no' CHECK (has_equipment IN ('yes', 'partial', 'no')),
    coach_name TEXT,
    coach_email TEXT,
    notes TEXT,
    event_id TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'approved', 'waitlisted', 'declined')),
    follow_up_date DATE,
    follow_up_notes TEXT,
    registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CONTENT MODULE TABLES
-- ============================================================

-- Home Page Content
CREATE TABLE home_content (
    id TEXT PRIMARY KEY,
    hero_title TEXT,
    hero_subtitle TEXT,
    primary_cta_label TEXT,
    primary_cta_href TEXT,
    secondary_cta_label TEXT,
    secondary_cta_href TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Register Page Content
CREATE TABLE register_content (
    id TEXT PRIMARY KEY,
    title TEXT,
    subtitle TEXT,
    team_title TEXT,
    team_description TEXT,
    partner_title TEXT,
    partner_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events / Competition Seasons
CREATE TABLE events (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    date DATE,
    location TEXT,
    status TEXT DEFAULT 'upcoming' CHECK (status IN ('past', 'current', 'upcoming')),
    description TEXT,
    teams_participated INTEGER,
    highlights TEXT[], -- PostgreSQL array of strings
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Event Winners (child table of events)
CREATE TABLE event_winners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    team TEXT NOT NULL,
    school TEXT,
    award TEXT,
    track TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Competition Tracks / Challenges
CREATE TABLE competition_tracks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT,
    age_range TEXT,
    description TEXT,
    color TEXT, -- hex color code
    icon TEXT,  -- emoji or icon identifier
    missions TEXT[], -- PostgreSQL array of strings
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Competition Track Rubrics (child table of competition_tracks)
CREATE TABLE track_rubrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    track_id TEXT NOT NULL REFERENCES competition_tracks(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    max_points INTEGER NOT NULL DEFAULT 0,
    criteria TEXT[], -- PostgreSQL array of strings
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- About Page Content
CREATE TABLE about_content (
    id TEXT PRIMARY KEY,
    title TEXT,
    subtitle TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FAQs
CREATE TABLE faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Case Studies
CREATE TABLE case_studies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    summary TEXT,
    challenge TEXT,
    solution TEXT,
    outcomes TEXT[], -- PostgreSQL array of strings
    accent TEXT, -- hex color code
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partners
CREATE TABLE partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('sponsor', 'technology', 'educational', 'media')),
    description TEXT,
    contribution TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Organizers / Team Members
CREATE TABLE organizers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Schools
CREATE TABLE schools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT,
    since TEXT, -- year joined as partner
    teams INTEGER DEFAULT 0,
    achievements TEXT[], -- PostgreSQL array of strings
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ecosystem Stats
CREATE TABLE ecosystem_stats (
    id TEXT PRIMARY KEY,
    schools_reached INTEGER DEFAULT 0,
    students_reached INTEGER DEFAULT 0,
    satisfaction_rate NUMERIC(5, 2) DEFAULT 0,
    robots_built INTEGER DEFAULT 0,
    awards_won INTEGER DEFAULT 0,
    students_impacted INTEGER DEFAULT 0,
    volunteers_engaged INTEGER DEFAULT 0,
    cities_reached INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Footer Content
CREATE TABLE footer_content (
    id TEXT PRIMARY KEY,
    tagline TEXT,
    copyright TEXT,
    email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ADMIN & AUTH TABLES
-- ============================================================

-- Users (Admin accounts)
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'Viewer' CHECK (role IN ('Super Admin', 'Editor', 'Viewer')),
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Permissions (Role-based access control)
CREATE TABLE permissions (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    scope TEXT NOT NULL CHECK (scope IN ('all', 'content', 'users')),
    actions TEXT[] NOT NULL, -- e.g. {'view', 'create', 'edit', 'delete', 'publish'}
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories (Challenge taxonomy)
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    track TEXT,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Site Settings
CREATE TABLE settings (
    id TEXT PRIMARY KEY,
    site_name TEXT,
    organization_name TEXT,
    site_tagline TEXT,
    contact_email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

-- Registration lookups
CREATE INDEX idx_partner_reg_email ON partner_registrations(email);
CREATE INDEX idx_partner_reg_status ON partner_registrations(status);
CREATE INDEX idx_partner_reg_type ON partner_registrations(partnership_type);
CREATE INDEX idx_team_reg_email ON team_registrations(email);
CREATE INDEX idx_team_reg_status ON team_registrations(status);
CREATE INDEX idx_team_reg_track ON team_registrations(competition_track);
CREATE INDEX idx_team_reg_event ON team_registrations(event_id);
CREATE INDEX idx_team_reg_school ON team_registrations(school_name);

-- Content lookups
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_partners_type ON partners(type);
CREATE INDEX idx_schools_city ON schools(city);
CREATE INDEX idx_categories_track ON categories(track);
CREATE INDEX idx_categories_status ON categories(status);

-- Admin lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_permissions_role ON permissions(role);

-- ============================================================
-- TRIGGERS: Auto-update updated_at timestamp
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply auto-update trigger to all tables with updated_at
DO $$
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT unnest(ARRAY[
            'partner_registrations', 'team_registrations',
            'home_content', 'register_content', 'events',
            'competition_tracks', 'about_content', 'faqs',
            'case_studies', 'partners', 'organizers', 'schools',
            'ecosystem_stats', 'footer_content',
            'users', 'permissions', 'categories', 'settings'
        ])
    LOOP
        EXECUTE format(
            'CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()',
            t
        );
    END LOOP;
END;
$$;

-- ============================================================
-- ROW LEVEL SECURITY (for Supabase)
-- Uncomment these if using Supabase Auth
-- ============================================================

-- ALTER TABLE partner_registrations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE team_registrations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Example policy: Allow authenticated users to read registrations
-- CREATE POLICY "Allow authenticated read" ON partner_registrations
--     FOR SELECT TO authenticated USING (true);

-- Example policy: Allow admins full access
-- CREATE POLICY "Allow admin full access" ON partner_registrations
--     FOR ALL TO authenticated
--     USING (auth.jwt() ->> 'role' = 'Super Admin');

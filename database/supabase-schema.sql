-- ============================================================
-- SUPABASE DATABASE SCHEMA
-- Inspire Robotics Challenge Platform
-- ============================================================
-- Run this SQL in the Supabase SQL Editor to create all tables.
-- This schema maps 1:1 to the application's module-based architecture.
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- UTILITY: Auto-update updated_at trigger function
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 1. REGISTRATION TABLES
-- ============================================================

-- 1a. Partner/Sponsor Registrations
CREATE TABLE partner_registrations (
    id TEXT PRIMARY KEY,
    organization_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    partnership_type TEXT NOT NULL CHECK (partnership_type IN ('sponsor', 'technology', 'educational', 'media', 'venue', 'mentorship', 'other')),
    website TEXT DEFAULT '',
    contribution TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in-progress', 'confirmed', 'declined')),
    follow_up_date TEXT DEFAULT '',
    follow_up_notes TEXT DEFAULT '',
    registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_partner_registrations
    BEFORE UPDATE ON partner_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1b. Team Registrations
CREATE TABLE team_registrations (
    id TEXT PRIMARY KEY,
    school_name TEXT NOT NULL,
    city TEXT NOT NULL,
    county TEXT DEFAULT '',
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    team_name TEXT NOT NULL,
    member_count INTEGER NOT NULL DEFAULT 1,
    age_range TEXT DEFAULT '',
    experience TEXT DEFAULT '',
    competition_track TEXT NOT NULL CHECK (competition_track IN ('explore', 'innovators', 'challengers')),
    has_equipment TEXT DEFAULT 'no' CHECK (has_equipment IN ('yes', 'partial', 'no')),
    coach_name TEXT DEFAULT '',
    coach_email TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    event_id TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'approved', 'waitlisted', 'declined')),
    follow_up_date TEXT DEFAULT '',
    follow_up_notes TEXT DEFAULT '',
    registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_team_registrations
    BEFORE UPDATE ON team_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 2. CONTENT MODULE TABLES
-- Each table maps to a content module in the admin dashboard.
-- ============================================================

-- 2a. Home Page Content (module: 'home')
CREATE TABLE home_content (
    id TEXT PRIMARY KEY,
    hero_title TEXT DEFAULT '',
    hero_subtitle TEXT DEFAULT '',
    primary_cta_label TEXT DEFAULT '',
    primary_cta_href TEXT DEFAULT '',
    secondary_cta_label TEXT DEFAULT '',
    secondary_cta_href TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_home_content
    BEFORE UPDATE ON home_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2b. Register Page Content (module: 'register')
CREATE TABLE register_content (
    id TEXT PRIMARY KEY,
    title TEXT DEFAULT '',
    subtitle TEXT DEFAULT '',
    team_title TEXT DEFAULT '',
    team_description TEXT DEFAULT '',
    partner_title TEXT DEFAULT '',
    partner_description TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_register_content
    BEFORE UPDATE ON register_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2c. Events (module: 'events')
CREATE TABLE events (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    date TEXT DEFAULT '',
    location TEXT DEFAULT '',
    status TEXT DEFAULT 'upcoming' CHECK (status IN ('past', 'current', 'upcoming')),
    description TEXT DEFAULT '',
    teams_participated INTEGER DEFAULT 0,
    highlights TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_events
    BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2d. Event Winners (child of events)
CREATE TABLE event_winners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    team TEXT NOT NULL,
    school TEXT DEFAULT '',
    award TEXT DEFAULT '',
    track TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2e. Competition Tracks (module: 'challenges')
CREATE TABLE competition_tracks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT DEFAULT '',
    age_range TEXT DEFAULT '',
    description TEXT DEFAULT '',
    color TEXT DEFAULT '',
    icon TEXT DEFAULT '',
    missions TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_competition_tracks
    BEFORE UPDATE ON competition_tracks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2f. Competition Track Rubrics (child of competition_tracks)
CREATE TABLE track_rubrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    track_id TEXT NOT NULL REFERENCES competition_tracks(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    max_points INTEGER NOT NULL DEFAULT 0,
    criteria TEXT[] DEFAULT '{}',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2g. About Page Content (module: 'about-content')
CREATE TABLE about_content (
    id TEXT PRIMARY KEY,
    title TEXT DEFAULT '',
    subtitle TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_about_content
    BEFORE UPDATE ON about_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2h. FAQs (module: 'about-faqs')
CREATE TABLE faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_faqs
    BEFORE UPDATE ON faqs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2i. Case Studies (module: 'case-studies')
CREATE TABLE case_studies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT DEFAULT '',
    summary TEXT DEFAULT '',
    challenge TEXT DEFAULT '',
    solution TEXT DEFAULT '',
    outcomes TEXT[] DEFAULT '{}',
    accent TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_case_studies
    BEFORE UPDATE ON case_studies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2j. Partners (module: 'partners')
CREATE TABLE partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT DEFAULT '' CHECK (type IN ('sponsor', 'technology', 'educational', 'media', '')),
    description TEXT DEFAULT '',
    contribution TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_partners
    BEFORE UPDATE ON partners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2k. Organizers / Core Team (module: 'organizers')
CREATE TABLE organizers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT DEFAULT '',
    bio TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_organizers
    BEFORE UPDATE ON organizers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2l. Schools (module: 'schools')
CREATE TABLE schools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT DEFAULT '',
    since TEXT DEFAULT '',
    teams INTEGER DEFAULT 0,
    achievements TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_schools
    BEFORE UPDATE ON schools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2m. Ecosystem Stats (module: 'ecosystem' — stats record)
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

CREATE TRIGGER set_updated_at_ecosystem_stats
    BEFORE UPDATE ON ecosystem_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2n. Footer Content (module: 'footer')
CREATE TABLE footer_content (
    id TEXT PRIMARY KEY,
    tagline TEXT DEFAULT '',
    copyright TEXT DEFAULT '',
    email TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    phone2 TEXT DEFAULT '',
    address TEXT DEFAULT '',
    hours_weekday TEXT DEFAULT '',
    hours_saturday TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_footer_content
    BEFORE UPDATE ON footer_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 3. ADMIN & AUTH TABLES
-- ============================================================

-- 3a. Admin Users (module: 'users')
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'Viewer' CHECK (role IN ('Super Admin', 'Editor', 'Viewer')),
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_users
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3b. Role Permissions (module: 'permissions')
CREATE TABLE permissions (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    scope TEXT NOT NULL CHECK (scope IN ('all', 'content', 'users')),
    actions TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_permissions
    BEFORE UPDATE ON permissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3c. Challenge Categories (module: 'categories')
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    track TEXT DEFAULT '',
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_categories
    BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3d. Site Settings (module: 'settings')
CREATE TABLE settings (
    id TEXT PRIMARY KEY,
    site_name TEXT DEFAULT '',
    organization_name TEXT DEFAULT '',
    site_tagline TEXT DEFAULT '',
    contact_email TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_settings
    BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 4. INDEXES
-- ============================================================

-- Registration indexes
CREATE INDEX idx_partner_reg_email ON partner_registrations(email);
CREATE INDEX idx_partner_reg_status ON partner_registrations(status);
CREATE INDEX idx_partner_reg_type ON partner_registrations(partnership_type);
CREATE INDEX idx_partner_reg_date ON partner_registrations(registered_at DESC);

CREATE INDEX idx_team_reg_email ON team_registrations(email);
CREATE INDEX idx_team_reg_status ON team_registrations(status);
CREATE INDEX idx_team_reg_track ON team_registrations(competition_track);
CREATE INDEX idx_team_reg_event ON team_registrations(event_id);
CREATE INDEX idx_team_reg_school ON team_registrations(school_name);
CREATE INDEX idx_team_reg_date ON team_registrations(registered_at DESC);

-- Content indexes
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_event_winners_event ON event_winners(event_id);
CREATE INDEX idx_track_rubrics_track ON track_rubrics(track_id);
CREATE INDEX idx_partners_type ON partners(type);
CREATE INDEX idx_schools_city ON schools(city);
CREATE INDEX idx_categories_track ON categories(track);
CREATE INDEX idx_categories_status ON categories(status);

-- Admin indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_permissions_role ON permissions(role);

-- ============================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- Enable for all tables, then add policies.
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE partner_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE register_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_winners ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE track_rubrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables (anyone can view the website)
CREATE POLICY "Public read: home_content" ON home_content FOR SELECT USING (true);
CREATE POLICY "Public read: register_content" ON register_content FOR SELECT USING (true);
CREATE POLICY "Public read: events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read: event_winners" ON event_winners FOR SELECT USING (true);
CREATE POLICY "Public read: competition_tracks" ON competition_tracks FOR SELECT USING (true);
CREATE POLICY "Public read: track_rubrics" ON track_rubrics FOR SELECT USING (true);
CREATE POLICY "Public read: about_content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Public read: faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public read: case_studies" ON case_studies FOR SELECT USING (true);
CREATE POLICY "Public read: partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Public read: organizers" ON organizers FOR SELECT USING (true);
CREATE POLICY "Public read: schools" ON schools FOR SELECT USING (true);
CREATE POLICY "Public read: ecosystem_stats" ON ecosystem_stats FOR SELECT USING (true);
CREATE POLICY "Public read: footer_content" ON footer_content FOR SELECT USING (true);
CREATE POLICY "Public read: categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read: settings" ON settings FOR SELECT USING (true);

-- Public insert for registrations (visitors can register)
CREATE POLICY "Public insert: partner_registrations" ON partner_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert: team_registrations" ON team_registrations FOR INSERT WITH CHECK (true);

-- Authenticated full access for admin operations (use with Supabase Auth or service role key)
CREATE POLICY "Admin full access: partner_registrations" ON partner_registrations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: team_registrations" ON team_registrations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: home_content" ON home_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: register_content" ON register_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: events" ON events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: event_winners" ON event_winners FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: competition_tracks" ON competition_tracks FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: track_rubrics" ON track_rubrics FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: about_content" ON about_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: faqs" ON faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: case_studies" ON case_studies FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: partners" ON partners FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: organizers" ON organizers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: schools" ON schools FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: ecosystem_stats" ON ecosystem_stats FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: footer_content" ON footer_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: users" ON users FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: permissions" ON permissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: categories" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access: settings" ON settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- 6. VIEWS (for common queries)
-- ============================================================

-- Events with winner count
CREATE OR REPLACE VIEW events_summary AS
SELECT
    e.*,
    COALESCE(w.winner_count, 0) AS winner_count
FROM events e
LEFT JOIN (
    SELECT event_id, COUNT(*) AS winner_count
    FROM event_winners
    GROUP BY event_id
) w ON w.event_id = e.id
ORDER BY e.date DESC;

-- Competition tracks with rubric totals
CREATE OR REPLACE VIEW tracks_with_scoring AS
SELECT
    ct.*,
    COALESCE(r.total_points, 0) AS total_points,
    COALESCE(r.rubric_count, 0) AS rubric_categories
FROM competition_tracks ct
LEFT JOIN (
    SELECT track_id, SUM(max_points) AS total_points, COUNT(*) AS rubric_count
    FROM track_rubrics
    GROUP BY track_id
) r ON r.track_id = ct.id;

-- Registration stats dashboard
CREATE OR REPLACE VIEW registration_stats AS
SELECT
    'partner' AS type,
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE status = 'new') AS new_count,
    COUNT(*) FILTER (WHERE status = 'contacted') AS contacted_count,
    COUNT(*) FILTER (WHERE status = 'in-progress') AS in_progress_count,
    COUNT(*) FILTER (WHERE status = 'confirmed') AS confirmed_count,
    COUNT(*) FILTER (WHERE status = 'declined') AS declined_count
FROM partner_registrations
UNION ALL
SELECT
    'team' AS type,
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE status = 'new') AS new_count,
    COUNT(*) FILTER (WHERE status = 'reviewed') AS contacted_count,
    COUNT(*) FILTER (WHERE status = 'approved') AS in_progress_count,
    COUNT(*) FILTER (WHERE status = 'waitlisted') AS confirmed_count,
    COUNT(*) FILTER (WHERE status = 'declined') AS declined_count
FROM team_registrations;

-- ============================================================
-- 7. SEED DATA — Default content matching app defaults
-- ============================================================

-- 7a. Home Content
INSERT INTO home_content (id, hero_title, hero_subtitle, primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href)
VALUES (
    'home-main',
    'Inspire Robotics Challenge',
    E'East Africa''s premier robotics and AI competition hub. Empowering young minds to build, innovate, and shape the future through technology.',
    'Register Your Team',
    '/register',
    'Explore Challenges',
    '/challenges'
);

-- 7b. Register Content
INSERT INTO register_content (id, title, subtitle, team_title, team_description, partner_title, partner_description)
VALUES (
    'register-main',
    'Registration Hub',
    'Register your team for the competition or express interest as a partner.',
    'Team Registration',
    'Register your school team for the next season of the Inspire Robotics Challenge.',
    'Partner Interest',
    'Interested in sponsoring or partnering with the Inspire Robotics Challenge?'
);

-- 7c. About Content
INSERT INTO about_content (id, title, subtitle)
VALUES (
    'about-main',
    'Built for future innovators. Designed for measurable impact.',
    'Stemtrix EA runs a competition-first learning ecosystem where students build real robotics skills, mentors shape team growth, and schools gain a structured path to future-ready STEM outcomes.'
);

-- 7d. FAQs
INSERT INTO faqs (id, question, answer, sort_order) VALUES
('faq-join', 'How do students join Inspire Robotics programs?', 'Schools and independent teams register by track, complete onboarding, and receive challenge guides, calendars, and mentor matching before build sessions begin.', 1),
('faq-experience', 'Do participants need prior robotics experience?', 'No. Tracks are age-appropriate and skill-staged. Students can start from basic exploration and progress into advanced strategy, automation, and programming challenges.', 2),
('faq-outcomes', 'What outcomes are tracked across a season?', 'Programs track technical capability, teamwork, documentation quality, challenge completion, and presentation readiness so schools can measure growth beyond final scores.', 3),
('faq-partners', 'How can schools or partners collaborate with Stemtrix EA?', 'Partners can support kits, mentoring, workshops, venue access, and scholarships. Schools can host qualifiers, open labs, and join multi-city season rollouts.', 4);

-- 7e. Events
INSERT INTO events (id, name, date, location, status, description, teams_participated, highlights) VALUES
('season-1-kickoff', 'Season 1 Kickoff – Inspire Robotics Challenge', '2024-01-20', 'Nairobi, Kenya', 'past', 'The inaugural season kickoff brought together 24 teams from across Nairobi for the first-ever Inspire Robotics Challenge. Students were introduced to the competition framework, received starter kits, and began their engineering journey.', 24, ARRAY['First-ever Inspire Robotics Challenge event', '24 teams from 12 schools participated', 'Starter kits distributed to all teams', 'Mentorship program launched']),
('season-1-regional', 'Season 1 Regional Qualifier', '2024-04-13', 'Nairobi, Kenya', 'past', 'Regional qualifiers saw teams compete across all three tracks. The Explore track featured creative robot showcases, Innovators tackled agricultural automation, and Challengers competed in alliance-based matches.', 20, ARRAY['First competitive matches in Inspire history', 'Live-streamed to over 500 viewers', 'Guest judges from local tech industry']),
('season-1-championship', 'Season 1 National Championship', '2024-07-06', 'Nairobi, Kenya', 'past', E'The Season 1 National Championship was a landmark event for STEM education in Kenya. Top qualifying teams competed for national titles, with the event attracting significant media attention and industry partnerships.', 16, ARRAY['Over 1,000 attendees', 'Partnership with Kenya Ministry of Education announced', 'Media coverage from national outlets', 'Scholarship prizes awarded to top performers']),
('season-2-kickoff', 'Season 2 Kickoff – "Building Tomorrow"', '2025-01-18', 'Nairobi, Kenya', 'past', E'Season 2 launched with the theme "Building Tomorrow," expanding to include teams from regional cities. New challenge missions focused on sustainable development and smart city solutions.', 36, ARRAY['Expanded to 36 teams from 18 schools', 'Teams from Molo and other regions joined', 'New sustainable development challenge theme', 'Advanced robotics kits introduced for Challengers']),
('season-2-regional', 'Season 2 Regional Qualifiers', '2025-04-26', 'Multiple venues across Kenya', 'current', E'The current season''s regional qualifiers are underway, with events hosted in Nairobi and regional venues. Teams are competing for spots in the upcoming National Championship.', 32, ARRAY['First multi-city simultaneous qualifier events', 'Live scoring dashboard available online', 'Expanded volunteer mentor network']),
('season-2-championship', 'Season 2 National Championship', '2025-07-12', 'Nairobi, Kenya', 'upcoming', 'The Season 2 National Championship will bring together the top teams from across Kenya for the biggest Inspire Robotics Challenge event yet. New awards categories and expanded scholarship prizes.', 0, ARRAY['Expected 2,000+ attendees', 'International observer teams invited', 'New "Community Impact" award category', 'Live broadcast partnership']),
('season-3-kickoff', 'Season 3 Kickoff', '2026-01-17', 'TBA – Multiple cities across Kenya', 'upcoming', 'Season 3 will expand the Inspire Robotics Challenge to additional regions across Kenya, with plans to reach more schools and communities nationwide.', 0, ARRAY['Nationwide expansion planned', 'New AI & Machine Learning challenge track', 'Industry partnership program launch']);

-- 7f. Event Winners
INSERT INTO event_winners (event_id, team, school, award, track) VALUES
('season-1-regional', 'RoboLions', 'Brookhouse School', 'Champion – Explore', 'Explore'),
('season-1-regional', 'TechTitans', 'Aga Khan Schools', 'Champion – Innovators', 'Innovators'),
('season-1-regional', 'CircuitBreakers', 'International School of Kenya', 'Champion – Challengers', 'Challengers'),
('season-1-championship', 'RoboLions', 'Brookhouse School', 'National Champion – Explore', 'Explore'),
('season-1-championship', 'InnoMinds', 'Braeburn Schools', 'National Champion – Innovators', 'Innovators'),
('season-1-championship', 'AlphaBot', 'Premier Academy', 'National Champion – Challengers', 'Challengers'),
('season-1-championship', 'TechTitans', 'Aga Khan Schools', 'Innovation Award', 'Innovators'),
('season-1-championship', 'GearHeads', 'International School of Kenya', E'Judges'' Award', 'Challengers');

-- 7g. Competition Tracks
INSERT INTO competition_tracks (id, name, tagline, age_range, description, color, icon, missions) VALUES
('explore', 'Explore', 'Discover the World of Robotics', 'Ages 6–10', 'The Explore track introduces young learners to the fundamentals of robotics and programming through hands-on building and creative play. Teams work together to build simple machines and tell stories through their robot models.', '#c24b3b', '🔍', ARRAY['Build a robot that can navigate a simple maze', 'Create a model that demonstrates a real-world machine', 'Design a robot helper for your school or community', 'Program a robot to perform a choreographed dance']),
('innovators', 'Innovators', 'Engineer Solutions That Matter', 'Ages 11–14', 'The Innovators track challenges students to identify real-world problems and engineer robotic solutions. Teams research, design, build, and program autonomous robots while developing core STEM skills and presenting their innovations.', '#a33830', '💡', ARRAY['Design an autonomous robot for agricultural assistance', 'Build a sorting robot for waste management', 'Create a robot that assists people with disabilities', 'Engineer a search-and-rescue robot prototype']),
('challengers', 'Challengers', 'Push the Boundaries of Innovation', 'Ages 15–18', 'The Challengers track is the pinnacle of the Inspire Robotics Challenge. High school teams design, build, and program advanced robots to compete in strategic alliance-based matches while demonstrating leadership, entrepreneurship, and engineering excellence.', '#8b2e26', '🏆', ARRAY['Build a robot capable of autonomous and driver-controlled operations', 'Complete strategic game objectives in alliance matches', 'Design and implement computer vision for object detection', 'Develop a business plan and secure team sponsorships']);

-- 7h. Track Rubrics
-- Explore rubrics
INSERT INTO track_rubrics (track_id, name, max_points, criteria, sort_order) VALUES
('explore', 'Robot Design', 25, ARRAY['Structural integrity and durability', 'Creative use of building materials', 'Functional moving parts'], 1),
('explore', 'Programming', 25, ARRAY['Basic movement commands', 'Use of sensors', 'Sequential logic'], 2),
('explore', 'Teamwork', 25, ARRAY['Equal participation from all members', 'Communication and collaboration', 'Presentation skills'], 3),
('explore', 'Innovation', 25, ARRAY['Original problem-solving approach', 'Creative thinking', 'Connection to real-world applications'], 4);

-- Innovators rubrics
INSERT INTO track_rubrics (track_id, name, max_points, criteria, sort_order) VALUES
('innovators', 'Robot Performance', 30, ARRAY['Completion of mission objectives', 'Consistency and reliability', 'Speed and efficiency', 'Autonomous navigation'], 1),
('innovators', 'Engineering Design', 25, ARRAY['Mechanical design and build quality', 'Sensor integration', 'Iterative design process documented'], 2),
('innovators', 'Innovation Project', 25, ARRAY['Problem identification and research', 'Solution creativity and feasibility', 'Community impact potential'], 3),
('innovators', 'Core Values', 20, ARRAY['Gracious professionalism', 'Team collaboration', 'Mentorship and outreach'], 4);

-- Challengers rubrics
INSERT INTO track_rubrics (track_id, name, max_points, criteria, sort_order) VALUES
('challengers', 'Robot Performance', 35, ARRAY['Match performance and consistency', 'Autonomous period scoring', 'Driver-controlled precision', 'Strategic alliance play'], 1),
('challengers', 'Engineering Excellence', 25, ARRAY['CAD design and documentation', 'Advanced programming techniques', 'Custom fabrication quality', 'Testing and iteration evidence'], 2),
('challengers', 'Innovation & Entrepreneurship', 20, ARRAY['Business plan and sustainability', 'Community outreach impact', 'Technical documentation'], 3),
('challengers', 'Judges Interview', 20, ARRAY['Technical knowledge depth', 'Team organization and roles', 'Future vision and goals'], 4);

-- 7i. Case Studies
INSERT INTO case_studies (id, title, category, summary, challenge, solution, outcomes, accent) VALUES
('adaptive-math-labs', 'Adaptive Math Labs', 'K-12 Learning Systems', 'A district-wide intervention that used AI-driven lesson sequencing to improve confidence and completion in foundational mathematics.', 'Schools had fragmented math performance data and no consistent way to personalize instruction at classroom scale.', 'Built a unified tutoring workflow with real-time skill diagnostics, weekly intervention sprints, and teacher coaching dashboards.', ARRAY['31% improvement in assignment completion across pilot schools', 'Average remediation cycle reduced from 5 weeks to 12 days', 'Teacher planning time reduced by 6.5 hours per week'], '#c24b3b'),
('robotics-bootcamp-network', 'Robotics Bootcamp Network', 'Hands-On STEM Programs', 'A multi-school robotics curriculum that paired low-cost hardware kits with challenge-based coding missions.', 'Schools needed a practical robotics program that could run with limited lab equipment and mixed instructor experience.', 'Designed modular bootcamp tracks, reusable challenge stations, and a mentor toolkit with rubric-based progression.', ARRAY['5-city deployment with 42 schools in one season', 'Student retention in STEM clubs increased to 88%', 'Mentor onboarding time reduced by 40%'], '#de6d5f'),
('virtual-lab-classroom', 'Virtual Lab Classroom', 'AI + Hybrid Instruction', 'A blended learning environment combining simulation labs, AI guidance, and live teacher checkpoints.', 'Remote learners lacked practical experimentation opportunities and often disengaged during theory-heavy sessions.', 'Launched browser-based simulations linked to milestone prompts and automated feedback loops before live review.', ARRAY['Course completion rose from 62% to 84%', 'Average lab attempt success improved by 27%', 'Reduced student support tickets by 35%'], '#f28f82'),
('teacher-ai-copilot', 'Teacher AI Copilot', 'Classroom Enablement', 'An educator copilot that generated lesson variations, formative quizzes, and intervention suggestions from class performance.', 'Instructors spent significant time rewriting lesson plans for mixed-ability classrooms and tracking gaps manually.', 'Implemented a planning assistant with standards-aligned templates, auto-generated checkpoints, and insight reports.', ARRAY['Lesson preparation time reduced by 52%', 'Weekly formative assessment participation increased by 33%', 'Improved pass rates in target modules by 19%'], '#c24b3b'),
('inclusive-stem-pathways', 'Inclusive STEM Pathways', 'Equity-Focused Access', 'A community-centered program expanding robotics and coding pathways for underrepresented student groups.', 'Participation gaps remained high in girls and rural cohorts despite baseline STEM initiatives.', 'Co-created local outreach cohorts, peer-led showcase events, and scholarship-triggered progression milestones.', ARRAY['Female participation in robotics cohorts increased by 2.1x', 'Rural school participation expanded from 6 to 19 campuses', 'Scholarship conversions grew by 46% year over year'], '#de6d5f');

-- 7j. Partners
INSERT INTO partners (id, name, type, description, contribution) VALUES
('stemtrix', 'Stemtrix EA', 'educational', E'The founding organization behind the Inspire Robotics Challenge, dedicated to advancing STEM education across East Africa.', 'Primary organizer, curriculum development, and program management'),
('safaricom-foundation', 'Safaricom Foundation', 'sponsor', E'Corporate social responsibility arm supporting STEM education initiatives across Kenya and East Africa.', 'Financial sponsorship, connectivity solutions, and scholarship funding'),
('kenya-robotics', 'Kenya Robotics Society', 'technology', 'Leading robotics community in Kenya providing competition kits, spare parts, and technical training for teams.', 'Robotics kits, spare parts supply, and technical workshops'),
('ministry-education', 'Ministry of Education – Kenya', 'educational', 'Government partner supporting the integration of robotics education into the national curriculum framework.', 'Policy support, school outreach, and official endorsement'),
('nation-media', 'Nation Media Group', 'media', 'Leading media partner providing coverage, live streaming, and public awareness for competition events across Kenya.', 'Event coverage, live streaming, and promotional campaigns'),
('ieee-kenya', 'IEEE Kenya Section', 'educational', 'Professional engineering society providing volunteer judges, mentors, and technical standards guidance.', 'Volunteer judges, mentorship network, and engineering standards'),
('equity-foundation', 'Equity Foundation', 'sponsor', 'Supporting access to STEM education for students from underserved communities through scholarships and sponsorships.', 'Student scholarships, team sponsorships, and financial literacy workshops'),
('global-stem-alliance', 'Global STEM Alliance', 'sponsor', 'International non-profit supporting STEM competitions worldwide with resources and global networking.', 'International competition pathway, curriculum resources, and global networking');

-- 7k. Organizers
INSERT INTO organizers (id, name, role, bio) VALUES
('founder', 'James Ochieng', 'Founder & Executive Director', 'James founded Stemtrix EA with a vision to make robotics education accessible to every student in East Africa. With a background in electrical engineering and education technology, he leads the strategic direction of the Inspire Robotics Challenge.'),
('programs-director', 'Amina Wanjiku', 'Director of Programs', 'Amina oversees all competition programs, from curriculum design to event execution. Her experience in educational program management ensures each season delivers meaningful learning outcomes for participants.'),
('tech-lead', 'Kevin Mwangi', 'Technical Director', 'Kevin manages the technical infrastructure of the competition, including robot kit specifications, scoring systems, and field design. He brings expertise from his work in automation engineering.'),
('partnerships', 'Grace Njeri', 'Director of Partnerships', E'Hiwot builds and maintains relationships with schools, sponsors, and government bodies. Her network across the education and technology sectors has been instrumental in the competition''s growth.'),
('outreach', 'Brian Kiprop', 'Community Outreach Manager', 'Brian leads volunteer recruitment, school outreach, and community engagement initiatives. He works to ensure the competition reaches underserved communities and promotes diversity in STEM.'),
('events', 'Faith Muthoni', 'Events Coordinator', 'Faith manages all event logistics from venue selection to day-of operations. Her attention to detail ensures smooth competition experiences for teams, volunteers, and spectators.');

-- 7l. Schools
INSERT INTO schools (id, name, city, since, teams, achievements) VALUES
('brookhouse', 'Brookhouse School', 'Nairobi', '2021', 4, ARRAY['Season 1 Explore Champion', 'Most Teams Fielded Award']),
('aga-khan', 'Aga Khan Schools', 'Nairobi', '2020', 3, ARRAY['Innovation Award', 'Best Rookie Team']),
('isk', 'International School of Kenya', 'Nairobi', '2022', 3, ARRAY['Challengers Champion', E'Judges'' Award']),
('braeburn', 'Braeburn Schools', 'Nairobi', '2023', 3, ARRAY['Innovators National Champion']),
('braeside', 'Braeside School', 'Nairobi', '2023', 2, ARRAY['Best Engineering Notebook']),
('sabis', 'SABIS School', 'Nairobi', '2023', 2, ARRAY['Most Improved Team']),
('st-andrews-turi', E'St. Andrew''s School Turi', 'Molo', '2022', 2, ARRAY['Regional Expansion Pioneer']),
('potterhouse', 'Potterhouse School', 'Nairobi', '2021', 3, ARRAY['Community Outreach Award']),
('brookside', 'Brookside Academy', 'Nairobi', '2023', 2, ARRAY['Best Presentation Award']),
('oshwal', 'Oshwal Academy', 'Nairobi', '2022', 3, ARRAY['Largest School Delegation']),
('hollycross', 'Hollycross School', 'Nairobi', '2024', 2, ARRAY[]::TEXT[]),
('merishaw', 'Merishaw School', 'Nairobi', '2024', 1, ARRAY[]::TEXT[]),
('premier-academy', 'Premier Academy', 'Nairobi', '2021', 3, ARRAY['Challengers National Champion']),
('woodcreek', 'Woodcreek School', 'Nairobi', '2024', 1, ARRAY[]::TEXT[]),
('cgh', 'CGH School', 'Nairobi', '2024', 1, ARRAY[]::TEXT[]);

-- 7m. Ecosystem Stats
INSERT INTO ecosystem_stats (id, schools_reached, students_reached, satisfaction_rate, robots_built, awards_won, students_impacted, volunteers_engaged, cities_reached)
VALUES ('ecosystem-stats', 15, 10000, 95.00, 120, 45, 10000, 85, 3);

-- 7n. Footer Content
INSERT INTO footer_content (id, tagline, copyright, email, phone, phone2, address, hours_weekday, hours_saturday)
VALUES (
    'footer-main',
    'Inspiring the next generation of African innovators through robotics and AI.',
    '© 2026 Inspire Robotics Challenge by Stemtrix EA. All rights reserved.',
    'stemtrix@gmail.com',
    '+254 728 128 353',
    '+254 110 394 940',
    'Kabarnet Road off Ngong Road, J2 Jamhuri Cres, Nairobi',
    'Mon - Fri: 8AM - 6PM',
    'Sat: 9AM - 1PM'
);

-- 7o. Admin Users
INSERT INTO users (id, name, email, role, status) VALUES
('user-admin', 'Admin User', 'admin@inspirerobotics.org', 'Super Admin', 'Active'),
('user-editor', 'Content Editor', 'editor@inspirerobotics.org', 'Editor', 'Active');

-- 7p. Permissions
INSERT INTO permissions (id, role, scope, actions) VALUES
('perm-super-admin', 'Super Admin', 'all', ARRAY['view', 'create', 'edit', 'delete', 'publish']),
('perm-editor', 'Editor', 'content', ARRAY['view', 'edit', 'publish']);

-- 7q. Categories
INSERT INTO categories (id, name, track, status) VALUES
('cat-line-following', 'Line Following', 'Explore', 'Active'),
('cat-object-sorting', 'Object Sorting', 'Explore', 'Active'),
('cat-autonomous-navigation', 'Autonomous Navigation', 'Challengers', 'Active');

-- 7r. Site Settings
INSERT INTO settings (id, site_name, organization_name, site_tagline, contact_email)
VALUES (
    'site',
    'Inspire Robotics Challenge',
    'Stemtrix EA',
    E'East Africa''s Premier Robotics & AI Competition',
    'hello@inspirerobotics.org'
);

-- ============================================================
-- SCHEMA COMPLETE
-- ============================================================
-- Tables: 20 (including child tables)
-- Indexes: 17
-- RLS policies: 40 (public read + public insert + admin full access)
-- Views: 3
-- Seed records: 80+
--
-- Module-to-Table mapping:
--   home           -> home_content
--   register       -> register_content
--   events         -> events + event_winners
--   challenges     -> competition_tracks + track_rubrics
--   about-content  -> about_content
--   about-faqs     -> faqs
--   case-studies   -> case_studies
--   partners       -> partners
--   organizers     -> organizers
--   schools        -> schools
--   ecosystem      -> schools + partners + organizers + ecosystem_stats
--   footer         -> footer_content
--   users          -> users
--   permissions    -> permissions
--   categories     -> categories
--   settings       -> settings
--   (registrations) -> partner_registrations + team_registrations
-- ============================================================

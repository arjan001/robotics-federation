-- ============================================================
-- SEED DATA for Robotics Competition Platform
-- Run AFTER schema.sql to populate all tables with initial data
-- Compatible with: PostgreSQL / Supabase
-- Uses ON CONFLICT to safely re-run without duplicate key errors
-- ============================================================

-- ============================================================
-- 1. HOME PAGE CONTENT
-- ============================================================
INSERT INTO home_content (id, hero_title, hero_subtitle, primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href)
VALUES (
  'home-main',
  'Inspire Robotics Challenge',
  'East Africa''s premier robotics and AI competition hub. Empowering young minds to build, innovate, and shape the future through technology.',
  'Register Your Team',
  '/register',
  'Explore Challenges',
  '/challenges'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 2. ABOUT PAGE CONTENT
-- ============================================================
INSERT INTO about_content (id, title, subtitle)
VALUES (
  'about-main',
  'Built for future innovators. Designed for measurable impact.',
  'Stemtrix EA runs a competition-first learning ecosystem where students build real robotics skills, mentors shape team growth, and schools gain a structured path to future-ready STEM outcomes.'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 3. FAQs
-- ============================================================
INSERT INTO faqs (id, question, answer, sort_order) VALUES
  ('faq-join', 'How do students join Inspire Robotics programs?', 'Schools and independent teams register by track, complete onboarding, and receive challenge guides, calendars, and mentor matching before build sessions begin.', 1),
  ('faq-experience', 'Do participants need prior robotics experience?', 'No. Tracks are age-appropriate and skill-staged. Students can start from basic exploration and progress into advanced strategy, automation, and programming challenges.', 2),
  ('faq-outcomes', 'What outcomes are tracked across a season?', 'Programs track technical capability, teamwork, documentation quality, challenge completion, and presentation readiness so schools can measure growth beyond final scores.', 3),
  ('faq-partners', 'How can schools or partners collaborate with Stemtrix EA?', 'Partners can support kits, mentoring, workshops, venue access, and scholarships. Schools can host qualifiers, open labs, and join multi-city season rollouts.', 4),
  ('faq-cost', 'What is the cost to participate?', 'Registration fees vary by track and region. Scholarship programs and sponsor-backed entries are available for schools in underserved areas.', 5),
  ('faq-age', 'What age groups can participate?', 'The competition is open to students ages 6-18, divided into three tracks: Explore (6-10), Innovators (11-14), and Challengers (15-18).', 6),
  ('faq-equipment', 'Do teams need their own robotics equipment?', 'Teams can bring their own equipment or request starter kits. Schools partnered with Stemtrix EA often have shared lab resources available.', 7)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 4. CASE STUDIES
-- ============================================================
INSERT INTO case_studies (id, title, category, summary, challenge, solution, outcomes, accent) VALUES
  ('cs-adaptive-math', 'Adaptive Math Labs', 'K-12', 'Transformed math instruction with adaptive robotics-based learning modules that meet students at their skill level.', 'Traditional instruction fails to engage diverse learners at varying skill levels.', 'Deployed adaptive robotics challenges with difficulty scaling linked to real-time student performance data.', ARRAY['85% student engagement increase', '30% improvement in math scores', '12 schools onboarded'], '#6366f1'),
  ('cs-robotics-bootcamp', 'Robotics Bootcamp Network', 'Hands-On STEM', 'Built a national network of weekend robotics bootcamps for underserved communities.', 'Limited access to robotics programs in rural areas and informal settlements.', 'Partnered with local community centers to run monthly bootcamps with donated equipment.', ARRAY['500+ students trained', '15 community centers active', '3 national awards'], '#f59e0b'),
  ('cs-virtual-lab', 'Virtual Lab Classroom', 'AI + Hybrid', 'Launched a hybrid AI-powered virtual lab for remote robotics education.', 'COVID-19 disrupted hands-on learning. Students lost access to physical labs.', 'Created virtual simulation environment with AI tutoring and weekly hardware kit deliveries.', ARRAY['200 students per cohort', '95% completion rate', 'Adopted by 8 schools'], '#10b981'),
  ('cs-teacher-ai', 'Teacher AI Copilot', 'Classroom Enablement', 'Equipped teachers with AI-powered lesson planning and assessment tools for STEM classes.', 'Teachers lacked resources and confidence to integrate robotics into the curriculum.', 'Developed an AI copilot that generates lesson plans, rubrics, and progress reports aligned to national standards.', ARRAY['40 teachers trained', '60% time saved on planning', '92% teacher satisfaction'], '#ec4899'),
  ('cs-inclusive-stem', 'Inclusive STEM Pathways', 'Equity-Focused', 'Created pathways for girls and underrepresented groups to enter competitive robotics.', 'Gender gap in STEM participation remained persistent across East Africa.', 'Launched girls-only bootcamps, mentorship circles, and scholarship tracks for national competitions.', ARRAY['45% female participation', '10 scholarships awarded', 'Featured in UN report'], '#8b5cf6')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 5. REGISTER PAGE CONTENT
-- ============================================================
INSERT INTO register_content (id, title, subtitle, team_title, team_description, partner_title, partner_description)
VALUES (
  'register-main',
  'Registration Hub',
  'Register your team for the competition or express interest as a partner.',
  'Team Registration',
  'Register your school team for the next season of the Inspire Robotics Challenge.',
  'Partner Interest',
  'Interested in sponsoring or partnering with the Inspire Robotics Challenge?'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 6. FOOTER CONTENT
-- ============================================================
INSERT INTO footer_content (id, tagline, copyright, email)
VALUES (
  'footer-main',
  'Inspiring the next generation of African innovators through robotics and AI.',
  '© 2026 Inspire Robotics Challenge by Stemtrix EA. All rights reserved.',
  'stemtrix@gmail.com'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 7. EVENTS
-- ============================================================
INSERT INTO events (id, name, date, location, status, description, teams_participated, highlights) VALUES
  ('evt-s1-kickoff', 'Season 1 Kickoff', '2024-01-15', 'Nairobi Innovation Hub', 'past', 'The inaugural season kickoff bringing together schools from across Kenya.', 24, ARRAY['24 teams registered', 'First national-level robotics event', '3 competition tracks launched']),
  ('evt-s1-regional', 'Season 1 Regional Qualifier', '2024-04-20', 'Mombasa Tech Center', 'past', 'Regional qualifier featuring top teams from the Coast region.', 18, ARRAY['18 teams competed', 'Top 8 advanced to nationals', 'Live-streamed event']),
  ('evt-s1-national', 'Season 1 National Championship', '2024-07-10', 'KICC Nairobi', 'past', 'Grand finale of Season 1 with awards and exhibitions.', 32, ARRAY['32 teams from 6 counties', '10 partner exhibits', 'National media coverage']),
  ('evt-s2-kickoff', 'Season 2 Kickoff', '2025-01-20', 'Nairobi Innovation Hub', 'past', 'Season 2 launch with expanded reach into East Africa.', 45, ARRAY['45 teams registered', 'First Uganda and Tanzania teams', 'New Challengers track introduced']),
  ('evt-s2-regional', 'Season 2 Regional Qualifiers', '2025-05-15', 'Multiple Cities', 'current', 'Simultaneous regional qualifiers across Nairobi, Mombasa, Kisumu, and Kampala.', 60, ARRAY['4 simultaneous venues', '60+ teams competing', 'First cross-border qualifiers']),
  ('evt-s2-national', 'Season 2 National Championship', '2025-09-20', 'KICC Nairobi', 'upcoming', 'The biggest Inspire Robotics Championship yet with teams from 3 countries.', NULL, ARRAY['Expected 80+ teams', 'International judges panel', 'Scholarship prizes']),
  ('evt-s3-kickoff', 'Season 3 Kickoff', '2026-02-01', 'TBD', 'upcoming', 'Season 3 with new challenges and expanded partnerships.', NULL, ARRAY['Open registration', 'New AI integration challenges', 'Teacher training workshops'])
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 8. COMPETITION TRACKS (CHALLENGES)
-- ============================================================
INSERT INTO competition_tracks (id, name, tagline, age_range, description, color, icon, missions) VALUES
  ('track-explore', 'Explore', 'Discover the world of robotics', '6-10', 'Introduction to robotics through guided challenges. Students learn basic movement, sensors, and teamwork.', '#22c55e', '🔍', ARRAY['Build a robot that follows a line', 'Create a robot that avoids obstacles', 'Design a robot that responds to sound', 'Build a rescue robot that navigates a maze']),
  ('track-innovators', 'Innovators', 'Solve real-world problems', '11-14', 'Students tackle real-world challenges using robotics. Focus on engineering design, programming, and creative solutions.', '#3b82f6', '💡', ARRAY['Design a sorting robot for recycling', 'Build an autonomous delivery vehicle', 'Create a robot that assists in farming', 'Engineer a solution for water quality monitoring']),
  ('track-challengers', 'Challengers', 'Push the boundaries of innovation', '15-18', 'Advanced competition for experienced teams. Emphasis on AI integration, complex algorithms, and competition-grade performance.', '#f97316', '🏆', ARRAY['Build an AI-powered navigation robot', 'Design a multi-robot coordination system', 'Create a robot with computer vision', 'Engineer an autonomous search and rescue system'])
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 9. CATEGORIES
-- ============================================================
INSERT INTO categories (id, name, track, status) VALUES
  ('cat-line-following', 'Line Following', 'Explore', 'Active'),
  ('cat-object-sorting', 'Object Sorting', 'Explore', 'Active'),
  ('cat-obstacle-avoidance', 'Obstacle Avoidance', 'Explore', 'Active'),
  ('cat-rescue-maze', 'Rescue Maze', 'Explore', 'Active'),
  ('cat-recycling-robot', 'Recycling Robot', 'Innovators', 'Active'),
  ('cat-delivery-vehicle', 'Autonomous Delivery', 'Innovators', 'Active'),
  ('cat-farm-assistant', 'Farm Assistant', 'Innovators', 'Active'),
  ('cat-water-monitor', 'Water Quality Monitor', 'Innovators', 'Active'),
  ('cat-autonomous-navigation', 'Autonomous Navigation', 'Challengers', 'Active'),
  ('cat-multi-robot', 'Multi-Robot Coordination', 'Challengers', 'Active'),
  ('cat-computer-vision', 'Computer Vision', 'Challengers', 'Active'),
  ('cat-search-rescue', 'Search & Rescue', 'Challengers', 'Active')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 10. PARTNERS
-- ============================================================
INSERT INTO partners (id, name, type, description, contribution) VALUES
  ('ptr-microsoft', 'Microsoft Africa', 'technology', 'Global technology leader providing cloud and AI resources.', 'Azure credits, AI tools, and technical mentorship'),
  ('ptr-safaricom', 'Safaricom Foundation', 'sponsor', 'Kenya''s leading telecommunications company supporting youth STEM.', 'Financial sponsorship and connectivity infrastructure'),
  ('ptr-uon', 'University of Nairobi', 'educational', 'Premier university providing academic guidance and venue support.', 'Lab access, student mentors, and research collaboration'),
  ('ptr-nation', 'Nation Media Group', 'media', 'East Africa''s largest media house covering competition events.', 'Media coverage, live streaming, and promotional campaigns'),
  ('ptr-techno-brain', 'Techno Brain', 'technology', 'IT solutions provider supporting digital education infrastructure.', 'Hardware donations and IT training workshops'),
  ('ptr-equity', 'Equity Foundation', 'sponsor', 'Financial institution investing in youth education and innovation.', 'Scholarship funding and financial literacy workshops'),
  ('ptr-ilab', 'iLab Africa', 'educational', 'Innovation lab driving tech entrepreneurship in East Africa.', 'Maker space access and innovation workshops'),
  ('ptr-google', 'Google Developer Groups', 'technology', 'Community-driven developer network supporting tech education.', 'Training resources, cloud credits, and developer mentorship')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 11. SCHOOLS
-- ============================================================
INSERT INTO schools (id, name, city, since, teams, achievements) VALUES
  ('sch-brookhouse', 'Brookhouse School', 'Nairobi', '2024', 3, ARRAY['Season 1 Champions', 'Best Innovation Award', 'Most Improved Team']),
  ('sch-aga-khan', 'Aga Khan Academy', 'Mombasa', '2024', 2, ARRAY['Regional Qualifier Winners', 'Best Technical Documentation']),
  ('sch-hillcrest', 'Hillcrest International', 'Nairobi', '2024', 4, ARRAY['Season 1 Runners-up', 'Community Impact Award', 'Best Teamwork']),
  ('sch-makini', 'Makini Schools', 'Nairobi', '2024', 2, ARRAY['Best Newcomer Award', 'Most Creative Solution']),
  ('sch-strathmore', 'Strathmore School', 'Nairobi', '2024', 3, ARRAY['Technical Excellence Award', 'Best Robot Design']),
  ('sch-braeburn', 'Braeburn School', 'Nairobi', '2025', 2, ARRAY['Season 2 Regional Winner']),
  ('sch-banda', 'Banda School', 'Nairobi', '2025', 1, ARRAY['Most Promising New Team']),
  ('sch-rusinga', 'Rusinga School', 'Nairobi', '2025', 2, ARRAY['Best AI Integration']),
  ('sch-light', 'Light Academy', 'Nairobi', '2024', 3, ARRAY['Most Consistent Performance', 'Season 1 Semi-finalist']),
  ('sch-peponi', 'Peponi School', 'Nairobi', '2025', 2, ARRAY['Best Strategy Award']),
  ('sch-st-marys', 'St. Mary''s School', 'Nairobi', '2024', 1, ARRAY['Fair Play Award']),
  ('sch-riara', 'Riara Group of Schools', 'Nairobi', '2025', 3, ARRAY['Best Presentation', 'Most Teams Entered']),
  ('sch-mombasa-academy', 'Mombasa Academy', 'Mombasa', '2025', 2, ARRAY['Coast Regional Champions']),
  ('sch-kisumu-boys', 'Kisumu Boys High', 'Kisumu', '2025', 1, ARRAY['Western Regional Runner-up']),
  ('sch-kampala-int', 'Kampala International', 'Kampala', '2025', 2, ARRAY['First International Team', 'Best Cross-border Collaboration'])
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 12. ORGANIZERS
-- ============================================================
INSERT INTO organizers (id, name, role, bio) VALUES
  ('org-director', 'Arjan Singh', 'Executive Director', 'Founder of Stemtrix EA with 15 years in STEM education and technology leadership across East Africa.'),
  ('org-program', 'Sarah Wanjiku', 'Program Director', 'Leads competition design, school partnerships, and season execution with a focus on inclusive STEM access.'),
  ('org-tech', 'James Ochieng', 'Technical Director', 'Oversees robotics curriculum, challenge design, and judging criteria across all competition tracks.'),
  ('org-community', 'Fatima Hassan', 'Community Manager', 'Builds and nurtures partnerships with schools, sponsors, and the broader STEM education ecosystem.'),
  ('org-events', 'David Mutua', 'Events Coordinator', 'Plans and executes all competition events, regional qualifiers, and national championship logistics.'),
  ('org-comms', 'Grace Akinyi', 'Communications Lead', 'Manages media relations, social media presence, and public communications for the Inspire Robotics brand.')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 13. ECOSYSTEM STATS
-- ============================================================
INSERT INTO ecosystem_stats (id, schools_reached, students_reached, satisfaction_rate, robots_built, awards_won, students_impacted, volunteers_engaged, cities_reached)
VALUES (
  'ecosystem-stats',
  15,
  10000,
  95.00,
  120,
  45,
  5000,
  85,
  3
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 14. PERMISSIONS (Role-Based Access Control)
-- ============================================================
INSERT INTO permissions (id, role, scope, actions) VALUES
  ('perm-super-admin', 'Super Admin', 'all', ARRAY['view', 'create', 'edit', 'delete', 'publish', 'manage-users', 'manage-settings']),
  ('perm-editor', 'Editor', 'content', ARRAY['view', 'create', 'edit', 'publish']),
  ('perm-viewer', 'Viewer', 'content', ARRAY['view'])
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 15. SITE SETTINGS
-- ============================================================
INSERT INTO settings (id, site_name, organization_name, site_tagline, contact_email)
VALUES (
  'site',
  'Inspire Robotics Challenge',
  'Stemtrix EA',
  'East Africa''s Premier Robotics & AI Competition',
  'hello@inspirerobotics.org'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 16. SAMPLE PARTNER REGISTRATIONS
-- ============================================================
INSERT INTO partner_registrations (id, organization_name, contact_person, email, phone, partnership_type, website, contribution, status, follow_up_date, follow_up_notes) VALUES
  ('PTR-001', 'TechVentures Africa', 'John Kamau', 'john@techventures.co.ke', '+254712345678', 'technology', 'https://techventures.co.ke', 'Hardware donations and coding workshops', 'confirmed', '2025-06-01', 'Partnership agreement signed. Delivering 20 starter kits.'),
  ('PTR-002', 'EduInnovate Foundation', 'Mary Atieno', 'mary@eduinnovate.org', '+254723456789', 'educational', 'https://eduinnovate.org', 'Teacher training and curriculum support', 'in-progress', '2025-05-15', 'MOU under review. Follow up on training schedule.'),
  ('PTR-003', 'Kenya Broadcasting Corp', 'Peter Njoroge', 'peter@kbc.co.ke', '+254734567890', 'media', 'https://kbc.co.ke', 'Live event coverage and documentary production', 'contacted', '2025-05-20', 'Initial meeting completed. Awaiting proposal review.'),
  ('PTR-004', 'SafeTech Solutions', 'Alice Mwende', 'alice@safetech.io', '+254745678901', 'sponsor', 'https://safetech.io', 'Financial sponsorship for Season 3', 'new', NULL, NULL),
  ('PTR-005', 'Mombasa Convention Centre', 'Hassan Ali', 'hassan@mcc.co.ke', '+254756789012', 'venue', 'https://mcc.co.ke', 'Venue for Coast regional qualifier', 'confirmed', '2025-04-30', 'Venue booked for May 2025 regional qualifier.')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 17. SAMPLE TEAM REGISTRATIONS
-- ============================================================
INSERT INTO team_registrations (id, school_name, city, county, contact_person, email, phone, team_name, member_count, age_range, experience, competition_track, has_equipment, coach_name, coach_email, notes, event_id, status, follow_up_date, follow_up_notes) VALUES
  ('TM-001', 'Brookhouse School', 'Nairobi', 'Nairobi', 'Mrs. Jane Wambui', 'jane@brookhouse.ac.ke', '+254711111111', 'Brookhouse Titans', 5, '15-18', 'Advanced - 2 seasons', 'challengers', 'yes', 'Mr. Kevin Odhiambo', 'kevin@brookhouse.ac.ke', 'Returning champions. Strong programming skills.', 'evt-s2-regional', 'approved', NULL, 'Equipment verified. Ready for competition.'),
  ('TM-002', 'Aga Khan Academy', 'Mombasa', 'Mombasa', 'Dr. Amir Patel', 'amir@agakhan.ac.ke', '+254722222222', 'AKA Innovators', 4, '11-14', 'Intermediate - 1 season', 'innovators', 'yes', 'Ms. Rehema Said', 'rehema@agakhan.ac.ke', 'Focus on environmental solutions.', 'evt-s2-regional', 'approved', NULL, NULL),
  ('TM-003', 'Hillcrest International', 'Nairobi', 'Nairobi', 'Mr. Tom Muturi', 'tom@hillcrest.sc.ke', '+254733333333', 'Hillcrest Hawks', 6, '15-18', 'Advanced - 2 seasons', 'challengers', 'partial', 'Ms. Lucy Njeri', 'lucy@hillcrest.sc.ke', 'Need additional sensors and motors.', 'evt-s2-regional', 'approved', '2025-05-01', 'Arranging equipment loan from partner pool.'),
  ('TM-004', 'Light Academy', 'Nairobi', 'Nairobi', 'Ms. Aisha Mohammed', 'aisha@lightacademy.ac.ke', '+254744444444', 'Light Explorers', 4, '6-10', 'Beginner', 'explore', 'no', 'Mr. Hassan Osman', 'hassan@lightacademy.ac.ke', 'First-time participants. Very enthusiastic!', 'evt-s2-regional', 'reviewed', '2025-04-25', 'Need starter kit. Requesting sponsor support.'),
  ('TM-005', 'Kampala International', 'Kampala', 'N/A', 'Dr. Grace Nambi', 'grace@kis.ac.ug', '+256755555555', 'KIS Robotics', 5, '11-14', 'Intermediate', 'innovators', 'yes', 'Mr. Brian Okello', 'brian@kis.ac.ug', 'First international team from Uganda!', 'evt-s2-regional', 'approved', NULL, 'Travel logistics arranged. Accommodation confirmed.'),
  ('TM-006', 'Makini Schools', 'Nairobi', 'Nairobi', 'Mrs. Faith Muthoni', 'faith@makini.ac.ke', '+254766666666', 'Makini Builders', 3, '6-10', 'Beginner', 'explore', 'no', 'Ms. Catherine Wangari', 'catherine@makini.ac.ke', 'Small but dedicated team.', NULL, 'new', NULL, NULL),
  ('TM-007', 'St. Mary''s School', 'Nairobi', 'Nairobi', 'Sr. Margaret Nyaga', 'margaret@stmarys.ac.ke', '+254777777777', 'St. Mary''s Coders', 4, '11-14', 'Beginner', 'innovators', 'partial', 'Mr. James Karanja', 'james@stmarys.ac.ke', 'Need programming training support.', NULL, 'new', NULL, NULL),
  ('TM-008', 'Mombasa Academy', 'Mombasa', 'Mombasa', 'Mr. Ali Bakari', 'ali@mombasaacademy.ac.ke', '+254788888888', 'Coast Champions', 5, '15-18', 'Intermediate - 1 season', 'challengers', 'yes', 'Ms. Halima Juma', 'halima@mombasaacademy.ac.ke', 'Strong mechanical skills. Focus on AI this season.', 'evt-s2-regional', 'approved', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- NOTES:
-- ============================================================
-- Users table is NOT seeded here. Admin registers via /admin/register
-- then logs in. The first registered user gets Super Admin role.
--
-- To run this seed:
--   psql -U your_user -d your_database -f database/seed.sql
--
-- Or in Supabase SQL Editor, paste and execute.
-- ============================================================

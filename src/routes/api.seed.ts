import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { getStore } from '@netlify/blobs'

// ============================================================
// Seed API - Populates Netlify Blobs with comprehensive data
// This mirrors the SQL seed.sql file for the Blobs-based system
// ============================================================

const SEED_DATA: Record<string, unknown[]> = {
  home: [
    {
      id: 'home-main',
      heroTitle: 'Inspire Robotics Challenge',
      heroSubtitle: "East Africa's premier robotics and AI competition hub. Empowering young minds to build, innovate, and shape the future through technology.",
      primaryCtaLabel: 'Register Your Team',
      primaryCtaHref: '/register',
      secondaryCtaLabel: 'Explore Challenges',
      secondaryCtaHref: '/challenges',
    },
  ],

  'about-content': [
    {
      id: 'about-main',
      title: 'Built for future innovators. Designed for measurable impact.',
      subtitle: 'Stemtrix EA runs a competition-first learning ecosystem where students build real robotics skills, mentors shape team growth, and schools gain a structured path to future-ready STEM outcomes.',
    },
  ],

  'about-faqs': [
    { id: 'faq-join', question: 'How do students join Inspire Robotics programs?', answer: 'Schools and independent teams register by track, complete onboarding, and receive challenge guides, calendars, and mentor matching before build sessions begin.' },
    { id: 'faq-experience', question: 'Do participants need prior robotics experience?', answer: 'No. Tracks are age-appropriate and skill-staged. Students can start from basic exploration and progress into advanced strategy, automation, and programming challenges.' },
    { id: 'faq-outcomes', question: 'What outcomes are tracked across a season?', answer: 'Programs track technical capability, teamwork, documentation quality, challenge completion, and presentation readiness so schools can measure growth beyond final scores.' },
    { id: 'faq-partners', question: 'How can schools or partners collaborate with Stemtrix EA?', answer: 'Partners can support kits, mentoring, workshops, venue access, and scholarships. Schools can host qualifiers, open labs, and join multi-city season rollouts.' },
    { id: 'faq-cost', question: 'What is the cost to participate?', answer: 'Registration fees vary by track and region. Scholarship programs and sponsor-backed entries are available for schools in underserved areas.' },
    { id: 'faq-age', question: 'What age groups can participate?', answer: 'The competition is open to students ages 6-18, divided into three tracks: Explore (6-10), Innovators (11-14), and Challengers (15-18).' },
    { id: 'faq-equipment', question: 'Do teams need their own robotics equipment?', answer: 'Teams can bring their own equipment or request starter kits. Schools partnered with Stemtrix EA often have shared lab resources available.' },
  ],

  'case-studies': [
    { id: 'cs-adaptive-math', title: 'Adaptive Math Labs', category: 'K-12', summary: 'Transformed math instruction with adaptive robotics-based learning modules.', challenge: 'Traditional instruction fails to engage diverse learners at varying skill levels.', solution: 'Deployed adaptive robotics challenges with difficulty scaling linked to real-time student performance data.', outcomes: ['85% student engagement increase', '30% improvement in math scores', '12 schools onboarded'], accent: '#6366f1' },
    { id: 'cs-robotics-bootcamp', title: 'Robotics Bootcamp Network', category: 'Hands-On STEM', summary: 'Built a national network of weekend robotics bootcamps for underserved communities.', challenge: 'Limited access to robotics programs in rural areas and informal settlements.', solution: 'Partnered with local community centers to run monthly bootcamps with donated equipment.', outcomes: ['500+ students trained', '15 community centers active', '3 national awards'], accent: '#f59e0b' },
    { id: 'cs-virtual-lab', title: 'Virtual Lab Classroom', category: 'AI + Hybrid', summary: 'Launched a hybrid AI-powered virtual lab for remote robotics education.', challenge: 'COVID-19 disrupted hands-on learning. Students lost access to physical labs.', solution: 'Created virtual simulation environment with AI tutoring and weekly hardware kit deliveries.', outcomes: ['200 students per cohort', '95% completion rate', 'Adopted by 8 schools'], accent: '#10b981' },
    { id: 'cs-teacher-ai', title: 'Teacher AI Copilot', category: 'Classroom Enablement', summary: 'Equipped teachers with AI-powered lesson planning and assessment tools.', challenge: 'Teachers lacked resources and confidence to integrate robotics into the curriculum.', solution: 'Developed an AI copilot that generates lesson plans, rubrics, and progress reports aligned to national standards.', outcomes: ['40 teachers trained', '60% time saved on planning', '92% teacher satisfaction'], accent: '#ec4899' },
    { id: 'cs-inclusive-stem', title: 'Inclusive STEM Pathways', category: 'Equity-Focused', summary: 'Created pathways for girls and underrepresented groups to enter competitive robotics.', challenge: 'Gender gap in STEM participation remained persistent across East Africa.', solution: 'Launched girls-only bootcamps, mentorship circles, and scholarship tracks for national competitions.', outcomes: ['45% female participation', '10 scholarships awarded', 'Featured in UN report'], accent: '#8b5cf6' },
  ],

  register: [
    {
      id: 'register-main',
      title: 'Registration Hub',
      subtitle: 'Register your team for the competition or express interest as a partner.',
      teamTitle: 'Team Registration',
      teamDescription: 'Register your school team for the next season of the Inspire Robotics Challenge.',
      partnerTitle: 'Partner Interest',
      partnerDescription: 'Interested in sponsoring or partnering with the Inspire Robotics Challenge?',
    },
  ],

  footer: [
    {
      id: 'footer-main',
      tagline: 'Inspiring the next generation of African innovators through robotics and AI.',
      copyright: '© 2026 Inspire Robotics Challenge by Stemtrix EA. All rights reserved.',
      email: 'stemtrix@gmail.com',
    },
  ],

  events: [
    { id: 'evt-s1-kickoff', name: 'Season 1 Kickoff', date: '2024-01-15', location: 'Nairobi Innovation Hub', status: 'past', description: 'The inaugural season kickoff bringing together schools from across Kenya.', teamsParticipated: 24, highlights: ['24 teams registered', 'First national-level robotics event', '3 competition tracks launched'] },
    { id: 'evt-s1-regional', name: 'Season 1 Regional Qualifier', date: '2024-04-20', location: 'Mombasa Tech Center', status: 'past', description: 'Regional qualifier featuring top teams from the Coast region.', teamsParticipated: 18, highlights: ['18 teams competed', 'Top 8 advanced to nationals', 'Live-streamed event'] },
    { id: 'evt-s1-national', name: 'Season 1 National Championship', date: '2024-07-10', location: 'KICC Nairobi', status: 'past', description: 'Grand finale of Season 1 with awards and exhibitions.', teamsParticipated: 32, highlights: ['32 teams from 6 counties', '10 partner exhibits', 'National media coverage'] },
    { id: 'evt-s2-kickoff', name: 'Season 2 Kickoff', date: '2025-01-20', location: 'Nairobi Innovation Hub', status: 'past', description: 'Season 2 launch with expanded reach into East Africa.', teamsParticipated: 45, highlights: ['45 teams registered', 'First Uganda and Tanzania teams', 'New Challengers track introduced'] },
    { id: 'evt-s2-regional', name: 'Season 2 Regional Qualifiers', date: '2025-05-15', location: 'Multiple Cities', status: 'current', description: 'Simultaneous regional qualifiers across Nairobi, Mombasa, Kisumu, and Kampala.', teamsParticipated: 60, highlights: ['4 simultaneous venues', '60+ teams competing', 'First cross-border qualifiers'] },
    { id: 'evt-s2-national', name: 'Season 2 National Championship', date: '2025-09-20', location: 'KICC Nairobi', status: 'upcoming', description: 'The biggest Inspire Robotics Championship yet with teams from 3 countries.', teamsParticipated: null, highlights: ['Expected 80+ teams', 'International judges panel', 'Scholarship prizes'] },
    { id: 'evt-s3-kickoff', name: 'Season 3 Kickoff', date: '2026-02-01', location: 'TBD', status: 'upcoming', description: 'Season 3 with new challenges and expanded partnerships.', teamsParticipated: null, highlights: ['Open registration', 'New AI integration challenges', 'Teacher training workshops'] },
  ],

  challenges: [
    { id: 'track-explore', name: 'Explore', tagline: 'Discover the world of robotics', ageRange: '6-10', description: 'Introduction to robotics through guided challenges. Students learn basic movement, sensors, and teamwork.', color: '#22c55e', icon: '🔍', missions: ['Build a robot that follows a line', 'Create a robot that avoids obstacles', 'Design a robot that responds to sound', 'Build a rescue robot that navigates a maze'] },
    { id: 'track-innovators', name: 'Innovators', tagline: 'Solve real-world problems', ageRange: '11-14', description: 'Students tackle real-world challenges using robotics. Focus on engineering design, programming, and creative solutions.', color: '#3b82f6', icon: '💡', missions: ['Design a sorting robot for recycling', 'Build an autonomous delivery vehicle', 'Create a robot that assists in farming', 'Engineer a solution for water quality monitoring'] },
    { id: 'track-challengers', name: 'Challengers', tagline: 'Push the boundaries of innovation', ageRange: '15-18', description: 'Advanced competition for experienced teams. Emphasis on AI integration, complex algorithms, and competition-grade performance.', color: '#f97316', icon: '🏆', missions: ['Build an AI-powered navigation robot', 'Design a multi-robot coordination system', 'Create a robot with computer vision', 'Engineer an autonomous search and rescue system'] },
  ],

  categories: [
    { id: 'cat-line-following', name: 'Line Following', track: 'Explore', status: 'Active' },
    { id: 'cat-object-sorting', name: 'Object Sorting', track: 'Explore', status: 'Active' },
    { id: 'cat-obstacle-avoidance', name: 'Obstacle Avoidance', track: 'Explore', status: 'Active' },
    { id: 'cat-rescue-maze', name: 'Rescue Maze', track: 'Explore', status: 'Active' },
    { id: 'cat-recycling-robot', name: 'Recycling Robot', track: 'Innovators', status: 'Active' },
    { id: 'cat-delivery-vehicle', name: 'Autonomous Delivery', track: 'Innovators', status: 'Active' },
    { id: 'cat-farm-assistant', name: 'Farm Assistant', track: 'Innovators', status: 'Active' },
    { id: 'cat-water-monitor', name: 'Water Quality Monitor', track: 'Innovators', status: 'Active' },
    { id: 'cat-autonomous-navigation', name: 'Autonomous Navigation', track: 'Challengers', status: 'Active' },
    { id: 'cat-multi-robot', name: 'Multi-Robot Coordination', track: 'Challengers', status: 'Active' },
    { id: 'cat-computer-vision', name: 'Computer Vision', track: 'Challengers', status: 'Active' },
    { id: 'cat-search-rescue', name: 'Search & Rescue', track: 'Challengers', status: 'Active' },
  ],

  partners: [
    { id: 'ptr-microsoft', name: 'Microsoft Africa', type: 'technology', description: 'Global technology leader providing cloud and AI resources.', contribution: 'Azure credits, AI tools, and technical mentorship' },
    { id: 'ptr-safaricom', name: 'Safaricom Foundation', type: 'sponsor', description: "Kenya's leading telecommunications company supporting youth STEM.", contribution: 'Financial sponsorship and connectivity infrastructure' },
    { id: 'ptr-uon', name: 'University of Nairobi', type: 'educational', description: 'Premier university providing academic guidance and venue support.', contribution: 'Lab access, student mentors, and research collaboration' },
    { id: 'ptr-nation', name: 'Nation Media Group', type: 'media', description: "East Africa's largest media house covering competition events.", contribution: 'Media coverage, live streaming, and promotional campaigns' },
    { id: 'ptr-techno-brain', name: 'Techno Brain', type: 'technology', description: 'IT solutions provider supporting digital education infrastructure.', contribution: 'Hardware donations and IT training workshops' },
    { id: 'ptr-equity', name: 'Equity Foundation', type: 'sponsor', description: 'Financial institution investing in youth education and innovation.', contribution: 'Scholarship funding and financial literacy workshops' },
    { id: 'ptr-ilab', name: 'iLab Africa', type: 'educational', description: 'Innovation lab driving tech entrepreneurship in East Africa.', contribution: 'Maker space access and innovation workshops' },
    { id: 'ptr-google', name: 'Google Developer Groups', type: 'technology', description: 'Community-driven developer network supporting tech education.', contribution: 'Training resources, cloud credits, and developer mentorship' },
  ],

  schools: [
    { id: 'sch-brookhouse', name: 'Brookhouse School', city: 'Nairobi', since: '2024', teams: 3, achievements: ['Season 1 Champions', 'Best Innovation Award', 'Most Improved Team'] },
    { id: 'sch-aga-khan', name: 'Aga Khan Academy', city: 'Mombasa', since: '2024', teams: 2, achievements: ['Regional Qualifier Winners', 'Best Technical Documentation'] },
    { id: 'sch-hillcrest', name: 'Hillcrest International', city: 'Nairobi', since: '2024', teams: 4, achievements: ['Season 1 Runners-up', 'Community Impact Award', 'Best Teamwork'] },
    { id: 'sch-makini', name: 'Makini Schools', city: 'Nairobi', since: '2024', teams: 2, achievements: ['Best Newcomer Award', 'Most Creative Solution'] },
    { id: 'sch-strathmore', name: 'Strathmore School', city: 'Nairobi', since: '2024', teams: 3, achievements: ['Technical Excellence Award', 'Best Robot Design'] },
    { id: 'sch-braeburn', name: 'Braeburn School', city: 'Nairobi', since: '2025', teams: 2, achievements: ['Season 2 Regional Winner'] },
    { id: 'sch-banda', name: 'Banda School', city: 'Nairobi', since: '2025', teams: 1, achievements: ['Most Promising New Team'] },
    { id: 'sch-rusinga', name: 'Rusinga School', city: 'Nairobi', since: '2025', teams: 2, achievements: ['Best AI Integration'] },
    { id: 'sch-light', name: 'Light Academy', city: 'Nairobi', since: '2024', teams: 3, achievements: ['Most Consistent Performance', 'Season 1 Semi-finalist'] },
    { id: 'sch-peponi', name: 'Peponi School', city: 'Nairobi', since: '2025', teams: 2, achievements: ['Best Strategy Award'] },
    { id: 'sch-st-marys', name: "St. Mary's School", city: 'Nairobi', since: '2024', teams: 1, achievements: ['Fair Play Award'] },
    { id: 'sch-riara', name: 'Riara Group of Schools', city: 'Nairobi', since: '2025', teams: 3, achievements: ['Best Presentation', 'Most Teams Entered'] },
    { id: 'sch-mombasa-academy', name: 'Mombasa Academy', city: 'Mombasa', since: '2025', teams: 2, achievements: ['Coast Regional Champions'] },
    { id: 'sch-kisumu-boys', name: 'Kisumu Boys High', city: 'Kisumu', since: '2025', teams: 1, achievements: ['Western Regional Runner-up'] },
    { id: 'sch-kampala-int', name: 'Kampala International', city: 'Kampala', since: '2025', teams: 2, achievements: ['First International Team', 'Best Cross-border Collaboration'] },
  ],

  organizers: [
    { id: 'org-director', name: 'Arjan Singh', role: 'Executive Director', bio: 'Founder of Stemtrix EA with 15 years in STEM education and technology leadership across East Africa.' },
    { id: 'org-program', name: 'Sarah Wanjiku', role: 'Program Director', bio: 'Leads competition design, school partnerships, and season execution with a focus on inclusive STEM access.' },
    { id: 'org-tech', name: 'James Ochieng', role: 'Technical Director', bio: 'Oversees robotics curriculum, challenge design, and judging criteria across all competition tracks.' },
    { id: 'org-community', name: 'Fatima Hassan', role: 'Community Manager', bio: 'Builds and nurtures partnerships with schools, sponsors, and the broader STEM education ecosystem.' },
    { id: 'org-events', name: 'David Mutua', role: 'Events Coordinator', bio: 'Plans and executes all competition events, regional qualifiers, and national championship logistics.' },
    { id: 'org-comms', name: 'Grace Akinyi', role: 'Communications Lead', bio: 'Manages media relations, social media presence, and public communications for the Inspire Robotics brand.' },
  ],

  ecosystem: [
    { id: 'ecosystem-stats', recordType: 'stats', schoolsReached: 15, studentsReached: 10000, satisfactionRate: 95, robotsBuilt: 120, awardsWon: 45, studentsImpacted: 5000, volunteersEngaged: 85, citiesReached: 3 },
  ],

  permissions: [
    { id: 'perm-super-admin', role: 'Super Admin', scope: 'all', actions: ['view', 'create', 'edit', 'delete', 'publish', 'manage-users', 'manage-settings'] },
    { id: 'perm-editor', role: 'Editor', scope: 'content', actions: ['view', 'create', 'edit', 'publish'] },
    { id: 'perm-viewer', role: 'Viewer', scope: 'content', actions: ['view'] },
  ],

  settings: [
    {
      id: 'site',
      siteName: 'Inspire Robotics Challenge',
      organizationName: 'Stemtrix EA',
      siteTagline: "East Africa's Premier Robotics & AI Competition",
      contactEmail: 'hello@inspirerobotics.org',
    },
  ],
}

// Registration seed data (separate store)
const REGISTRATION_SEED_DATA = {
  'partner-registrations': [
    { id: 'PTR-001', organizationName: 'TechVentures Africa', contactPerson: 'John Kamau', email: 'john@techventures.co.ke', phone: '+254712345678', partnershipType: 'technology', website: 'https://techventures.co.ke', contribution: 'Hardware donations and coding workshops', status: 'confirmed', followUpDate: '2025-06-01', followUpNotes: 'Partnership agreement signed. Delivering 20 starter kits.', registeredAt: '2025-03-01T10:00:00Z', updatedAt: '2025-03-15T14:30:00Z' },
    { id: 'PTR-002', organizationName: 'EduInnovate Foundation', contactPerson: 'Mary Atieno', email: 'mary@eduinnovate.org', phone: '+254723456789', partnershipType: 'educational', website: 'https://eduinnovate.org', contribution: 'Teacher training and curriculum support', status: 'in-progress', followUpDate: '2025-05-15', followUpNotes: 'MOU under review. Follow up on training schedule.', registeredAt: '2025-02-20T09:00:00Z', updatedAt: '2025-03-10T11:00:00Z' },
    { id: 'PTR-003', organizationName: 'Kenya Broadcasting Corp', contactPerson: 'Peter Njoroge', email: 'peter@kbc.co.ke', phone: '+254734567890', partnershipType: 'media', website: 'https://kbc.co.ke', contribution: 'Live event coverage and documentary production', status: 'contacted', followUpDate: '2025-05-20', followUpNotes: 'Initial meeting completed. Awaiting proposal review.', registeredAt: '2025-02-15T08:00:00Z', updatedAt: '2025-03-05T16:00:00Z' },
    { id: 'PTR-004', organizationName: 'SafeTech Solutions', contactPerson: 'Alice Mwende', email: 'alice@safetech.io', phone: '+254745678901', partnershipType: 'sponsor', website: 'https://safetech.io', contribution: 'Financial sponsorship for Season 3', status: 'new', followUpDate: '', followUpNotes: '', registeredAt: '2025-03-25T12:00:00Z', updatedAt: '2025-03-25T12:00:00Z' },
    { id: 'PTR-005', organizationName: 'Mombasa Convention Centre', contactPerson: 'Hassan Ali', email: 'hassan@mcc.co.ke', phone: '+254756789012', partnershipType: 'venue', website: 'https://mcc.co.ke', contribution: 'Venue for Coast regional qualifier', status: 'confirmed', followUpDate: '2025-04-30', followUpNotes: 'Venue booked for May 2025 regional qualifier.', registeredAt: '2025-01-10T07:00:00Z', updatedAt: '2025-03-20T10:00:00Z' },
  ],
  'team-registrations': [
    { id: 'TM-001', schoolName: 'Brookhouse School', city: 'Nairobi', county: 'Nairobi', contactPerson: 'Mrs. Jane Wambui', email: 'jane@brookhouse.ac.ke', phone: '+254711111111', teamName: 'Brookhouse Titans', memberCount: 5, ageRange: '15-18', experience: 'Advanced - 2 seasons', competitionTrack: 'challengers', hasEquipment: 'yes', coachName: 'Mr. Kevin Odhiambo', coachEmail: 'kevin@brookhouse.ac.ke', notes: 'Returning champions. Strong programming skills.', eventId: 'evt-s2-regional', status: 'approved', followUpDate: '', followUpNotes: 'Equipment verified. Ready for competition.', registeredAt: '2025-02-01T10:00:00Z', updatedAt: '2025-03-10T14:00:00Z' },
    { id: 'TM-002', schoolName: 'Aga Khan Academy', city: 'Mombasa', county: 'Mombasa', contactPerson: 'Dr. Amir Patel', email: 'amir@agakhan.ac.ke', phone: '+254722222222', teamName: 'AKA Innovators', memberCount: 4, ageRange: '11-14', experience: 'Intermediate - 1 season', competitionTrack: 'innovators', hasEquipment: 'yes', coachName: 'Ms. Rehema Said', coachEmail: 'rehema@agakhan.ac.ke', notes: 'Focus on environmental solutions.', eventId: 'evt-s2-regional', status: 'approved', followUpDate: '', followUpNotes: '', registeredAt: '2025-02-05T09:00:00Z', updatedAt: '2025-03-08T11:00:00Z' },
    { id: 'TM-003', schoolName: 'Hillcrest International', city: 'Nairobi', county: 'Nairobi', contactPerson: 'Mr. Tom Muturi', email: 'tom@hillcrest.sc.ke', phone: '+254733333333', teamName: 'Hillcrest Hawks', memberCount: 6, ageRange: '15-18', experience: 'Advanced - 2 seasons', competitionTrack: 'challengers', hasEquipment: 'partial', coachName: 'Ms. Lucy Njeri', coachEmail: 'lucy@hillcrest.sc.ke', notes: 'Need additional sensors and motors.', eventId: 'evt-s2-regional', status: 'approved', followUpDate: '2025-05-01', followUpNotes: 'Arranging equipment loan from partner pool.', registeredAt: '2025-02-10T08:00:00Z', updatedAt: '2025-03-12T16:00:00Z' },
    { id: 'TM-004', schoolName: 'Light Academy', city: 'Nairobi', county: 'Nairobi', contactPerson: 'Ms. Aisha Mohammed', email: 'aisha@lightacademy.ac.ke', phone: '+254744444444', teamName: 'Light Explorers', memberCount: 4, ageRange: '6-10', experience: 'Beginner', competitionTrack: 'explore', hasEquipment: 'no', coachName: 'Mr. Hassan Osman', coachEmail: 'hassan@lightacademy.ac.ke', notes: 'First-time participants. Very enthusiastic!', eventId: 'evt-s2-regional', status: 'reviewed', followUpDate: '2025-04-25', followUpNotes: 'Need starter kit. Requesting sponsor support.', registeredAt: '2025-02-15T07:00:00Z', updatedAt: '2025-03-05T13:00:00Z' },
    { id: 'TM-005', schoolName: 'Kampala International', city: 'Kampala', county: 'N/A', contactPerson: 'Dr. Grace Nambi', email: 'grace@kis.ac.ug', phone: '+256755555555', teamName: 'KIS Robotics', memberCount: 5, ageRange: '11-14', experience: 'Intermediate', competitionTrack: 'innovators', hasEquipment: 'yes', coachName: 'Mr. Brian Okello', coachEmail: 'brian@kis.ac.ug', notes: 'First international team from Uganda!', eventId: 'evt-s2-regional', status: 'approved', followUpDate: '', followUpNotes: 'Travel logistics arranged. Accommodation confirmed.', registeredAt: '2025-02-20T12:00:00Z', updatedAt: '2025-03-18T10:00:00Z' },
    { id: 'TM-006', schoolName: 'Makini Schools', city: 'Nairobi', county: 'Nairobi', contactPerson: 'Mrs. Faith Muthoni', email: 'faith@makini.ac.ke', phone: '+254766666666', teamName: 'Makini Builders', memberCount: 3, ageRange: '6-10', experience: 'Beginner', competitionTrack: 'explore', hasEquipment: 'no', coachName: 'Ms. Catherine Wangari', coachEmail: 'catherine@makini.ac.ke', notes: 'Small but dedicated team.', eventId: '', status: 'new', followUpDate: '', followUpNotes: '', registeredAt: '2025-03-20T11:00:00Z', updatedAt: '2025-03-20T11:00:00Z' },
    { id: 'TM-007', schoolName: "St. Mary's School", city: 'Nairobi', county: 'Nairobi', contactPerson: 'Sr. Margaret Nyaga', email: 'margaret@stmarys.ac.ke', phone: '+254777777777', teamName: "St. Mary's Coders", memberCount: 4, ageRange: '11-14', experience: 'Beginner', competitionTrack: 'innovators', hasEquipment: 'partial', coachName: 'Mr. James Karanja', coachEmail: 'james@stmarys.ac.ke', notes: 'Need programming training support.', eventId: '', status: 'new', followUpDate: '', followUpNotes: '', registeredAt: '2025-03-22T09:00:00Z', updatedAt: '2025-03-22T09:00:00Z' },
    { id: 'TM-008', schoolName: 'Mombasa Academy', city: 'Mombasa', county: 'Mombasa', contactPerson: 'Mr. Ali Bakari', email: 'ali@mombasaacademy.ac.ke', phone: '+254788888888', teamName: 'Coast Champions', memberCount: 5, ageRange: '15-18', experience: 'Intermediate - 1 season', competitionTrack: 'challengers', hasEquipment: 'yes', coachName: 'Ms. Halima Juma', coachEmail: 'halima@mombasaacademy.ac.ke', notes: 'Strong mechanical skills. Focus on AI this season.', eventId: 'evt-s2-regional', status: 'approved', followUpDate: '', followUpNotes: '', registeredAt: '2025-02-28T14:00:00Z', updatedAt: '2025-03-15T09:00:00Z' },
  ],
}

export const APIRoute = createAPIFileRoute('/api/seed')({
  POST: async () => {
    try {
      const contentStore = getStore({ name: 'content-store', consistency: 'strong' })
      const registrationStore = getStore({ name: 'registrations', consistency: 'strong' })

      // Seed content modules
      const contentModules = Object.keys(SEED_DATA)
      for (const moduleName of contentModules) {
        await contentStore.setJSON(moduleName, SEED_DATA[moduleName])
      }

      // Seed registrations
      for (const [key, data] of Object.entries(REGISTRATION_SEED_DATA)) {
        await registrationStore.setJSON(key, data)
      }

      return json({
        success: true,
        message: 'Database seeded successfully',
        seeded: {
          contentModules: contentModules.length,
          registrationTypes: Object.keys(REGISTRATION_SEED_DATA).length,
          totalRecords: contentModules.reduce((sum, key) => sum + (SEED_DATA[key] as unknown[]).length, 0) +
            Object.values(REGISTRATION_SEED_DATA).reduce((sum, arr) => sum + arr.length, 0),
        },
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Seed failed'
      return json({ error: message }, { status: 500 })
    }
  },

  GET: async () => {
    return json({
      info: 'POST to this endpoint to seed the database with initial data',
      modules: Object.keys(SEED_DATA),
      registrations: Object.keys(REGISTRATION_SEED_DATA),
    })
  },
})

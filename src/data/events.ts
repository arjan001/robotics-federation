export interface EventData {
  id: string
  name: string
  date: string
  location: string
  status: 'past' | 'current' | 'upcoming'
  description: string
  winners?: Winner[]
  teamsParticipated?: number
  highlights?: string[]
}

export interface Winner {
  team: string
  school: string
  award: string
  track: string
}

export const events: EventData[] = [
  {
    id: 'federation-launch',
    name: 'Robotics Federation of Kenya — Official Launch',
    date: '2024-03-15',
    location: 'Nairobi, Kenya',
    status: 'past',
    description:
      'The official launch of the Robotics Federation of Kenya brought together educators, government officials, corporate partners, and competition organizers to establish a unified national body for STEM and robotics coordination.',
    highlights: [
      'Official establishment of the Federation',
      'Endorsement by the Ministry of Education',
      'Partnership agreements signed with Inspire Robotics Challenge and Stemtrix EA',
      'National roadmap for STEM education presented',
    ],
  },
  {
    id: 'national-robotics-day-2024',
    name: 'National Robotics & STEM Day 2024',
    date: '2024-06-22',
    location: 'Nairobi, Kenya',
    status: 'past',
    description:
      'The first-ever National Robotics & STEM Day, organized by the Federation in partnership with the Ministry of Education. Schools showcased student projects, competitions were held across age groups, and policy roundtables addressed curriculum integration.',
    teamsParticipated: 85,
    winners: [
      { team: 'RoboLions', school: 'Brookhouse School', award: 'Best Overall Project', track: 'Showcase' },
      { team: 'TechTitans', school: 'Aga Khan Schools', award: 'Innovation Award', track: 'Showcase' },
      { team: 'AlphaBot', school: 'Premier Academy', award: 'Best Technical Design', track: 'Competition' },
    ],
    highlights: [
      '85 teams from 40+ schools participated',
      'Guest address by the Cabinet Secretary for Education',
      'Live-streamed to over 2,000 viewers',
      'Partnership announcements with Safaricom Foundation',
    ],
  },
  {
    id: 'teacher-training-cohort-1',
    name: 'National Teacher Training — Cohort 1',
    date: '2024-09-10',
    location: 'Multiple venues across Kenya',
    status: 'past',
    description:
      'The Federation\'s first national teacher training program certified 120 educators from Nairobi, Mombasa, and Kisumu in robotics pedagogy, equipment handling, and competition coaching.',
    highlights: [
      '120 teachers certified across 3 cities',
      'Curriculum materials distributed to all participating schools',
      'Follow-up mentorship program launched',
    ],
  },
  {
    id: 'inspire-season-2-championship',
    name: 'Inspire Robotics Challenge — Season 2 National Championship',
    date: '2025-07-12',
    location: 'Nairobi, Kenya',
    status: 'current',
    description:
      'The Federation-sanctioned national championship for the Inspire Robotics Challenge Season 2. Top qualifying teams from across Kenya compete for national titles across three age-based tracks.',
    teamsParticipated: 64,
    highlights: [
      'First Federation-sanctioned national championship',
      'Teams from 8 counties represented',
      'New standardized judging criteria implemented',
      'Live broadcast partnership with Nation Media Group',
    ],
  },
  {
    id: 'county-expansion-2025',
    name: 'County Expansion Program — Phase 2',
    date: '2025-09-01',
    location: 'Nakuru, Eldoret, Meru, Nyeri',
    status: 'upcoming',
    description:
      'The Federation expands its school onboarding and teacher training programs to four additional counties, working with local education offices and community organizations.',
    highlights: [
      'Target: 50 new schools onboarded',
      'Teacher training for 200+ educators',
      'Equipment provision through partner donations',
      'Regional competition circuits established',
    ],
  },
  {
    id: 'national-stem-summit-2026',
    name: 'National STEM & Robotics Summit 2026',
    date: '2026-03-20',
    location: 'Nairobi, Kenya',
    status: 'upcoming',
    description:
      'The Federation\'s annual summit bringing together all stakeholders — schools, government, industry, and international partners — to review progress, share best practices, and set priorities for the year ahead.',
    highlights: [
      'Annual review of national STEM progress',
      'International speakers and observers invited',
      'Student showcase and innovation fair',
      'Policy recommendations for the Ministry of Education',
    ],
  },
  {
    id: 'national-robotics-day-2026',
    name: 'National Robotics & STEM Day 2026',
    date: '2026-06-20',
    location: 'Multiple cities across Kenya',
    status: 'upcoming',
    description:
      'The third annual National Robotics & STEM Day, expanded to simultaneous events in multiple cities. The largest celebration of student STEM achievement in Kenya.',
    highlights: [
      'Simultaneous events in 5+ cities',
      'Expected 200+ teams participating',
      'Industry partnership showcase',
      'New AI & Machine Learning student track',
    ],
  },
]

export const nextEvent = events.find((e) => e.status === 'upcoming') ?? events[events.length - 1]

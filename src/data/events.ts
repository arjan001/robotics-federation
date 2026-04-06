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
    id: 'season-1-kickoff',
    name: 'Season 1 Kickoff – Inspire Robotics Challenge',
    date: '2024-01-20',
    location: 'Nairobi, Kenya',
    status: 'past',
    description:
      'The inaugural season kickoff brought together 24 teams from across Nairobi for the first-ever Inspire Robotics Challenge. Students were introduced to the competition framework, received starter kits, and began their engineering journey.',
    teamsParticipated: 24,
    highlights: [
      'First-ever Inspire Robotics Challenge event',
      '24 teams from 12 schools participated',
      'Starter kits distributed to all teams',
      'Mentorship program launched',
    ],
  },
  {
    id: 'season-1-regional',
    name: 'Season 1 Regional Qualifier',
    date: '2024-04-13',
    location: 'Nairobi, Kenya',
    status: 'past',
    description:
      'Regional qualifiers saw teams compete across all three tracks. The Explore track featured creative robot showcases, Innovators tackled agricultural automation, and Challengers competed in alliance-based matches.',
    teamsParticipated: 20,
    winners: [
      { team: 'RoboLions', school: 'Brookhouse School', award: 'Champion – Explore', track: 'Explore' },
      { team: 'TechTitans', school: 'Aga Khan Schools', award: 'Champion – Innovators', track: 'Innovators' },
      { team: 'CircuitBreakers', school: 'International School of Kenya', award: 'Champion – Challengers', track: 'Challengers' },
    ],
    highlights: [
      'First competitive matches in Inspire history',
      'Live-streamed to over 500 viewers',
      'Guest judges from local tech industry',
    ],
  },
  {
    id: 'season-1-championship',
    name: 'Season 1 National Championship',
    date: '2024-07-06',
    location: 'Nairobi, Kenya',
    status: 'past',
    description:
      'The Season 1 National Championship was a landmark event for STEM education in Kenya. Top qualifying teams competed for national titles, with the event attracting significant media attention and industry partnerships.',
    teamsParticipated: 16,
    winners: [
      { team: 'RoboLions', school: 'Brookhouse School', award: 'National Champion – Explore', track: 'Explore' },
      { team: 'InnoMinds', school: 'Braeburn Schools', award: 'National Champion – Innovators', track: 'Innovators' },
      { team: 'AlphaBot', school: 'Premier Academy', award: 'National Champion – Challengers', track: 'Challengers' },
      { team: 'TechTitans', school: 'Aga Khan Schools', award: 'Innovation Award', track: 'Innovators' },
      { team: 'GearHeads', school: 'International School of Kenya', award: "Judges' Award", track: 'Challengers' },
    ],
    highlights: [
      'Over 1,000 attendees',
      'Partnership with Kenya Ministry of Education announced',
      'Media coverage from national outlets',
      'Scholarship prizes awarded to top performers',
    ],
  },
  {
    id: 'season-2-kickoff',
    name: 'Season 2 Kickoff – "Building Tomorrow"',
    date: '2025-01-18',
    location: 'Nairobi, Kenya',
    status: 'past',
    description:
      'Season 2 launched with the theme "Building Tomorrow," expanding to include teams from regional cities. New challenge missions focused on sustainable development and smart city solutions.',
    teamsParticipated: 36,
    highlights: [
      'Expanded to 36 teams from 18 schools',
      'Teams from Molo and other regions joined',
      'New sustainable development challenge theme',
      'Advanced robotics kits introduced for Challengers',
    ],
  },
  {
    id: 'season-2-regional',
    name: 'Season 2 Regional Qualifiers',
    date: '2025-04-26',
    location: 'Multiple venues across Kenya',
    status: 'current',
    description:
      'The current season\'s regional qualifiers are underway, with events hosted in Nairobi and regional venues. Teams are competing for spots in the upcoming National Championship.',
    teamsParticipated: 32,
    highlights: [
      'First multi-city simultaneous qualifier events',
      'Live scoring dashboard available online',
      'Expanded volunteer mentor network',
    ],
  },
  {
    id: 'season-2-championship',
    name: 'Season 2 National Championship',
    date: '2025-07-12',
    location: 'Nairobi, Kenya',
    status: 'upcoming',
    description:
      'The Season 2 National Championship will bring together the top teams from across Kenya for the biggest Inspire Robotics Challenge event yet. New awards categories and expanded scholarship prizes.',
    highlights: [
      'Expected 2,000+ attendees',
      'International observer teams invited',
      'New "Community Impact" award category',
      'Live broadcast partnership',
    ],
  },
  {
    id: 'season-3-kickoff',
    name: 'Season 3 Kickoff',
    date: '2026-01-17',
    location: 'TBA – Multiple cities across Kenya',
    status: 'upcoming',
    description:
      'Season 3 will expand the Inspire Robotics Challenge to additional regions across Kenya, with plans to reach more schools and communities nationwide.',
    highlights: [
      'Nationwide expansion planned',
      'New AI & Machine Learning challenge track',
      'Industry partnership program launch',
    ],
  },
]

export const nextEvent = events.find((e) => e.status === 'upcoming') ?? events[events.length - 1]

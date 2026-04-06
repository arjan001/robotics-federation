export interface School {
  id: string
  name: string
  city: string
  since: string
  teams: number
  achievements: string[]
}

export interface Partner {
  id: string
  name: string
  type: 'sponsor' | 'technology' | 'educational' | 'media'
  description: string
  contribution: string
}

export interface Organizer {
  id: string
  name: string
  role: string
  bio: string
}

export const schools: School[] = [
  {
    id: 'brookhouse',
    name: 'Brookhouse School',
    city: 'Nairobi',
    since: '2021',
    teams: 4,
    achievements: ['Season 1 Explore Champion', 'Most Teams Fielded Award'],
  },
  {
    id: 'aga-khan',
    name: 'Aga Khan Schools',
    city: 'Nairobi',
    since: '2020',
    teams: 3,
    achievements: ['Innovation Award', 'Best Rookie Team'],
  },
  {
    id: 'isk',
    name: 'International School of Kenya',
    city: 'Nairobi',
    since: '2022',
    teams: 3,
    achievements: ['Challengers Champion', "Judges' Award"],
  },
  {
    id: 'braeburn',
    name: 'Braeburn Schools',
    city: 'Nairobi',
    since: '2023',
    teams: 3,
    achievements: ['Innovators National Champion'],
  },
  {
    id: 'braeside',
    name: 'Braeside School',
    city: 'Nairobi',
    since: '2023',
    teams: 2,
    achievements: ['Best Engineering Notebook'],
  },
  {
    id: 'sabis',
    name: 'SABIS School',
    city: 'Nairobi',
    since: '2023',
    teams: 2,
    achievements: ['Most Improved Team'],
  },
  {
    id: 'st-andrews-turi',
    name: "St. Andrew's School Turi",
    city: 'Molo',
    since: '2022',
    teams: 2,
    achievements: ['Regional Expansion Pioneer'],
  },
  {
    id: 'potterhouse',
    name: 'Potterhouse School',
    city: 'Nairobi',
    since: '2021',
    teams: 3,
    achievements: ['Community Outreach Award'],
  },
  {
    id: 'brookside',
    name: 'Brookside Academy',
    city: 'Nairobi',
    since: '2023',
    teams: 2,
    achievements: ['Best Presentation Award'],
  },
  {
    id: 'oshwal',
    name: 'Oshwal Academy',
    city: 'Nairobi',
    since: '2022',
    teams: 3,
    achievements: ['Largest School Delegation'],
  },
  {
    id: 'hollycross',
    name: 'Hollycross School',
    city: 'Nairobi',
    since: '2024',
    teams: 2,
    achievements: [],
  },
  {
    id: 'merishaw',
    name: 'Merishaw School',
    city: 'Nairobi',
    since: '2024',
    teams: 1,
    achievements: [],
  },
  {
    id: 'premier-academy',
    name: 'Premier Academy',
    city: 'Nairobi',
    since: '2021',
    teams: 3,
    achievements: ['Challengers National Champion'],
  },
  {
    id: 'woodcreek',
    name: 'Woodcreek School',
    city: 'Nairobi',
    since: '2024',
    teams: 1,
    achievements: [],
  },
  {
    id: 'cgh',
    name: 'CGH School',
    city: 'Nairobi',
    since: '2024',
    teams: 1,
    achievements: [],
  },
]

export const partners: Partner[] = [
  {
    id: 'stemtrix',
    name: 'Stemtrix EA',
    type: 'educational',
    description:
      'The founding organization behind the Inspire Robotics Challenge, dedicated to advancing STEM education across East Africa.',
    contribution: 'Primary organizer, curriculum development, and program management',
  },
  {
    id: 'safaricom-foundation',
    name: 'Safaricom Foundation',
    type: 'sponsor',
    description:
      'Corporate social responsibility arm supporting STEM education initiatives across Kenya and East Africa.',
    contribution: 'Financial sponsorship, connectivity solutions, and scholarship funding',
  },
  {
    id: 'kenya-robotics',
    name: 'Kenya Robotics Society',
    type: 'technology',
    description:
      'Leading robotics community in Kenya providing competition kits, spare parts, and technical training for teams.',
    contribution: 'Robotics kits, spare parts supply, and technical workshops',
  },
  {
    id: 'ministry-education',
    name: 'Ministry of Education – Kenya',
    type: 'educational',
    description:
      'Government partner supporting the integration of robotics education into the national curriculum framework.',
    contribution: 'Policy support, school outreach, and official endorsement',
  },
  {
    id: 'nation-media',
    name: 'Nation Media Group',
    type: 'media',
    description:
      'Leading media partner providing coverage, live streaming, and public awareness for competition events across Kenya.',
    contribution: 'Event coverage, live streaming, and promotional campaigns',
  },
  {
    id: 'ieee-kenya',
    name: 'IEEE Kenya Section',
    type: 'educational',
    description:
      'Professional engineering society providing volunteer judges, mentors, and technical standards guidance.',
    contribution: 'Volunteer judges, mentorship network, and engineering standards',
  },
  {
    id: 'equity-foundation',
    name: 'Equity Foundation',
    type: 'sponsor',
    description:
      'Supporting access to STEM education for students from underserved communities through scholarships and sponsorships.',
    contribution: 'Student scholarships, team sponsorships, and financial literacy workshops',
  },
  {
    id: 'global-stem-alliance',
    name: 'Global STEM Alliance',
    type: 'sponsor',
    description:
      'International non-profit supporting STEM competitions worldwide with resources and global networking.',
    contribution: 'International competition pathway, curriculum resources, and global networking',
  },
]

export const organizers: Organizer[] = [
  {
    id: 'founder',
    name: 'James Ochieng',
    role: 'Founder & Executive Director',
    bio: 'James founded Stemtrix EA with a vision to make robotics education accessible to every student in East Africa. With a background in electrical engineering and education technology, he leads the strategic direction of the Inspire Robotics Challenge.',
  },
  {
    id: 'programs-director',
    name: 'Amina Wanjiku',
    role: 'Director of Programs',
    bio: 'Amina oversees all competition programs, from curriculum design to event execution. Her experience in educational program management ensures each season delivers meaningful learning outcomes for participants.',
  },
  {
    id: 'tech-lead',
    name: 'Kevin Mwangi',
    role: 'Technical Director',
    bio: 'Kevin manages the technical infrastructure of the competition, including robot kit specifications, scoring systems, and field design. He brings expertise from his work in automation engineering.',
  },
  {
    id: 'partnerships',
    name: 'Grace Njeri',
    role: 'Director of Partnerships',
    bio: "Hiwot builds and maintains relationships with schools, sponsors, and government bodies. Her network across the education and technology sectors has been instrumental in the competition's growth.",
  },
  {
    id: 'outreach',
    name: 'Brian Kiprop',
    role: 'Community Outreach Manager',
    bio: 'Brian leads volunteer recruitment, school outreach, and community engagement initiatives. He works to ensure the competition reaches underserved communities and promotes diversity in STEM.',
  },
  {
    id: 'events',
    name: 'Faith Muthoni',
    role: 'Events Coordinator',
    bio: 'Faith manages all event logistics from venue selection to day-of operations. Her attention to detail ensures smooth competition experiences for teams, volunteers, and spectators.',
  },
]

export const stats = {
  schoolsReached: 15,
  studentsReached: 10000,
  satisfactionRate: 95,
  robotsBuilt: 120,
  awardsWon: 45,
  studentsImpacted: 10000,
  volunteersEngaged: 85,
  citiesReached: 3,
}

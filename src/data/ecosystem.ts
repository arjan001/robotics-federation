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
    achievements: ['National Robotics Champion 2024', 'Most Teams Fielded Award'],
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
    achievements: ['Advanced Track Champion', "Judges' Award"],
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
    achievements: ['Advanced Track National Champion'],
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
    id: 'inspire-robotics',
    name: 'Inspire Robotics Challenge',
    type: 'educational',
    description:
      'Kenya\'s premier student robotics competition platform, running multi-track competitions for students ages 6-18 across the country.',
    contribution: 'National competition management, team coaching, and event hosting',
  },
  {
    id: 'stemtrix',
    name: 'Stemtrix East Africa',
    type: 'educational',
    description:
      'A founding partner of the Federation, delivering STEM curriculum development, teacher training, and robotics equipment to schools across East Africa.',
    contribution: 'Curriculum development, teacher training, and equipment supply',
  },
  {
    id: 'safaricom-foundation',
    name: 'Safaricom Foundation',
    type: 'sponsor',
    description:
      'Corporate social responsibility arm supporting STEM education initiatives and digital literacy across Kenya.',
    contribution: 'Financial sponsorship, connectivity solutions, and scholarship funding',
  },
  {
    id: 'kenya-robotics',
    name: 'Kenya Robotics Society',
    type: 'technology',
    description:
      'Leading robotics community in Kenya providing competition kits, spare parts, and technical training for school teams.',
    contribution: 'Robotics kits, technical workshops, and mentorship network',
  },
  {
    id: 'ministry-education',
    name: 'Ministry of Education – Kenya',
    type: 'educational',
    description:
      'Government partner supporting the integration of robotics and STEM education into the national Competency-Based Curriculum framework.',
    contribution: 'Policy support, school outreach, and official endorsement',
  },
  {
    id: 'nation-media',
    name: 'Nation Media Group',
    type: 'media',
    description:
      'Leading media partner providing coverage, live streaming, and public awareness for Federation events and competitions across Kenya.',
    contribution: 'Event coverage, live streaming, and promotional campaigns',
  },
  {
    id: 'ieee-kenya',
    name: 'IEEE Kenya Section',
    type: 'educational',
    description:
      'Professional engineering society providing volunteer judges, mentors, and technical standards guidance for competitions.',
    contribution: 'Volunteer judges, mentorship network, and engineering standards',
  },
  {
    id: 'equity-foundation',
    name: 'Equity Foundation',
    type: 'sponsor',
    description:
      'Supporting access to STEM education for students from underserved communities through scholarships and school sponsorships.',
    contribution: 'Student scholarships, team sponsorships, and financial literacy workshops',
  },
]

export const organizers: Organizer[] = [
  {
    id: 'chairman',
    name: 'Dr. Peter Kagwe',
    role: 'Chairman',
    bio: 'Dr. Kagwe brings over two decades of experience in education policy and technology advocacy. He leads the Federation\'s strategic direction and government liaison efforts, ensuring STEM education remains a national priority.',
  },
  {
    id: 'executive-director',
    name: 'James Ochieng',
    role: 'Executive Director',
    bio: 'James oversees the Federation\'s day-to-day operations, coordinating between partner organizations, schools, and government bodies. His background in electrical engineering and education technology drives the Federation\'s practical approach to STEM integration.',
  },
  {
    id: 'programs-director',
    name: 'Amina Wanjiku',
    role: 'Director of Programs',
    bio: 'Amina manages all Federation programs from curriculum standards to competition sanctioning. Her experience in educational program management ensures consistent quality and measurable outcomes across all affiliated activities.',
  },
  {
    id: 'partnerships',
    name: 'Grace Njeri',
    role: 'Director of Partnerships',
    bio: 'Grace builds and maintains relationships with schools, sponsors, government bodies, and international organizations. Her network across education and technology sectors has been instrumental in the Federation\'s growth.',
  },
  {
    id: 'outreach',
    name: 'Brian Kiprop',
    role: 'Regional Coordinator',
    bio: 'Brian leads county-level outreach, volunteer coordination, and community engagement. He works to ensure Federation programs reach underserved communities and promote diversity in STEM participation.',
  },
  {
    id: 'events',
    name: 'Faith Muthoni',
    role: 'Events & Competitions Manager',
    bio: 'Faith manages the Federation\'s event calendar, competition standards, and venue coordination. She ensures that all sanctioned events meet national quality standards and deliver positive experiences for participants.',
  },
]

export const stats = {
  schoolsReached: 200,
  studentsReached: 50000,
  satisfactionRate: 95,
  robotsBuilt: 500,
  awardsWon: 120,
  studentsImpacted: 50000,
  volunteersEngaged: 300,
  citiesReached: 15,
}

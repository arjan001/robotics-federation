export type CaseStudy = {
  id: string
  title: string
  category: string
  summary: string
  challenge: string
  solution: string
  outcomes: string[]
  accent: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'school-robotics-integration',
    title: 'School Robotics Integration',
    category: 'Curriculum Development',
    summary:
      'A Federation-led initiative to integrate robotics modules into the Competency-Based Curriculum across 40 pilot schools in Nairobi County.',
    challenge:
      'Schools lacked standardized robotics curriculum, trained teachers, and affordable equipment to introduce robotics as part of the CBC framework.',
    solution:
      'Developed modular robotics curriculum aligned to CBC learning outcomes, trained 60 teachers, and partnered with equipment suppliers for subsidized kits.',
    outcomes: [
      '40 schools successfully integrated robotics into their CBC programs',
      'Student engagement in STEM subjects increased by 45%',
      '60 teachers certified in robotics pedagogy',
    ],
    accent: '#1d4ed8',
  },
  {
    id: 'robotics-bootcamp-network',
    title: 'National Bootcamp Network',
    category: 'Hands-On STEM Programs',
    summary:
      'A multi-city robotics bootcamp program delivered through partner organizations Inspire Robotics Challenge and Stemtrix EA.',
    challenge:
      'Schools outside Nairobi had limited access to practical robotics training and competition preparation support.',
    solution:
      'Established regional bootcamp hubs in 5 cities, with standardized curriculum, reusable equipment stations, and trained local mentors.',
    outcomes: [
      '5-city deployment reaching 42 schools in one season',
      'Student retention in STEM clubs increased to 88%',
      'Regional competition participation grew by 120%',
    ],
    accent: '#1e40af',
  },
  {
    id: 'teacher-training-program',
    title: 'Teacher Training Program',
    category: 'Capacity Building',
    summary:
      'The Federation\'s flagship teacher certification program preparing educators to deliver robotics and STEM instruction effectively.',
    challenge:
      'Most teachers had no formal training in robotics, coding, or hands-on STEM pedagogy, limiting the quality of school programs.',
    solution:
      'Created a 3-tier certification program (Foundation, Practitioner, Master) with online modules, practical workshops, and classroom mentorship.',
    outcomes: [
      '300+ teachers enrolled in the first year',
      'Teacher confidence in STEM instruction improved by 67%',
      'Certified teachers launched robotics clubs in 85% of their schools',
    ],
    accent: '#3b82f6',
  },
  {
    id: 'county-expansion-initiative',
    title: 'County Expansion Initiative',
    category: 'Regional Access',
    summary:
      'A phased approach to extending Federation programs from Nairobi to counties across Kenya, prioritizing underserved areas.',
    challenge:
      'STEM and robotics activities were heavily concentrated in Nairobi, leaving students in other counties without access to programs or competitions.',
    solution:
      'Appointed county coordinators, established partnerships with local education offices, and provided seed equipment and training to pioneer schools.',
    outcomes: [
      'Programs expanded from 1 to 15 counties',
      '50 new schools onboarded in underserved areas',
      'Regional competition circuits established in 3 zones',
    ],
    accent: '#1d4ed8',
  },
  {
    id: 'inclusive-stem-pathways',
    title: 'Inclusive STEM Pathways',
    category: 'Equity & Access',
    summary:
      'A Federation program expanding robotics and coding opportunities for girls, students with disabilities, and learners from low-income communities.',
    challenge:
      'Participation gaps remained high among girls and students from rural and low-income backgrounds despite growing STEM programs.',
    solution:
      'Launched targeted outreach, scholarship programs, accessible equipment, and peer-led showcase events in underserved communities.',
    outcomes: [
      'Female participation in robotics programs increased by 110%',
      'Rural school participation expanded from 6 to 30 campuses',
      'Scholarship recipients grew by 46% year over year',
    ],
    accent: '#1e40af',
  },
]

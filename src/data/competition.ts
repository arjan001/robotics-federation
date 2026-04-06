export interface CompetitionTrack {
  id: string
  name: string
  tagline: string
  ageRange: string
  description: string
  color: string
  icon: string
  missions: string[]
  rubric: RubricCategory[]
}

export interface RubricCategory {
  name: string
  maxPoints: number
  criteria: string[]
}

export const competitionTracks: CompetitionTrack[] = [
  {
    id: 'explore',
    name: 'Explore',
    tagline: 'Discover the World of Robotics',
    ageRange: 'Ages 6–10',
    description:
      'The Explore track introduces young learners to the fundamentals of robotics and programming through hands-on building and creative play. Teams work together to build simple machines and tell stories through their robot models.',
    color: '#c24b3b',
    icon: '🔍',
    missions: [
      'Build a robot that can navigate a simple maze',
      'Create a model that demonstrates a real-world machine',
      'Design a robot helper for your school or community',
      'Program a robot to perform a choreographed dance',
    ],
    rubric: [
      {
        name: 'Robot Design',
        maxPoints: 25,
        criteria: [
          'Structural integrity and durability',
          'Creative use of building materials',
          'Functional moving parts',
        ],
      },
      {
        name: 'Programming',
        maxPoints: 25,
        criteria: [
          'Basic movement commands',
          'Use of sensors',
          'Sequential logic',
        ],
      },
      {
        name: 'Teamwork',
        maxPoints: 25,
        criteria: [
          'Equal participation from all members',
          'Communication and collaboration',
          'Presentation skills',
        ],
      },
      {
        name: 'Innovation',
        maxPoints: 25,
        criteria: [
          'Original problem-solving approach',
          'Creative thinking',
          'Connection to real-world applications',
        ],
      },
    ],
  },
  {
    id: 'innovators',
    name: 'Innovators',
    tagline: 'Engineer Solutions That Matter',
    ageRange: 'Ages 11–14',
    description:
      'The Innovators track challenges students to identify real-world problems and engineer robotic solutions. Teams research, design, build, and program autonomous robots while developing core STEM skills and presenting their innovations.',
    color: '#a33830',
    icon: '💡',
    missions: [
      'Design an autonomous robot for agricultural assistance',
      'Build a sorting robot for waste management',
      'Create a robot that assists people with disabilities',
      'Engineer a search-and-rescue robot prototype',
    ],
    rubric: [
      {
        name: 'Robot Performance',
        maxPoints: 30,
        criteria: [
          'Completion of mission objectives',
          'Consistency and reliability',
          'Speed and efficiency',
          'Autonomous navigation',
        ],
      },
      {
        name: 'Engineering Design',
        maxPoints: 25,
        criteria: [
          'Mechanical design and build quality',
          'Sensor integration',
          'Iterative design process documented',
        ],
      },
      {
        name: 'Innovation Project',
        maxPoints: 25,
        criteria: [
          'Problem identification and research',
          'Solution creativity and feasibility',
          'Community impact potential',
        ],
      },
      {
        name: 'Core Values',
        maxPoints: 20,
        criteria: [
          'Gracious professionalism',
          'Team collaboration',
          'Mentorship and outreach',
        ],
      },
    ],
  },
  {
    id: 'challengers',
    name: 'Challengers',
    tagline: 'Push the Boundaries of Innovation',
    ageRange: 'Ages 15–18',
    description:
      'The Challengers track is the pinnacle of the Inspire Robotics Challenge. High school teams design, build, and program advanced robots to compete in strategic alliance-based matches while demonstrating leadership, entrepreneurship, and engineering excellence.',
    color: '#8b2e26',
    icon: '🏆',
    missions: [
      'Build a robot capable of autonomous and driver-controlled operations',
      'Complete strategic game objectives in alliance matches',
      'Design and implement computer vision for object detection',
      'Develop a business plan and secure team sponsorships',
    ],
    rubric: [
      {
        name: 'Robot Performance',
        maxPoints: 35,
        criteria: [
          'Match performance and consistency',
          'Autonomous period scoring',
          'Driver-controlled precision',
          'Strategic alliance play',
        ],
      },
      {
        name: 'Engineering Excellence',
        maxPoints: 25,
        criteria: [
          'CAD design and documentation',
          'Advanced programming techniques',
          'Custom fabrication quality',
          'Testing and iteration evidence',
        ],
      },
      {
        name: 'Innovation & Entrepreneurship',
        maxPoints: 20,
        criteria: [
          'Business plan and sustainability',
          'Community outreach impact',
          'Technical documentation',
        ],
      },
      {
        name: 'Judges Interview',
        maxPoints: 20,
        criteria: [
          'Technical knowledge depth',
          'Team organization and roles',
          'Future vision and goals',
        ],
      },
    ],
  },
]

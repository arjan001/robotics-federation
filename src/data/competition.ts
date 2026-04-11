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
    id: 'discovery',
    name: 'Discovery',
    tagline: 'Introduction to Robotics & STEM',
    ageRange: 'Ages 6–10 (Lower Primary)',
    description:
      'The Discovery program introduces young learners to the fundamentals of robotics, coding, and scientific thinking through hands-on building and creative play. Aligned with the CBC framework for lower primary, students develop curiosity, teamwork, and basic engineering concepts.',
    color: '#c41e2a',
    icon: '🔍',
    missions: [
      'Build a simple machine that solves a classroom problem',
      'Program a robot to follow a path and complete a task',
      'Design a model that demonstrates a science concept',
      'Create a robot helper for your school or community',
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
    tagline: 'Engineering Solutions for Kenya',
    ageRange: 'Ages 11–14 (Upper Primary / Junior Secondary)',
    description:
      'The Innovators program challenges students to identify real problems in their communities and engineer robotic solutions. Teams research, design, build, and program autonomous robots while developing core STEM skills aligned with the CBC upper primary and junior secondary curriculum.',
    color: '#006b3f',
    icon: '💡',
    missions: [
      'Design an autonomous robot for agricultural assistance',
      'Build a sorting system for waste management',
      'Create a robot that assists people with disabilities',
      'Engineer a water quality monitoring prototype',
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
          'Teamwork and collaboration',
          'Community engagement',
          'Mentorship and peer learning',
        ],
      },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    tagline: 'Pushing the Boundaries of Innovation',
    ageRange: 'Ages 15–18 (Senior Secondary)',
    description:
      'The Advanced program is the highest level of Federation-sanctioned competition. Senior secondary teams design, build, and program complex robots for strategic alliance-based matches while demonstrating leadership, entrepreneurship, and engineering excellence. Top performers represent Kenya at international events.',
    color: '#172554',
    icon: '🏆',
    missions: [
      'Build a robot capable of autonomous and driver-controlled operations',
      'Complete strategic game objectives in alliance matches',
      'Implement computer vision for object detection and navigation',
      'Develop a sustainability plan for your school STEM program',
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
        name: 'Innovation & Leadership',
        maxPoints: 20,
        criteria: [
          'Program sustainability plan',
          'Community outreach impact',
          'Technical documentation quality',
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

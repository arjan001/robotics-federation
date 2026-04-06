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
    id: 'adaptive-math-labs',
    title: 'Adaptive Math Labs',
    category: 'K-12 Learning Systems',
    summary:
      'A district-wide intervention that used AI-driven lesson sequencing to improve confidence and completion in foundational mathematics.',
    challenge:
      'Schools had fragmented math performance data and no consistent way to personalize instruction at classroom scale.',
    solution:
      'Built a unified tutoring workflow with real-time skill diagnostics, weekly intervention sprints, and teacher coaching dashboards.',
    outcomes: [
      '31% improvement in assignment completion across pilot schools',
      'Average remediation cycle reduced from 5 weeks to 12 days',
      'Teacher planning time reduced by 6.5 hours per week',
    ],
    accent: '#c24b3b',
  },
  {
    id: 'robotics-bootcamp-network',
    title: 'Robotics Bootcamp Network',
    category: 'Hands-On STEM Programs',
    summary:
      'A multi-school robotics curriculum that paired low-cost hardware kits with challenge-based coding missions.',
    challenge:
      'Schools needed a practical robotics program that could run with limited lab equipment and mixed instructor experience.',
    solution:
      'Designed modular bootcamp tracks, reusable challenge stations, and a mentor toolkit with rubric-based progression.',
    outcomes: [
      '5-city deployment with 42 schools in one season',
      'Student retention in STEM clubs increased to 88%',
      'Mentor onboarding time reduced by 40%',
    ],
    accent: '#de6d5f',
  },
  {
    id: 'virtual-lab-classroom',
    title: 'Virtual Lab Classroom',
    category: 'AI + Hybrid Instruction',
    summary:
      'A blended learning environment combining simulation labs, AI guidance, and live teacher checkpoints.',
    challenge:
      'Remote learners lacked practical experimentation opportunities and often disengaged during theory-heavy sessions.',
    solution:
      'Launched browser-based simulations linked to milestone prompts and automated feedback loops before live review.',
    outcomes: [
      'Course completion rose from 62% to 84%',
      'Average lab attempt success improved by 27%',
      'Reduced student support tickets by 35%',
    ],
    accent: '#f28f82',
  },
  {
    id: 'teacher-ai-copilot',
    title: 'Teacher AI Copilot',
    category: 'Classroom Enablement',
    summary:
      'An educator copilot that generated lesson variations, formative quizzes, and intervention suggestions from class performance.',
    challenge:
      'Instructors spent significant time rewriting lesson plans for mixed-ability classrooms and tracking gaps manually.',
    solution:
      'Implemented a planning assistant with standards-aligned templates, auto-generated checkpoints, and insight reports.',
    outcomes: [
      'Lesson preparation time reduced by 52%',
      'Weekly formative assessment participation increased by 33%',
      'Improved pass rates in target modules by 19%',
    ],
    accent: '#c24b3b',
  },
  {
    id: 'inclusive-stem-pathways',
    title: 'Inclusive STEM Pathways',
    category: 'Equity-Focused Access',
    summary:
      'A community-centered program expanding robotics and coding pathways for underrepresented student groups.',
    challenge:
      'Participation gaps remained high in girls and rural cohorts despite baseline STEM initiatives.',
    solution:
      'Co-created local outreach cohorts, peer-led showcase events, and scholarship-triggered progression milestones.',
    outcomes: [
      'Female participation in robotics cohorts increased by 2.1x',
      'Rural school participation expanded from 6 to 19 campuses',
      'Scholarship conversions grew by 46% year over year',
    ],
    accent: '#de6d5f',
  },
]

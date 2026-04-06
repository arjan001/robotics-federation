import { caseStudies } from '@/data/caseStudies'
import { competitionTracks } from '@/data/competition'
import { events } from '@/data/events'
import { organizers, partners, schools, stats } from '@/data/ecosystem'

export type ContentModuleName =
  | 'home'
  | 'register'
  | 'events'
  | 'challenges'
  | 'about-content'
  | 'about-faqs'
  | 'case-studies'
  | 'partners'
  | 'organizers'
  | 'schools'
  | 'ecosystem'
  | 'footer'
  | 'users'
  | 'permissions'
  | 'categories'
  | 'settings'

export type ContentRecord = {
  id: string
  [key: string]: unknown
}

export type ContentStore = Record<ContentModuleName, ContentRecord[]>

const aboutFaqs = [
  {
    id: 'faq-join',
    question: 'How can a school join the Robotics Federation of Kenya?',
    answer:
      'Schools can register through our website or contact the Federation directly. We provide a structured onboarding process that includes needs assessment, program design, equipment guidance, teacher training, and connection to local competition circuits.',
  },
  {
    id: 'faq-experience',
    question: 'Do schools need existing STEM infrastructure to participate?',
    answer:
      'No. The Federation works with partner organizations like Stemtrix EA and Inspire Robotics Challenge to help schools start from scratch. We provide frameworks for setting up robotics clubs, sourcing equipment, and training teachers.',
  },
  {
    id: 'faq-outcomes',
    question: 'What outcomes does the Federation track?',
    answer:
      'We measure student enrollment in STEM programs, competition participation rates, teacher certification in robotics pedagogy, county-level coverage, and long-term career pathway tracking for participating students.',
  },
  {
    id: 'faq-partners',
    question: 'How can organizations partner with the Federation?',
    answer:
      'We welcome partnerships from technology companies, NGOs, educational institutions, and government bodies. Partners can support through funding, equipment donations, mentorship, curriculum development, or hosting regional events.',
  },
  {
    id: 'faq-cost',
    question: 'What is the cost for schools to participate?',
    answer:
      'Membership fees vary by school type and region. Scholarship programs and sponsor-backed entries are available for schools in underserved areas through our Inclusive STEM Pathways program.',
  },
  {
    id: 'faq-age',
    question: 'What age groups do Federation programs cover?',
    answer:
      'Federation programs cover students ages 6-18, aligned with the CBC framework: Discovery (6-10), Innovators (11-14), and Advanced (15-18).',
  },
  {
    id: 'faq-equipment',
    question: 'Do schools need their own robotics equipment?',
    answer:
      'Schools can use their own equipment or access subsidized kits through Federation partners. We also connect schools with equipment sharing programs and donated resources.',
  },
]

const categories = [
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
]

const users = [
  { id: 'user-admin', name: 'Admin User', email: 'admin@roboticsfederationkenya.org', role: 'Super Admin', status: 'Active' },
  { id: 'user-editor', name: 'Content Editor', email: 'editor@roboticsfederationkenya.org', role: 'Editor', status: 'Active' },
]

const permissions = [
  { id: 'perm-super-admin', role: 'Super Admin', scope: 'all', actions: ['view', 'create', 'edit', 'delete', 'publish', 'manage-users', 'manage-settings'] },
  { id: 'perm-editor', role: 'Editor', scope: 'content', actions: ['view', 'create', 'edit', 'publish'] },
  { id: 'perm-viewer', role: 'Viewer', scope: 'content', actions: ['view'] },
]

const settings = [
  {
    id: 'site',
    siteName: 'Robotics Federation of Kenya',
    organizationName: 'Robotics Federation of Kenya',
    siteTagline: 'The National Governing Body for Robotics & STEM Education',
    contactEmail: 'info@roboticsfederationkenya.org',
  },
]

const footer = [
  {
    id: 'footer-main',
    tagline: 'Advancing robotics and STEM education for every Kenyan learner.',
    copyright: '© 2026 Robotics Federation of Kenya. All rights reserved.',
    email: 'info@roboticsfederationkenya.org',
  },
]

const home = [
  {
    id: 'home-main',
    heroTitle: 'Robotics Federation of Kenya',
    heroSubtitle:
      'Uniting schools, organizations, and industry partners to build a robust STEM and robotics ecosystem that prepares every Kenyan learner for the future.',
    primaryCtaLabel: 'Learn About Our Mission',
    primaryCtaHref: '/about',
    secondaryCtaLabel: 'Get Involved',
    secondaryCtaHref: '/register',
  },
]

const register = [
  {
    id: 'register-main',
    title: 'Get Involved',
    subtitle: 'Register your school with the Federation or express interest as a partner organization.',
    teamTitle: 'School Registration',
    teamDescription: 'Register your school to join the Robotics Federation of Kenya and access STEM programs, competitions, and resources.',
    partnerTitle: 'Partner Interest',
    partnerDescription: 'Interested in partnering with or sponsoring the Robotics Federation of Kenya?',
  },
]

const aboutContent = [
  {
    id: 'about-main',
    title: 'The national body advancing robotics and STEM for every Kenyan learner.',
    subtitle:
      'The Robotics Federation of Kenya coordinates, standardizes, and grows the national ecosystem for robotics and STEM education — connecting government, schools, industry, and competition organizers under one unified framework.',
  },
]

const ecosystem = [
  ...schools.map((school) => ({ ...school, recordType: 'school' })),
  ...organizers.map((organizer) => ({ ...organizer, recordType: 'organizer' })),
  ...partners.map((partner) => ({ ...partner, recordType: 'partner' })),
  {
    id: 'ecosystem-stats',
    recordType: 'stats',
    ...stats,
  },
]

export const DEFAULT_CONTENT_STORE: ContentStore = {
  home,
  register,
  events: events as unknown as ContentRecord[],
  challenges: competitionTracks as unknown as ContentRecord[],
  'about-content': aboutContent,
  'about-faqs': aboutFaqs,
  'case-studies': caseStudies as unknown as ContentRecord[],
  partners: partners as unknown as ContentRecord[],
  organizers: organizers as unknown as ContentRecord[],
  schools: schools as unknown as ContentRecord[],
  ecosystem: ecosystem as ContentRecord[],
  footer,
  users,
  permissions,
  categories,
  settings,
}

export const CONTENT_MODULES: ContentModuleName[] = [
  'home',
  'register',
  'events',
  'challenges',
  'about-content',
  'about-faqs',
  'case-studies',
  'partners',
  'organizers',
  'schools',
  'ecosystem',
  'footer',
  'users',
  'permissions',
  'categories',
  'settings',
]

export function isContentModuleName(value: string): value is ContentModuleName {
  return CONTENT_MODULES.includes(value as ContentModuleName)
}

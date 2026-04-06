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
    question: 'How do students join Inspire Robotics programs?',
    answer:
      'Schools and independent teams register by track, complete onboarding, and receive challenge guides, calendars, and mentor matching before build sessions begin.',
  },
  {
    id: 'faq-experience',
    question: 'Do participants need prior robotics experience?',
    answer:
      'No. Tracks are age-appropriate and skill-staged. Students can start from basic exploration and progress into advanced strategy, automation, and programming challenges.',
  },
  {
    id: 'faq-outcomes',
    question: 'What outcomes are tracked across a season?',
    answer:
      'Programs track technical capability, teamwork, documentation quality, challenge completion, and presentation readiness so schools can measure growth beyond final scores.',
  },
  {
    id: 'faq-partners',
    question: 'How can schools or partners collaborate with Stemtrix EA?',
    answer:
      'Partners can support kits, mentoring, workshops, venue access, and scholarships. Schools can host qualifiers, open labs, and join multi-city season rollouts.',
  },
  {
    id: 'faq-cost',
    question: 'What is the cost to participate?',
    answer:
      'Registration fees vary by track and region. Scholarship programs and sponsor-backed entries are available for schools in underserved areas.',
  },
  {
    id: 'faq-age',
    question: 'What age groups can participate?',
    answer:
      'The competition is open to students ages 6-18, divided into three tracks: Explore (6-10), Innovators (11-14), and Challengers (15-18).',
  },
  {
    id: 'faq-equipment',
    question: 'Do teams need their own robotics equipment?',
    answer:
      'Teams can bring their own equipment or request starter kits. Schools partnered with Stemtrix EA often have shared lab resources available.',
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
  { id: 'user-admin', name: 'Admin User', email: 'admin@inspirerobotics.org', role: 'Super Admin', status: 'Active' },
  { id: 'user-editor', name: 'Content Editor', email: 'editor@inspirerobotics.org', role: 'Editor', status: 'Active' },
]

const permissions = [
  { id: 'perm-super-admin', role: 'Super Admin', scope: 'all', actions: ['view', 'create', 'edit', 'delete', 'publish', 'manage-users', 'manage-settings'] },
  { id: 'perm-editor', role: 'Editor', scope: 'content', actions: ['view', 'create', 'edit', 'publish'] },
  { id: 'perm-viewer', role: 'Viewer', scope: 'content', actions: ['view'] },
]

const settings = [
  {
    id: 'site',
    siteName: 'Inspire Robotics Challenge',
    organizationName: 'Stemtrix EA',
    siteTagline: "East Africa's Premier Robotics & AI Competition",
    contactEmail: 'hello@inspirerobotics.org',
  },
]

const footer = [
  {
    id: 'footer-main',
    tagline: 'Inspiring the next generation of African innovators through robotics and AI.',
    copyright: '© 2026 Inspire Robotics Challenge by Stemtrix EA. All rights reserved.',
    email: 'stemtrix@gmail.com',
  },
]

const home = [
  {
    id: 'home-main',
    heroTitle: 'Inspire Robotics Challenge',
    heroSubtitle:
      "East Africa's premier robotics and AI competition hub. Empowering young minds to build, innovate, and shape the future through technology.",
    primaryCtaLabel: 'Register Your Team',
    primaryCtaHref: '/register',
    secondaryCtaLabel: 'Explore Challenges',
    secondaryCtaHref: '/challenges',
  },
]

const register = [
  {
    id: 'register-main',
    title: 'Registration Hub',
    subtitle: 'Register your team for the competition or express interest as a partner.',
    teamTitle: 'Team Registration',
    teamDescription: 'Register your school team for the next season of the Inspire Robotics Challenge.',
    partnerTitle: 'Partner Interest',
    partnerDescription: 'Interested in sponsoring or partnering with the Inspire Robotics Challenge?',
  },
]

const aboutContent = [
  {
    id: 'about-main',
    title: 'Built for future innovators. Designed for measurable impact.',
    subtitle:
      'Stemtrix EA runs a competition-first learning ecosystem where students build real robotics skills, mentors shape team growth, and schools gain a structured path to future-ready STEM outcomes.',
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

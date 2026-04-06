import { getStore } from '@netlify/blobs'

export type RegistrationType = 'partner' | 'team'

export interface PartnerRegistration {
  id: string
  organizationName: string
  contactPerson: string
  email: string
  phone: string
  partnershipType: string
  website: string
  contribution: string
  status: 'new' | 'contacted' | 'in-progress' | 'confirmed' | 'declined'
  followUpDate: string
  followUpNotes: string
  registeredAt: string
  updatedAt: string
}

export interface TeamRegistration {
  id: string
  schoolName: string
  city: string
  county: string
  contactPerson: string
  email: string
  phone: string
  teamName: string
  memberCount: number
  ageRange: string
  experience: string
  competitionTrack: string
  hasEquipment: string
  coachName: string
  coachEmail: string
  notes: string
  status: 'new' | 'reviewed' | 'approved' | 'waitlisted' | 'declined'
  followUpDate: string
  followUpNotes: string
  eventId: string
  registeredAt: string
  updatedAt: string
}

export type Registration = PartnerRegistration | TeamRegistration

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getBlobStore() {
  return getStore('registrations')
}

function storeKey(type: RegistrationType): string {
  return `${type}-registrations`
}

function generateId(type: RegistrationType): string {
  const prefix = type === 'partner' ? 'PTR' : 'TM'
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${ts}-${rand}`
}

async function getAllRegistrations<T extends Registration>(type: RegistrationType): Promise<T[]> {
  const store = getBlobStore()
  const data = await store.get(storeKey(type), { type: 'json' }) as T[] | null
  return data ?? []
}

async function saveAllRegistrations<T extends Registration>(type: RegistrationType, records: T[]): Promise<void> {
  const store = getBlobStore()
  await store.setJSON(storeKey(type), records)
}

// ---------------------------------------------------------------------------
// CRUD Operations
// ---------------------------------------------------------------------------

export async function createRegistration<T extends Registration>(
  type: RegistrationType,
  data: Omit<T, 'id' | 'status' | 'followUpDate' | 'followUpNotes' | 'registeredAt' | 'updatedAt'>
): Promise<T> {
  const id = generateId(type)
  const now = new Date().toISOString()

  const record = {
    ...data,
    id,
    status: 'new',
    followUpDate: '',
    followUpNotes: '',
    registeredAt: now,
    updatedAt: now,
  } as unknown as T

  const records = await getAllRegistrations<T>(type)
  records.push(record)
  await saveAllRegistrations(type, records)

  return structuredClone(record)
}

export async function getRegistration<T extends Registration>(
  type: RegistrationType,
  id: string
): Promise<T | null> {
  const records = await getAllRegistrations<T>(type)
  return records.find((r) => r.id === id) ?? null
}

export async function listRegistrations<T extends Registration>(
  type: RegistrationType
): Promise<T[]> {
  const records = await getAllRegistrations<T>(type)
  // Sort by registeredAt descending
  return records.sort((a, b) => {
    const aDate = (a as Registration).registeredAt ?? ''
    const bDate = (b as Registration).registeredAt ?? ''
    return bDate.localeCompare(aDate)
  })
}

export async function updateRegistration<T extends Registration>(
  type: RegistrationType,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  const records = await getAllRegistrations<T>(type)
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) return null

  const updated = {
    ...records[index],
    ...updates,
    id, // preserve original ID
    updatedAt: new Date().toISOString(),
  }
  records[index] = updated
  await saveAllRegistrations(type, records)

  return structuredClone(updated)
}

export async function deleteRegistration(
  type: RegistrationType,
  id: string
): Promise<boolean> {
  const records = await getAllRegistrations(type)
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) return false

  records.splice(index, 1)
  await saveAllRegistrations(type, records)
  return true
}

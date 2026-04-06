import { getStore } from '@netlify/blobs'

// ============================================================
// Auth Store - Server-side authentication using Netlify Blobs
// ============================================================

export interface AdminUser {
  id: string
  name: string
  email: string
  password: string // hashed
  role: 'Super Admin' | 'Editor' | 'Viewer'
  status: 'Active' | 'Inactive'
  createdAt: string
  updatedAt: string
}

export interface AdminSession {
  id: string
  userId: string
  email: string
  name: string
  role: string
  createdAt: string
  expiresAt: string
}

function getAuthStore() {
  return getStore({ name: 'auth-store', consistency: 'strong' })
}

// Simple password hashing (uses Web Crypto API)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + '__inspire_robotics_salt__')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const computed = await hashPassword(password)
  return computed === hash
}

function generateSessionId(): string {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function generateUserId(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `USR-${ts}-${rand}`
}

// ---------------------------------------------------------------------------
// User CRUD
// ---------------------------------------------------------------------------

async function getAllUsers(): Promise<AdminUser[]> {
  try {
    const store = getAuthStore()
    const data = (await store.get('users', { type: 'json' })) as AdminUser[] | null
    return data ?? []
  } catch (err) {
    console.error('[auth-store] Failed to read users from Netlify Blobs:', err)
    throw new Error('Unable to access user database. Please try again.')
  }
}

async function saveAllUsers(users: AdminUser[]): Promise<void> {
  try {
    const store = getAuthStore()
    await store.setJSON('users', users)
  } catch (err) {
    console.error('[auth-store] Failed to save users to Netlify Blobs:', err)
    throw new Error('Unable to save user data. Please try again.')
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: 'Super Admin' | 'Editor' | 'Viewer' = 'Super Admin'
): Promise<AdminUser> {
  const users = await getAllUsers()

  // Check for duplicate email
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (existing) {
    throw new Error('A user with this email already exists')
  }

  const now = new Date().toISOString()
  const hashed = await hashPassword(password)

  const user: AdminUser = {
    id: generateUserId(),
    name,
    email: email.toLowerCase(),
    password: hashed,
    role,
    status: 'Active',
    createdAt: now,
    updatedAt: now,
  }

  users.push(user)
  await saveAllUsers(users)

  return user
}

export async function loginUser(email: string, password: string): Promise<AdminSession> {
  const users = await getAllUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

  if (!user) {
    throw new Error('Invalid email or password')
  }

  if (user.status !== 'Active') {
    throw new Error('Account is inactive. Contact an administrator.')
  }

  const valid = await verifyPassword(password, user.password)
  if (!valid) {
    throw new Error('Invalid email or password')
  }

  // Create session
  const sessionId = generateSessionId()
  const now = new Date()
  const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours

  const session: AdminSession = {
    id: sessionId,
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  }

  try {
    const store = getAuthStore()
    await store.setJSON(`session:${sessionId}`, session)
  } catch (err) {
    console.error('[auth-store] Failed to create session in Netlify Blobs:', err)
    throw new Error('Unable to create session. Please try again.')
  }

  return session
}

export async function getSession(sessionId: string): Promise<AdminSession | null> {
  if (!sessionId) return null

  try {
    const store = getAuthStore()
    const session = (await store.get(`session:${sessionId}`, { type: 'json' })) as AdminSession | null

    if (!session) return null

    // Check expiration
    if (new Date(session.expiresAt) < new Date()) {
      await store.delete(`session:${sessionId}`)
      return null
    }

    return session
  } catch (err) {
    console.error('[auth-store] Failed to read session from Netlify Blobs:', err)
    return null
  }
}

export async function destroySession(sessionId: string): Promise<void> {
  try {
    const store = getAuthStore()
    await store.delete(`session:${sessionId}`)
  } catch (err) {
    console.error('[auth-store] Failed to destroy session in Netlify Blobs:', err)
  }
}

export async function getUserCount(): Promise<number> {
  const users = await getAllUsers()
  return users.length
}

export async function listUsers(): Promise<Omit<AdminUser, 'password'>[]> {
  const users = await getAllUsers()
  return users.map(({ password, ...rest }) => rest)
}

export async function updateUser(
  id: string,
  updates: Partial<Pick<AdminUser, 'name' | 'email' | 'role' | 'status'>>
): Promise<AdminUser | null> {
  const users = await getAllUsers()
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) return null

  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  await saveAllUsers(users)
  return users[index]
}

export async function deleteUser(id: string): Promise<boolean> {
  const users = await getAllUsers()
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) return false

  users.splice(index, 1)
  await saveAllUsers(users)
  return true
}

export async function changePassword(id: string, newPassword: string): Promise<boolean> {
  const users = await getAllUsers()
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) return false

  users[index].password = await hashPassword(newPassword)
  users[index].updatedAt = new Date().toISOString()
  await saveAllUsers(users)
  return true
}

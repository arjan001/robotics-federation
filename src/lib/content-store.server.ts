import { getStore } from '@netlify/blobs'
import {
  CONTENT_MODULES,
  DEFAULT_CONTENT_STORE,
  isContentModuleName,
  type ContentModuleName,
  type ContentRecord,
  type ContentStore,
} from '@/lib/content-store.defaults'

function getBlobStore() {
  return getStore('content-store')
}

// ---------------------------------------------------------------------------
// Generic CRUD
// ---------------------------------------------------------------------------

export async function getModule(moduleName: string): Promise<ContentRecord[]> {
  if (!isContentModuleName(moduleName)) {
    throw new Error(`Unknown module: ${moduleName}`)
  }

  const store = getBlobStore()
  const data = await store.get(moduleName, { type: 'json' }) as ContentRecord[] | null

  if (!data || data.length === 0) {
    // Seed defaults if empty
    const defaults = structuredClone(DEFAULT_CONTENT_STORE[moduleName])
    await store.setJSON(moduleName, defaults)
    return defaults
  }

  return data
}

export async function getModuleRecord(moduleName: string, id: string): Promise<ContentRecord | null> {
  if (!isContentModuleName(moduleName)) {
    throw new Error(`Unknown module: ${moduleName}`)
  }

  const records = await getModule(moduleName)
  return records.find((r) => r.id === id) ?? null
}

export async function createModuleRecord(moduleName: string, payload: ContentRecord): Promise<ContentRecord> {
  if (!isContentModuleName(moduleName)) {
    throw new Error(`Unknown module: ${moduleName}`)
  }
  if (!payload.id) {
    throw new Error('Record id is required')
  }

  const store = getBlobStore()
  const records = await getModule(moduleName)
  records.push(structuredClone(payload))
  await store.setJSON(moduleName, records)

  return structuredClone(payload)
}

export async function updateModuleRecord(
  moduleName: string,
  id: string,
  payload: Partial<ContentRecord>,
): Promise<ContentRecord | null> {
  if (!isContentModuleName(moduleName)) {
    throw new Error(`Unknown module: ${moduleName}`)
  }

  const store = getBlobStore()
  const records = await getModule(moduleName)
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) return null

  const updated = { ...records[index], ...payload }
  // If the id changed, use the new one
  if (typeof payload.id === 'string' && payload.id.length > 0) {
    updated.id = payload.id
  }
  records[index] = updated
  await store.setJSON(moduleName, records)

  return structuredClone(updated)
}

export async function deleteModuleRecord(moduleName: string, id: string): Promise<boolean> {
  if (!isContentModuleName(moduleName)) {
    throw new Error(`Unknown module: ${moduleName}`)
  }

  const store = getBlobStore()
  const records = await getModule(moduleName)
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) return false

  records.splice(index, 1)
  await store.setJSON(moduleName, records)
  return true
}

export async function resetModule(moduleName: string): Promise<ContentRecord[]> {
  if (!isContentModuleName(moduleName)) {
    throw new Error(`Unknown module: ${moduleName}`)
  }

  const store = getBlobStore()
  const defaults = structuredClone(DEFAULT_CONTENT_STORE[moduleName])
  await store.setJSON(moduleName, defaults)
  return defaults
}

export async function resetAllContent(): Promise<ContentStore> {
  const defaults = structuredClone(DEFAULT_CONTENT_STORE)
  for (const moduleName of CONTENT_MODULES) {
    await resetModule(moduleName)
  }
  return defaults
}

export { isContentModuleName, type ContentModuleName }

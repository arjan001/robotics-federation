import { useCallback, useEffect, useMemo, useState } from 'react'

export type ContentItem = {
  id: string
}

type ModuleResponse<TItem extends ContentItem> = {
  module: string
  records: TItem[]
}

export function useContentModule<TItem extends ContentItem>(moduleName: string, fallback: TItem[]) {
  const [items, setItems] = useState<TItem[]>(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/content/${moduleName}`)
      if (!response.ok) {
        throw new Error(`Unable to load ${moduleName}`)
      }

      const payload = (await response.json()) as ModuleResponse<TItem>
      setItems(payload.records)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load content')
    } finally {
      setLoading(false)
    }
  }, [moduleName])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const create = useCallback(
    async (record: TItem) => {
      const response = await fetch(`/api/content/${moduleName}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ record }),
      })

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(body?.error || `Unable to create ${moduleName} record`)
      }

      await refresh()
    },
    [moduleName, refresh],
  )

  const update = useCallback(
    async (id: string, record: Partial<TItem>) => {
      const response = await fetch(`/api/content/${moduleName}/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ record }),
      })

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(body?.error || `Unable to update ${moduleName} record`)
      }

      await refresh()
    },
    [moduleName, refresh],
  )

  const remove = useCallback(
    async (id: string) => {
      const response = await fetch(`/api/content/${moduleName}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(body?.error || `Unable to delete ${moduleName} record`)
      }

      await refresh()
    },
    [moduleName, refresh],
  )

  const reset = useCallback(async () => {
    const response = await fetch(`/api/content/${moduleName}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null
      throw new Error(body?.error || `Unable to reset ${moduleName}`)
    }

    await refresh()
  }, [moduleName, refresh])

  const api = useMemo(
    () => ({
      items,
      loading,
      error,
      refresh,
      create,
      update,
      remove,
      reset,
    }),
    [create, error, items, loading, refresh, remove, reset, update],
  )

  return api
}

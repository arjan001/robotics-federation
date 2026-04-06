import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import {
  deleteModuleRecord,
  getModuleRecord,
  isContentModuleName,
  updateModuleRecord,
} from '@/lib/content-store.server'

const updatePayloadSchema = z.object({
  record: z.object({}).passthrough(),
})

export const Route = createFileRoute('/api/content/$module/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const moduleName = params.module
        if (!isContentModuleName(moduleName)) {
          return Response.json({ error: `Unsupported module: ${moduleName}` }, { status: 400 })
        }

        try {
          const record = await getModuleRecord(moduleName, params.id)
          if (!record) {
            return Response.json({ error: 'Record not found' }, { status: 404 })
          }

          return Response.json({ module: moduleName, record })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to fetch record'
          return Response.json({ error: message }, { status: 500 })
        }
      },
      PUT: async ({ params, request }) => {
        const moduleName = params.module
        if (!isContentModuleName(moduleName)) {
          return Response.json({ error: `Unsupported module: ${moduleName}` }, { status: 400 })
        }

        try {
          const body = updatePayloadSchema.parse(await request.json())
          const updated = await updateModuleRecord(moduleName, params.id, body.record)

          if (!updated) {
            return Response.json({ error: 'Record not found' }, { status: 404 })
          }

          return Response.json({ module: moduleName, record: updated })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to update record'
          return Response.json({ error: message }, { status: 400 })
        }
      },
      PATCH: async ({ params, request }) => {
        const moduleName = params.module
        if (!isContentModuleName(moduleName)) {
          return Response.json({ error: `Unsupported module: ${moduleName}` }, { status: 400 })
        }

        try {
          const body = updatePayloadSchema.parse(await request.json())
          const updated = await updateModuleRecord(moduleName, params.id, body.record)

          if (!updated) {
            return Response.json({ error: 'Record not found' }, { status: 404 })
          }

          return Response.json({ module: moduleName, record: updated })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to patch record'
          return Response.json({ error: message }, { status: 400 })
        }
      },
      DELETE: async ({ params }) => {
        const moduleName = params.module
        if (!isContentModuleName(moduleName)) {
          return Response.json({ error: `Unsupported module: ${moduleName}` }, { status: 400 })
        }

        try {
          const deleted = await deleteModuleRecord(moduleName, params.id)
          if (!deleted) {
            return Response.json({ error: 'Record not found' }, { status: 404 })
          }

          return new Response(null, { status: 204 })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to delete record'
          return Response.json({ error: message }, { status: 500 })
        }
      },
    },
  },
})

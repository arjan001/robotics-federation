import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import {
  createModuleRecord,
  getModule,
  isContentModuleName,
  resetModule,
} from '@/lib/content-store.server'

const recordSchema = z
  .object({
    id: z.string().min(1),
  })
  .passthrough()

const createPayloadSchema = z.object({
  record: recordSchema,
})

export const Route = createFileRoute('/api/content/$module')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const moduleName = params.module
        if (!isContentModuleName(moduleName)) {
          return Response.json({ error: `Unsupported module: ${moduleName}` }, { status: 400 })
        }

        try {
          const records = await getModule(moduleName)
          return Response.json({ module: moduleName, records })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to fetch module'
          return Response.json({ error: message }, { status: 500 })
        }
      },
      POST: async ({ params, request }) => {
        const moduleName = params.module
        if (!isContentModuleName(moduleName)) {
          return Response.json({ error: `Unsupported module: ${moduleName}` }, { status: 400 })
        }

        try {
          const body = createPayloadSchema.parse(await request.json())
          const created = await createModuleRecord(moduleName, body.record)
          return Response.json({ module: moduleName, record: created }, { status: 201 })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to create record'
          return Response.json({ error: message }, { status: 400 })
        }
      },
      DELETE: async ({ params }) => {
        const moduleName = params.module
        if (!isContentModuleName(moduleName)) {
          return Response.json({ error: `Unsupported module: ${moduleName}` }, { status: 400 })
        }

        try {
          const records = await resetModule(moduleName)
          return Response.json({ module: moduleName, records })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to reset module'
          return Response.json({ error: message }, { status: 500 })
        }
      },
    },
  },
})

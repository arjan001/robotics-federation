import { createFileRoute } from '@tanstack/react-router'
import {
  getRegistration,
  updateRegistration,
  deleteRegistration,
  type RegistrationType,
} from '@/lib/registration-store.server'

function isValidType(type: string): type is RegistrationType {
  return type === 'partner' || type === 'team'
}

export const Route = createFileRoute('/api/registrations/$type/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        if (!isValidType(params.type)) {
          return Response.json({ error: 'Invalid registration type' }, { status: 400 })
        }

        try {
          const record = await getRegistration(params.type, params.id)
          if (!record) {
            return Response.json({ error: 'Registration not found' }, { status: 404 })
          }

          return Response.json({ record })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to fetch registration'
          return Response.json({ error: message }, { status: 500 })
        }
      },
      PUT: async ({ params, request }) => {
        if (!isValidType(params.type)) {
          return Response.json({ error: 'Invalid registration type' }, { status: 400 })
        }

        try {
          const body = await request.json()
          const updated = await updateRegistration(params.type, params.id, body)

          if (!updated) {
            return Response.json({ error: 'Registration not found' }, { status: 404 })
          }

          return Response.json({ record: updated })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to update registration'
          return Response.json({ error: message }, { status: 400 })
        }
      },
      PATCH: async ({ params, request }) => {
        if (!isValidType(params.type)) {
          return Response.json({ error: 'Invalid registration type' }, { status: 400 })
        }

        try {
          const body = await request.json()
          const updated = await updateRegistration(params.type, params.id, body)

          if (!updated) {
            return Response.json({ error: 'Registration not found' }, { status: 404 })
          }

          return Response.json({ record: updated })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to patch registration'
          return Response.json({ error: message }, { status: 400 })
        }
      },
      DELETE: async ({ params }) => {
        if (!isValidType(params.type)) {
          return Response.json({ error: 'Invalid registration type' }, { status: 400 })
        }

        const deleted = await deleteRegistration(params.type, params.id)
        if (!deleted) {
          return Response.json({ error: 'Registration not found' }, { status: 404 })
        }

        return new Response(null, { status: 204 })
      },
    },
  },
})

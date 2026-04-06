import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import {
  createRegistration,
  listRegistrations,
  deleteRegistration,
  type PartnerRegistration,
  type TeamRegistration,
  type RegistrationType,
} from '@/lib/registration-store.server'

const partnerSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  partnershipType: z.string().min(1, 'Partnership type is required'),
  website: z.string().default(''),
  contribution: z.string().default(''),
})

const teamSchema = z.object({
  schoolName: z.string().min(1, 'School name is required'),
  city: z.string().min(1, 'City is required'),
  county: z.string().default(''),
  contactPerson: z.string().min(1, 'Contact person is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  teamName: z.string().min(1, 'Team name is required'),
  memberCount: z.number().min(1, 'At least 1 member required'),
  ageRange: z.string().min(1, 'Age range is required'),
  experience: z.string().default(''),
  competitionTrack: z.string().min(1, 'Competition track is required'),
  hasEquipment: z.string().default(''),
  coachName: z.string().default(''),
  coachEmail: z.string().default(''),
  notes: z.string().default(''),
  eventId: z.string().default(''),
})

function isValidType(type: string): type is RegistrationType {
  return type === 'partner' || type === 'team'
}

export const Route = createFileRoute('/api/registrations/$type')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        if (!isValidType(params.type)) {
          return Response.json({ error: 'Invalid registration type' }, { status: 400 })
        }

        try {
          const records = await listRegistrations(params.type)
          return Response.json({ type: params.type, records })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to list registrations'
          return Response.json({ error: message }, { status: 500 })
        }
      },
      POST: async ({ params, request }) => {
        if (!isValidType(params.type)) {
          return Response.json({ error: 'Invalid registration type' }, { status: 400 })
        }

        try {
          const body = await request.json()

          if (params.type === 'partner') {
            const data = partnerSchema.parse(body)
            const record = await createRegistration<PartnerRegistration>('partner', data as any)
            return Response.json({ record }, { status: 201 })
          } else {
            const data = teamSchema.parse(body)
            const record = await createRegistration<TeamRegistration>('team', data as any)
            return Response.json({ record }, { status: 201 })
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            return Response.json(
              { error: 'Validation failed', details: error.errors.map((e) => e.message) },
              { status: 400 }
            )
          }
          const message = error instanceof Error ? error.message : 'Unable to create registration'
          return Response.json({ error: message }, { status: 500 })
        }
      },
      DELETE: async ({ params, request }) => {
        if (!isValidType(params.type)) {
          return Response.json({ error: 'Invalid registration type' }, { status: 400 })
        }

        try {
          const body = await request.json() as { ids?: string[] }
          if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
            return Response.json({ error: 'An array of ids is required' }, { status: 400 })
          }

          const results = await Promise.all(
            body.ids.map((id: string) => deleteRegistration(params.type, id))
          )
          const deletedCount = results.filter(Boolean).length

          return Response.json({ deleted: deletedCount, total: body.ids.length })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to delete registrations'
          return Response.json({ error: message }, { status: 500 })
        }
      },
    },
  },
})

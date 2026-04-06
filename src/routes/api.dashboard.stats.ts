import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { getStore } from '@netlify/blobs'

interface DashboardStats {
  totalTeams: number
  totalPartners: number
  activeEvents: number
  totalChallenges: number
  partnerSchools: number
  sponsors: number
  pendingTeams: number
  approvedTeams: number
  totalMembers: number
  confirmedPartners: number
  newPartners: number
  categories: number
  organizers: number
  totalFaqs: number
  caseStudies: number
}

export const APIRoute = createAPIFileRoute('/api/dashboard/stats')({
  GET: async () => {
    try {
      const contentStore = getStore('content-store')
      const registrationStore = getStore('registrations')

      // Fetch all data in parallel
      const [
        teamRegs,
        partnerRegs,
        events,
        challenges,
        schools,
        partners,
        categories,
        organizers,
        faqs,
        caseStudies,
      ] = await Promise.all([
        registrationStore.get('team-registrations', { type: 'json' }) as Promise<Array<{ status: string; memberCount?: number }> | null>,
        registrationStore.get('partner-registrations', { type: 'json' }) as Promise<Array<{ status: string }> | null>,
        contentStore.get('events', { type: 'json' }) as Promise<Array<{ status: string }> | null>,
        contentStore.get('challenges', { type: 'json' }) as Promise<unknown[] | null>,
        contentStore.get('schools', { type: 'json' }) as Promise<unknown[] | null>,
        contentStore.get('partners', { type: 'json' }) as Promise<unknown[] | null>,
        contentStore.get('categories', { type: 'json' }) as Promise<unknown[] | null>,
        contentStore.get('organizers', { type: 'json' }) as Promise<unknown[] | null>,
        contentStore.get('about-faqs', { type: 'json' }) as Promise<unknown[] | null>,
        contentStore.get('case-studies', { type: 'json' }) as Promise<unknown[] | null>,
      ])

      const teams = teamRegs ?? []
      const partnerRegsList = partnerRegs ?? []
      const eventsList = events ?? []

      const stats: DashboardStats = {
        totalTeams: teams.length,
        totalPartners: partnerRegsList.length,
        activeEvents: eventsList.filter((e) => e.status === 'current' || e.status === 'upcoming').length,
        totalChallenges: (challenges ?? []).length,
        partnerSchools: (schools ?? []).length,
        sponsors: (partners ?? []).length,
        pendingTeams: teams.filter((t) => t.status === 'new' || t.status === 'reviewed').length,
        approvedTeams: teams.filter((t) => t.status === 'approved').length,
        totalMembers: teams.reduce((sum, t) => sum + (t.memberCount || 0), 0),
        confirmedPartners: partnerRegsList.filter((p) => p.status === 'confirmed').length,
        newPartners: partnerRegsList.filter((p) => p.status === 'new').length,
        categories: (categories ?? []).length,
        organizers: (organizers ?? []).length,
        totalFaqs: (faqs ?? []).length,
        caseStudies: (caseStudies ?? []).length,
      }

      return json({ stats })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch stats'
      return json({ error: message, stats: null }, { status: 500 })
    }
  },
})

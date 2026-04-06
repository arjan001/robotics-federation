import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  AdminPage,
  StatCard,
  AdminCard,
  Badge,
} from '@/components/admin/AdminUI'
import {
  Calendar,
  Users,
  Trophy,
  TrendingUp,
  School,
  Handshake,
  ClipboardList,
  UserPlus,
  Database,
  RefreshCw,
} from 'lucide-react'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

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

function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [seedMessage, setSeedMessage] = useState('')

  const fetchStats = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/dashboard/stats')
      const data = (await res.json()) as { stats: DashboardStats | null }
      if (data.stats) {
        setStats(data.stats)
      }
    } catch {
      // stats will remain null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchStats()
  }, [])

  const handleSeedDatabase = async () => {
    setSeeding(true)
    setSeedMessage('')
    try {
      const res = await fetch('/api/seed', { method: 'POST' })
      const data = (await res.json()) as { success?: boolean; message?: string; seeded?: { totalRecords: number }; error?: string }
      if (data.success) {
        setSeedMessage(`Seeded ${data.seeded?.totalRecords ?? 0} records successfully!`)
        await fetchStats()
      } else {
        setSeedMessage(data.error || 'Seed failed')
      }
    } catch {
      setSeedMessage('Network error during seeding')
    } finally {
      setSeeding(false)
    }
  }

  const s = stats

  return (
    <AdminPage
      title="Dashboard"
      subtitle="Overview of your website analytics and content"
      actions={
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => void fetchStats()}
            disabled={loading}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)', color: 'var(--text-primary)',
              cursor: 'pointer', fontSize: 13, fontWeight: 500,
            }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={() => void handleSeedDatabase()}
            disabled={seeding}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
              cursor: seeding ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 500,
            }}
          >
            <Database size={14} /> {seeding ? 'Seeding...' : 'Seed Database'}
          </button>
        </div>
      }
    >
      {seedMessage && (
        <div style={{
          padding: '12px 16px',
          borderRadius: 8,
          marginBottom: 16,
          background: seedMessage.includes('success') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
          border: `1px solid ${seedMessage.includes('success') ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: seedMessage.includes('success') ? '#22c55e' : '#ef4444',
          fontSize: 13,
        }}>
          {seedMessage}
        </div>
      )}

      {/* Stats Grid */}
      <div className="admin-grid-4" style={{ marginBottom: 24 }}>
        <StatCard
          icon={<UserPlus size={22} />}
          label="Registered Teams"
          value={loading ? '...' : String(s?.totalTeams ?? 0)}
          change={s && s.pendingTeams > 0 ? `${s.pendingTeams} pending` : undefined}
        />
        <StatCard
          icon={<ClipboardList size={22} />}
          label="Partner Inquiries"
          value={loading ? '...' : String(s?.totalPartners ?? 0)}
          change={s && s.confirmedPartners > 0 ? `${s.confirmedPartners} confirmed` : undefined}
        />
        <StatCard
          icon={<Calendar size={22} />}
          label="Active Events"
          value={loading ? '...' : String(s?.activeEvents ?? 0)}
        />
        <StatCard
          icon={<Trophy size={22} />}
          label="Competition Tracks"
          value={loading ? '...' : String(s?.totalChallenges ?? 0)}
        />
      </div>

      <div className="admin-grid-2" style={{ marginBottom: 24 }}>
        <StatCard
          icon={<School size={22} />}
          label="Partner Schools"
          value={loading ? '...' : String(s?.partnerSchools ?? 0)}
        />
        <StatCard
          icon={<Handshake size={22} />}
          label="Sponsors & Partners"
          value={loading ? '...' : String(s?.sponsors ?? 0)}
        />
      </div>

      {/* Main content grid */}
      <div className="admin-grid-2" style={{ gap: 24 }}>
        {/* Database Summary */}
        <AdminCard title="Module Overview" subtitle="Records stored across all modules">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Team Registrations', count: s?.totalTeams ?? 0, badge: `${s?.totalMembers ?? 0} members` },
              { label: 'Partner Registrations', count: s?.totalPartners ?? 0, badge: `${s?.confirmedPartners ?? 0} confirmed` },
              { label: 'Schools', count: s?.partnerSchools ?? 0 },
              { label: 'Partners', count: s?.sponsors ?? 0 },
              { label: 'Organizers', count: s?.organizers ?? 0 },
              { label: 'Categories', count: s?.categories ?? 0 },
              { label: 'FAQs', count: s?.totalFaqs ?? 0 },
              { label: 'Case Studies', count: s?.caseStudies ?? 0 },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: 13.5,
                }}
              >
                <span>{item.label}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Badge variant="info">{loading ? '...' : item.count}</Badge>
                  {item.badge && <Badge variant="success">{item.badge}</Badge>}
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Quick Actions + Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <AdminCard title="Quick Actions">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Partner Registrations', path: '/admin/partner-registrations' },
                { label: 'Team Registrations', path: '/admin/team-registrations' },
                { label: 'Add New Event', path: '/admin/events' },
                { label: 'Manage Challenges', path: '/admin/challenges' },
                { label: 'Update Home Page', path: '/admin/home' },
                { label: 'Edit Settings', path: '/admin/settings' },
                { label: 'Manage Partners', path: '/admin/partners' },
                { label: 'Users & Roles', path: '/admin/users' },
              ].map((action) => (
                <Link
                  key={action.path}
                  to={action.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    fontSize: 13.5,
                    background: 'var(--bg-secondary)',
                    transition: 'background 0.15s',
                  }}
                >
                  {action.label}
                  <TrendingUp size={14} style={{ color: 'var(--text-muted)' }} />
                </Link>
              ))}
            </div>
          </AdminCard>

          <AdminCard title="Content Status">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Home Page', status: 'Published', variant: 'success' as const },
                { label: 'About Page', status: 'Published', variant: 'success' as const },
                { label: 'Events', status: `${s?.activeEvents ?? 0} Active`, variant: 'info' as const },
                { label: 'Challenges', status: `${s?.totalChallenges ?? 0} Active`, variant: 'success' as const },
                { label: 'Partner Regs', status: `${s?.newPartners ?? 0} New`, variant: 'warning' as const },
                { label: 'Team Regs', status: `${s?.pendingTeams ?? 0} Pending`, variant: 'warning' as const },
                { label: 'Categories', status: `${s?.categories ?? 0} Active`, variant: 'info' as const },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: 13.5,
                  }}
                >
                  <span>{item.label}</span>
                  <Badge variant={item.variant}>{loading ? '...' : item.status}</Badge>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </AdminPage>
  )
}

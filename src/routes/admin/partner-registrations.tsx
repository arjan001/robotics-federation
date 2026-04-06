import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'
import {
  AdminPage,
  AdminCard,
  AdminTable,
  AdminButton,
  AdminModal,
  Badge,
  ActionButtons,
  FormField,
  TextInput,
  TextArea,
  SelectInput,
  AdminTabs,
  EmptyState,
} from '@/components/admin/AdminUI'
import {
  Handshake,
  Plus,
  Search,
  Download,
  RefreshCw,
  Calendar,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Clock,
  Filter,
} from 'lucide-react'

export const Route = createFileRoute('/admin/partner-registrations')({
  component: AdminPartnerRegistrations,
})

interface PartnerReg {
  id: string
  organizationName: string
  contactPerson: string
  email: string
  phone: string
  partnershipType: string
  website: string
  contribution: string
  status: string
  followUpDate: string
  followUpNotes: string
  registeredAt: string
  updatedAt: string
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'declined', label: 'Declined' },
]

const PARTNERSHIP_TYPES: Record<string, string> = {
  sponsor: 'Financial Sponsor',
  technology: 'Technology Partner',
  educational: 'Educational Partner',
  media: 'Media Partner',
  venue: 'Venue Partner',
  mentorship: 'Mentorship Partner',
  other: 'Other',
}

function statusVariant(status: string): 'default' | 'success' | 'warning' | 'danger' | 'info' {
  switch (status) {
    case 'new': return 'info'
    case 'contacted': return 'warning'
    case 'in-progress': return 'warning'
    case 'confirmed': return 'success'
    case 'declined': return 'danger'
    default: return 'default'
  }
}

function AdminPartnerRegistrations() {
  const [registrations, setRegistrations] = useState<PartnerReg[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  // Modal states
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selected, setSelected] = useState<PartnerReg | null>(null)
  const [editForm, setEditForm] = useState<Partial<PartnerReg>>({})
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/registrations/partner')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setRegistrations(data.records || [])
    } catch {
      setError('Failed to load partner registrations')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void fetchData() }, [fetchData])

  const filtered = registrations.filter((r) => {
    const matchSearch =
      !search ||
      r.organizationName.toLowerCase().includes(search.toLowerCase()) ||
      r.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || r.status === filterStatus
    const matchTab =
      activeTab === 'all' ||
      (activeTab === 'follow-up' && (r.status === 'new' || r.status === 'contacted')) ||
      (activeTab === 'confirmed' && r.status === 'confirmed')
    return matchSearch && matchStatus && matchTab
  })

  const handleView = (reg: PartnerReg) => {
    setSelected(reg)
    setViewOpen(true)
  }

  const handleEdit = (reg: PartnerReg) => {
    setSelected(reg)
    setEditForm({ ...reg })
    setEditOpen(true)
  }

  const handleSave = async () => {
    if (!selected) return
    setSaving(true)
    try {
      const res = await fetch(`/api/registrations/partner/${selected.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      if (!res.ok) throw new Error('Failed to update')
      setEditOpen(false)
      await fetchData()
    } catch {
      setError('Failed to update registration')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/registrations/partner/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      await fetchData()
    } catch {
      setError('Failed to delete registration')
    }
  }

  const needsFollowUp = registrations.filter((r) => r.status === 'new' || r.status === 'contacted')
  const confirmedCount = registrations.filter((r) => r.status === 'confirmed').length

  return (
    <AdminPage
      title="Partner Registrations"
      subtitle="Manage partner inquiries, track follow-ups, and confirm partnerships"
      actions={
        <AdminButton variant="secondary" onClick={() => void fetchData()}>
          <RefreshCw size={14} /> Refresh
        </AdminButton>
      }
    >
      {/* Stats Row */}
      <div className="admin-grid-4" style={{ marginBottom: 24 }}>
        <MiniStat label="Total Inquiries" value={registrations.length} color="var(--accent)" />
        <MiniStat label="Needs Follow-up" value={needsFollowUp.length} color="#f59e0b" />
        <MiniStat label="Confirmed" value={confirmedCount} color="#22c55e" />
        <MiniStat label="This Month" value={registrations.filter((r) => {
          const d = new Date(r.registeredAt)
          const now = new Date()
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        }).length} color="#6366f1" />
      </div>

      {/* Tabs + Filters */}
      <AdminCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AdminTabs
            tabs={[
              { id: 'all', label: `All (${registrations.length})` },
              { id: 'follow-up', label: `Needs Follow-up (${needsFollowUp.length})` },
              { id: 'confirmed', label: `Confirmed (${confirmedCount})` },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search by name, email, or organization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="admin-input"
                style={{ paddingLeft: 36, width: '100%' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Filter size={14} style={{ color: 'var(--text-muted)' }} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="admin-input admin-select"
                style={{ minWidth: 140 }}
              >
                <option value="all">All Statuses</option>
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </AdminCard>

      {/* Table */}
      <div style={{ marginTop: 16 }}>
        <AdminCard title={`${filtered.length} Registration(s)`}>
          {error && <p style={{ color: '#dc2626', marginBottom: 12 }}>{error}</p>}
          {loading ? (
            <p style={{ color: 'var(--text-muted)', padding: 20, textAlign: 'center' }}>Loading registrations...</p>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<Handshake size={40} />}
              title="No registrations found"
              description={search || filterStatus !== 'all' ? 'Try adjusting your filters' : 'Partner registrations will appear here when submitted'}
            />
          ) : (
            <AdminTable columns={['Organization', 'Contact', 'Type', 'Status', 'Registered', 'Actions']}>
              {filtered.map((reg) => (
                <tr key={reg.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{reg.organizationName}</div>
                    {reg.website && (
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{reg.website}</div>
                    )}
                  </td>
                  <td>
                    <div style={{ fontSize: 13 }}>{reg.contactPerson}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{reg.email}</div>
                  </td>
                  <td>
                    <Badge variant="default">
                      {PARTNERSHIP_TYPES[reg.partnershipType] || reg.partnershipType}
                    </Badge>
                  </td>
                  <td>
                    <Badge variant={statusVariant(reg.status)}>
                      {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                    </Badge>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {new Date(reg.registeredAt).toLocaleDateString()}
                  </td>
                  <td>
                    <ActionButtons
                      onView={() => handleView(reg)}
                      onEdit={() => handleEdit(reg)}
                      onDelete={() => void handleDelete(reg.id)}
                    />
                  </td>
                </tr>
              ))}
            </AdminTable>
          )}
        </AdminCard>
      </div>

      {/* View Modal */}
      <AdminModal open={viewOpen} onClose={() => setViewOpen(false)} title="Partner Details">
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <DetailSection title="Organization">
              <DetailRow icon={<Building2 size={14} />} label="Name" value={selected.organizationName} />
              <DetailRow icon={<Handshake size={14} />} label="Type" value={PARTNERSHIP_TYPES[selected.partnershipType] || selected.partnershipType} />
              {selected.website && <DetailRow label="Website" value={selected.website} />}
            </DetailSection>
            <DetailSection title="Contact">
              <DetailRow label="Person" value={selected.contactPerson} />
              <DetailRow icon={<Mail size={14} />} label="Email" value={selected.email} />
              <DetailRow icon={<Phone size={14} />} label="Phone" value={selected.phone} />
            </DetailSection>
            {selected.contribution && (
              <DetailSection title="Contribution">
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selected.contribution}</p>
              </DetailSection>
            )}
            <DetailSection title="Status & Follow-up">
              <div style={{ marginBottom: 8 }}>
                <Badge variant={statusVariant(selected.status)}>
                  {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                </Badge>
              </div>
              {selected.followUpDate && <DetailRow icon={<Calendar size={14} />} label="Follow-up Date" value={selected.followUpDate} />}
              {selected.followUpNotes && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Follow-up Notes</div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selected.followUpNotes}</p>
                </div>
              )}
            </DetailSection>
            <DetailSection title="Timeline">
              <DetailRow icon={<Clock size={14} />} label="Registered" value={new Date(selected.registeredAt).toLocaleString()} />
              <DetailRow icon={<Clock size={14} />} label="Last Updated" value={new Date(selected.updatedAt).toLocaleString()} />
            </DetailSection>
          </div>
        )}
      </AdminModal>

      {/* Edit Modal */}
      <AdminModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Partner Registration"
        footer={
          <>
            <AdminButton variant="secondary" onClick={() => setEditOpen(false)}>Cancel</AdminButton>
            <AdminButton variant="primary" onClick={() => void handleSave()} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </AdminButton>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormField label="Organization Name" required>
            <TextInput value={editForm.organizationName || ''} onChange={(v) => setEditForm((p) => ({ ...p, organizationName: v }))} />
          </FormField>
          <FormField label="Contact Person" required>
            <TextInput value={editForm.contactPerson || ''} onChange={(v) => setEditForm((p) => ({ ...p, contactPerson: v }))} />
          </FormField>
          <FormField label="Email" required>
            <TextInput type="email" value={editForm.email || ''} onChange={(v) => setEditForm((p) => ({ ...p, email: v }))} />
          </FormField>
          <FormField label="Phone" required>
            <TextInput value={editForm.phone || ''} onChange={(v) => setEditForm((p) => ({ ...p, phone: v }))} />
          </FormField>
          <FormField label="Partnership Type">
            <SelectInput
              value={editForm.partnershipType || ''}
              onChange={(v) => setEditForm((p) => ({ ...p, partnershipType: v }))}
              options={Object.entries(PARTNERSHIP_TYPES).map(([v, l]) => ({ value: v, label: l }))}
              placeholder="Select type"
            />
          </FormField>
          <FormField label="Website">
            <TextInput value={editForm.website || ''} onChange={(v) => setEditForm((p) => ({ ...p, website: v }))} />
          </FormField>
          <FormField label="Contribution">
            <TextArea value={editForm.contribution || ''} onChange={(v) => setEditForm((p) => ({ ...p, contribution: v }))} rows={3} />
          </FormField>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16, marginTop: 8 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--text-primary)' }}>
              Follow-up Management
            </h4>
            <FormField label="Status">
              <SelectInput
                value={editForm.status || 'new'}
                onChange={(v) => setEditForm((p) => ({ ...p, status: v }))}
                options={STATUS_OPTIONS}
              />
            </FormField>
            <FormField label="Follow-up Date">
              <TextInput type="date" value={editForm.followUpDate || ''} onChange={(v) => setEditForm((p) => ({ ...p, followUpDate: v }))} />
            </FormField>
            <FormField label="Follow-up Notes" hint="Internal notes for tracking communication and next steps">
              <TextArea
                value={editForm.followUpNotes || ''}
                onChange={(v) => setEditForm((p) => ({ ...p, followUpNotes: v }))}
                rows={4}
                placeholder="e.g., Called on March 15 - interested in Gold tier sponsorship. Follow up with proposal by end of week."
              />
            </FormField>
          </div>
        </div>
      </AdminModal>
    </AdminPage>
  )
}

/* ─── Helper Components ─── */

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="admin-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${color}15`, color, fontSize: 18, fontWeight: 700,
      }}>
        {value}
      </div>
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{label}</span>
    </div>
  )
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function DetailRow({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, padding: '3px 0' }}>
      {icon && <span style={{ color: 'var(--text-muted)' }}>{icon}</span>}
      <span style={{ color: 'var(--text-muted)', minWidth: 80 }}>{label}:</span>
      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

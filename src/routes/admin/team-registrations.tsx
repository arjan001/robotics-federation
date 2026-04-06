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
  Users,
  Search,
  RefreshCw,
  Calendar,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Clock,
  Filter,
  Trophy,
  Wrench,
} from 'lucide-react'

export const Route = createFileRoute('/admin/team-registrations')({
  component: AdminTeamRegistrations,
})

interface TeamReg {
  id: string
  schoolName: string
  city: string
  county: string
  contactPerson: string
  email: string
  phone: string
  teamName: string
  memberCount: number
  ageRange: string
  experience: string
  competitionTrack: string
  hasEquipment: string
  coachName: string
  coachEmail: string
  notes: string
  status: string
  followUpDate: string
  followUpNotes: string
  eventId: string
  registeredAt: string
  updatedAt: string
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'approved', label: 'Approved' },
  { value: 'waitlisted', label: 'Waitlisted' },
  { value: 'declined', label: 'Declined' },
]

const TRACK_LABELS: Record<string, string> = {
  explore: 'Explore (6-10)',
  innovators: 'Innovators (11-14)',
  challengers: 'Challengers (15-18)',
}

const EQUIPMENT_LABELS: Record<string, string> = {
  yes: 'Has Equipment',
  partial: 'Partial Equipment',
  no: 'Needs Starter Kit',
}

function statusVariant(status: string): 'default' | 'success' | 'warning' | 'danger' | 'info' {
  switch (status) {
    case 'new': return 'info'
    case 'reviewed': return 'warning'
    case 'approved': return 'success'
    case 'waitlisted': return 'warning'
    case 'declined': return 'danger'
    default: return 'default'
  }
}

function AdminTeamRegistrations() {
  const [registrations, setRegistrations] = useState<TeamReg[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterTrack, setFilterTrack] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selected, setSelected] = useState<TeamReg | null>(null)
  const [editForm, setEditForm] = useState<Partial<TeamReg>>({})
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/registrations/team')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setRegistrations(data.records || [])
    } catch {
      setError('Failed to load team registrations')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void fetchData() }, [fetchData])

  const filtered = registrations.filter((r) => {
    const matchSearch =
      !search ||
      r.teamName.toLowerCase().includes(search.toLowerCase()) ||
      r.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      r.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || r.status === filterStatus
    const matchTrack = filterTrack === 'all' || r.competitionTrack === filterTrack
    const matchTab =
      activeTab === 'all' ||
      (activeTab === 'pending' && (r.status === 'new' || r.status === 'reviewed')) ||
      (activeTab === 'approved' && r.status === 'approved') ||
      (activeTab === 'needs-equipment' && r.hasEquipment === 'no')
    return matchSearch && matchStatus && matchTrack && matchTab
  })

  const handleView = (reg: TeamReg) => {
    setSelected(reg)
    setViewOpen(true)
  }

  const handleEdit = (reg: TeamReg) => {
    setSelected(reg)
    setEditForm({ ...reg })
    setEditOpen(true)
  }

  const handleSave = async () => {
    if (!selected) return
    setSaving(true)
    try {
      const res = await fetch(`/api/registrations/team/${selected.id}`, {
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
      const res = await fetch(`/api/registrations/team/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      await fetchData()
    } catch {
      setError('Failed to delete registration')
    }
  }

  const pendingCount = registrations.filter((r) => r.status === 'new' || r.status === 'reviewed').length
  const approvedCount = registrations.filter((r) => r.status === 'approved').length
  const needsEquipment = registrations.filter((r) => r.hasEquipment === 'no').length
  const totalMembers = registrations.reduce((sum, r) => sum + (r.memberCount || 0), 0)

  return (
    <AdminPage
      title="Team Registrations"
      subtitle="Manage team applications, review registrations, and track event participation"
      actions={
        <AdminButton variant="secondary" onClick={() => void fetchData()}>
          <RefreshCw size={14} /> Refresh
        </AdminButton>
      }
    >
      {/* Stats Row */}
      <div className="admin-grid-4" style={{ marginBottom: 24 }}>
        <MiniStat label="Total Teams" value={registrations.length} color="var(--accent)" icon={<Users size={16} />} />
        <MiniStat label="Pending Review" value={pendingCount} color="#f59e0b" icon={<Clock size={16} />} />
        <MiniStat label="Approved" value={approvedCount} color="#22c55e" icon={<Trophy size={16} />} />
        <MiniStat label="Total Members" value={totalMembers} color="#6366f1" icon={<Users size={16} />} />
      </div>

      {/* Equipment Alert */}
      {needsEquipment > 0 && (
        <div
          className="admin-card"
          style={{ padding: '14px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}
        >
          <Wrench size={18} style={{ color: '#f59e0b' }} />
          <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>
            <strong>{needsEquipment} team(s)</strong> need starter kits. Plan equipment allocation for upcoming events.
          </span>
        </div>
      )}

      {/* Tabs + Filters */}
      <AdminCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AdminTabs
            tabs={[
              { id: 'all', label: `All (${registrations.length})` },
              { id: 'pending', label: `Pending (${pendingCount})` },
              { id: 'approved', label: `Approved (${approvedCount})` },
              { id: 'needs-equipment', label: `Needs Equipment (${needsEquipment})` },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search by team, school, contact, or email..."
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
                style={{ minWidth: 130 }}
              >
                <option value="all">All Statuses</option>
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <select
                value={filterTrack}
                onChange={(e) => setFilterTrack(e.target.value)}
                className="admin-input admin-select"
                style={{ minWidth: 130 }}
              >
                <option value="all">All Tracks</option>
                {Object.entries(TRACK_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
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
              icon={<Users size={40} />}
              title="No team registrations found"
              description={search || filterStatus !== 'all' ? 'Try adjusting your filters' : 'Team registrations will appear here when submitted'}
            />
          ) : (
            <AdminTable columns={['Team', 'School', 'Track', 'Members', 'Equipment', 'Status', 'Date', 'Actions']}>
              {filtered.map((reg) => (
                <tr key={reg.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{reg.teamName}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{reg.contactPerson}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13 }}>{reg.schoolName}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{reg.city}</div>
                  </td>
                  <td>
                    <Badge variant="default">
                      {TRACK_LABELS[reg.competitionTrack] || reg.competitionTrack}
                    </Badge>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>
                    {reg.memberCount}
                  </td>
                  <td>
                    <Badge variant={reg.hasEquipment === 'yes' ? 'success' : reg.hasEquipment === 'partial' ? 'warning' : 'danger'}>
                      {EQUIPMENT_LABELS[reg.hasEquipment] || reg.hasEquipment}
                    </Badge>
                  </td>
                  <td>
                    <Badge variant={statusVariant(reg.status)}>
                      {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                    </Badge>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
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
      <AdminModal open={viewOpen} onClose={() => setViewOpen(false)} title="Team Registration Details">
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <DetailSection title="School Information">
              <DetailRow icon={<GraduationCap size={14} />} label="School" value={selected.schoolName} />
              <DetailRow icon={<MapPin size={14} />} label="Location" value={[selected.city, selected.county].filter(Boolean).join(', ')} />
              <DetailRow label="Contact" value={selected.contactPerson} />
              <DetailRow icon={<Mail size={14} />} label="Email" value={selected.email} />
              <DetailRow icon={<Phone size={14} />} label="Phone" value={selected.phone} />
            </DetailSection>
            <DetailSection title="Team Details">
              <DetailRow label="Team Name" value={selected.teamName} />
              <DetailRow label="Members" value={String(selected.memberCount)} />
              <DetailRow label="Age Range" value={selected.ageRange} />
              <DetailRow icon={<Trophy size={14} />} label="Track" value={TRACK_LABELS[selected.competitionTrack] || selected.competitionTrack} />
              <DetailRow label="Equipment" value={EQUIPMENT_LABELS[selected.hasEquipment] || selected.hasEquipment} />
              {selected.coachName && <DetailRow label="Coach" value={selected.coachName} />}
              {selected.coachEmail && <DetailRow icon={<Mail size={14} />} label="Coach Email" value={selected.coachEmail} />}
            </DetailSection>
            {selected.experience && (
              <DetailSection title="Experience">
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selected.experience}</p>
              </DetailSection>
            )}
            {selected.notes && (
              <DetailSection title="Notes">
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selected.notes}</p>
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
              <DetailRow icon={<Clock size={14} />} label="Updated" value={new Date(selected.updatedAt).toLocaleString()} />
            </DetailSection>
          </div>
        )}
      </AdminModal>

      {/* Edit Modal */}
      <AdminModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Team Registration"
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
          <FormField label="Team Name" required>
            <TextInput value={editForm.teamName || ''} onChange={(v) => setEditForm((p) => ({ ...p, teamName: v }))} />
          </FormField>
          <FormField label="School Name" required>
            <TextInput value={editForm.schoolName || ''} onChange={(v) => setEditForm((p) => ({ ...p, schoolName: v }))} />
          </FormField>
          <FormField label="City">
            <TextInput value={editForm.city || ''} onChange={(v) => setEditForm((p) => ({ ...p, city: v }))} />
          </FormField>
          <FormField label="Contact Person" required>
            <TextInput value={editForm.contactPerson || ''} onChange={(v) => setEditForm((p) => ({ ...p, contactPerson: v }))} />
          </FormField>
          <FormField label="Email" required>
            <TextInput type="email" value={editForm.email || ''} onChange={(v) => setEditForm((p) => ({ ...p, email: v }))} />
          </FormField>
          <FormField label="Phone">
            <TextInput value={editForm.phone || ''} onChange={(v) => setEditForm((p) => ({ ...p, phone: v }))} />
          </FormField>
          <FormField label="Member Count">
            <TextInput type="number" value={String(editForm.memberCount || '')} onChange={(v) => setEditForm((p) => ({ ...p, memberCount: parseInt(v, 10) || 0 }))} />
          </FormField>
          <FormField label="Competition Track">
            <SelectInput
              value={editForm.competitionTrack || ''}
              onChange={(v) => setEditForm((p) => ({ ...p, competitionTrack: v }))}
              options={Object.entries(TRACK_LABELS).map(([v, l]) => ({ value: v, label: l }))}
              placeholder="Select track"
            />
          </FormField>
          <FormField label="Equipment Status">
            <SelectInput
              value={editForm.hasEquipment || ''}
              onChange={(v) => setEditForm((p) => ({ ...p, hasEquipment: v }))}
              options={Object.entries(EQUIPMENT_LABELS).map(([v, l]) => ({ value: v, label: l }))}
              placeholder="Select status"
            />
          </FormField>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16, marginTop: 8 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--text-primary)' }}>
              Follow-up & Event Management
            </h4>
            <FormField label="Status">
              <SelectInput
                value={editForm.status || 'new'}
                onChange={(v) => setEditForm((p) => ({ ...p, status: v }))}
                options={STATUS_OPTIONS}
              />
            </FormField>
            <FormField label="Event ID" hint="Assign to a specific event for tracking">
              <TextInput value={editForm.eventId || ''} onChange={(v) => setEditForm((p) => ({ ...p, eventId: v }))} placeholder="e.g., season-3-qualifiers" />
            </FormField>
            <FormField label="Follow-up Date">
              <TextInput type="date" value={editForm.followUpDate || ''} onChange={(v) => setEditForm((p) => ({ ...p, followUpDate: v }))} />
            </FormField>
            <FormField label="Follow-up Notes" hint="Internal notes for tracking progress, communication, and event readiness">
              <TextArea
                value={editForm.followUpNotes || ''}
                onChange={(v) => setEditForm((p) => ({ ...p, followUpNotes: v }))}
                rows={4}
                placeholder="e.g., Confirmed participation for Season 3. Equipment kit shipped on March 20. Coach completed orientation webinar."
              />
            </FormField>
          </div>
        </div>
      </AdminModal>
    </AdminPage>
  )
}

/* ─── Helper Components ─── */

function MiniStat({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) {
  return (
    <div className="admin-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${color}15`, color,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{value}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</div>
      </div>
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
      <span style={{ color: 'var(--text-muted)', minWidth: 90 }}>{label}:</span>
      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

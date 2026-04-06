import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import {
  AdminPage,
  AdminCard,
  AdminTable,
  AdminButton,
  AdminModal,
  FormField,
  TextInput,
  SelectInput,
  Badge,
  ActionButtons,
} from '@/components/admin/AdminUI'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/admin/users')({
  component: AdminUsersPage,
})

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt?: string
  updatedAt?: string
}

function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Viewer', status: 'Active' })
  const [saving, setSaving] = useState(false)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/users')
      const data = (await res.json()) as { users?: AdminUser[]; error?: string }
      if (data.users) {
        setUsers(data.users)
      } else {
        setError(data.error || 'Failed to load users')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchUsers()
  }, [fetchUsers])

  const openCreateModal = () => {
    setEditingUser(null)
    setForm({ name: '', email: '', password: '', role: 'Viewer', status: 'Active' })
    setError('')
    setModalOpen(true)
  }

  const openEditModal = (user: AdminUser) => {
    setEditingUser(user)
    setForm({ name: user.name, email: user.email, password: '', role: user.role, status: user.status })
    setError('')
    setModalOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')

    try {
      if (editingUser) {
        // Update existing user
        const res = await fetch('/api/admin/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingUser.id, name: form.name, email: form.email, role: form.role, status: form.status }),
        })
        const data = (await res.json()) as { success?: boolean; error?: string }
        if (!data.success) {
          setError(data.error || 'Update failed')
          return
        }
      } else {
        // Create new user
        if (!form.password) {
          setError('Password is required for new users')
          return
        }
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        const data = (await res.json()) as { success?: boolean; error?: string }
        if (!data.success) {
          setError(data.error || 'Create failed')
          return
        }
      }

      setModalOpen(false)
      await fetchUsers()
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = (await res.json()) as { success?: boolean; error?: string }
      if (!data.success) {
        setError(data.error || 'Delete failed')
        return
      }
      await fetchUsers()
    } catch {
      setError('Network error')
    }
  }

  const roleBadge = (role: string) => {
    if (role === 'Super Admin') return 'danger'
    if (role === 'Editor') return 'info'
    return 'default'
  }

  return (
    <AdminPage
      title="Users & Roles"
      subtitle="Manage admin user accounts and role assignments"
      actions={
        <AdminButton variant="primary" onClick={openCreateModal}>
          <Plus size={14} /> Add User
        </AdminButton>
      }
    >
      {error && (
        <p style={{ color: 'var(--danger, #dc2626)', marginBottom: 12 }}>{error}</p>
      )}

      <AdminCard title="Admin Users" subtitle={loading ? 'Loading...' : `${users.length} user(s)`}>
        <AdminTable columns={['Name', 'Email', 'Role', 'Status', 'Actions']}>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ fontWeight: 600 }}>{user.name}</td>
              <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{user.email}</td>
              <td><Badge variant={roleBadge(user.role)}>{user.role}</Badge></td>
              <td><Badge variant={user.status === 'Active' ? 'success' : 'warning'}>{user.status}</Badge></td>
              <td>
                <ActionButtons
                  onEdit={() => openEditModal(user)}
                  onDelete={() => void handleDelete(user.id)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Create User'}
        footer={
          <>
            <AdminButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton variant="primary" onClick={() => void handleSave()} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </AdminButton>
          </>
        }
      >
        {error && (
          <p style={{ color: 'var(--danger, #dc2626)', marginBottom: 12 }}>{error}</p>
        )}
        <FormField label="Full Name" required>
          <TextInput value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} placeholder="Enter name" />
        </FormField>
        <FormField label="Email" required>
          <TextInput value={form.email} onChange={(v) => setForm((p) => ({ ...p, email: v }))} placeholder="user@example.com" />
        </FormField>
        {!editingUser && (
          <FormField label="Password" required>
            <TextInput value={form.password} onChange={(v) => setForm((p) => ({ ...p, password: v }))} placeholder="Min 6 characters" type="password" />
          </FormField>
        )}
        <FormField label="Role" required>
          <SelectInput
            value={form.role}
            onChange={(v) => setForm((p) => ({ ...p, role: v }))}
            options={[
              { value: 'Super Admin', label: 'Super Admin' },
              { value: 'Editor', label: 'Editor' },
              { value: 'Viewer', label: 'Viewer' },
            ]}
          />
        </FormField>
        <FormField label="Status">
          <SelectInput
            value={form.status}
            onChange={(v) => setForm((p) => ({ ...p, status: v }))}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
            ]}
          />
        </FormField>
      </AdminModal>
    </AdminPage>
  )
}

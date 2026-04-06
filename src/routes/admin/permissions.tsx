import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/permissions')({
  component: AdminPermissionsPage,
})

const fields: FieldConfig[] = [
  { key: 'role', label: 'Role', type: 'text', required: true },
  {
    key: 'scope',
    label: 'Scope',
    type: 'badge',
    badgeVariant: (val) => (val === 'all' ? 'danger' : 'info'),
    showInForm: false,
  },
  {
    key: 'scope',
    label: 'Scope',
    type: 'select',
    options: [
      { value: 'all', label: 'All' },
      { value: 'content', label: 'Content' },
      { value: 'users', label: 'Users' },
    ],
    showInTable: false,
    required: true,
  },
  { key: 'actions', label: 'Actions', type: 'tags', required: true },
]

function AdminPermissionsPage() {
  return (
    <ContentCrudPage
      moduleName="permissions"
      title="Permissions"
      subtitle="Manage role-based permission assignments"
      defaultItems={DEFAULT_CONTENT_STORE.permissions}
      fields={fields}
    />
  )
}

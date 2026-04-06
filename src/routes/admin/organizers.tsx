import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/organizers')({
  component: AdminOrganizersPage,
})

const fields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'role', label: 'Role', type: 'text', required: true },
  { key: 'bio', label: 'Bio', type: 'textarea', showInTable: false },
]

function AdminOrganizersPage() {
  return (
    <ContentCrudPage
      moduleName="organizers"
      title="Organizers"
      subtitle="Manage team members and organizers"
      defaultItems={DEFAULT_CONTENT_STORE.organizers}
      fields={fields}
    />
  )
}

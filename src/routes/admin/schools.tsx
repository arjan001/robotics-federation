import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/schools')({
  component: AdminSchoolsPage,
})

const fields: FieldConfig[] = [
  { key: 'name', label: 'School Name', type: 'text', required: true },
  { key: 'city', label: 'City', type: 'text', required: true },
  { key: 'since', label: 'Partner Since', type: 'text' },
  { key: 'teams', label: 'Teams', type: 'number' },
  { key: 'achievements', label: 'Achievements', type: 'tags', showInTable: false },
]

function AdminSchoolsPage() {
  return (
    <ContentCrudPage
      moduleName="schools"
      title="Schools"
      subtitle="Manage partner schools directory"
      defaultItems={DEFAULT_CONTENT_STORE.schools}
      fields={fields}
    />
  )
}

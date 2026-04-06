import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/ecosystem')({
  component: AdminEcosystemPage,
})

const fields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  {
    key: 'recordType',
    label: 'Type',
    type: 'badge',
    badgeVariant: (val) => {
      if (val === 'school') return 'info'
      if (val === 'organizer') return 'success'
      if (val === 'partner') return 'warning'
      return 'default'
    },
    showInForm: false,
  },
  {
    key: 'recordType',
    label: 'Record Type',
    type: 'select',
    options: [
      { value: 'school', label: 'School' },
      { value: 'organizer', label: 'Organizer' },
      { value: 'partner', label: 'Partner' },
      { value: 'stats', label: 'Stats' },
    ],
    showInTable: false,
    required: true,
  },
  { key: 'city', label: 'City', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'bio', label: 'Bio', type: 'textarea', showInTable: false },
  { key: 'since', label: 'Since', type: 'text', showInTable: false },
  { key: 'teams', label: 'Teams', type: 'number', showInTable: false },
  { key: 'achievements', label: 'Achievements', type: 'tags', showInTable: false },
]

function AdminEcosystemPage() {
  return (
    <ContentCrudPage
      moduleName="ecosystem"
      title="Ecosystem"
      subtitle="Manage schools, organizers, partners, and ecosystem metrics"
      defaultItems={DEFAULT_CONTENT_STORE.ecosystem}
      fields={fields}
    />
  )
}

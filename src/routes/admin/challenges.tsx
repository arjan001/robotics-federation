import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/challenges')({
  component: AdminChallengesPage,
})

const fields: FieldConfig[] = [
  { key: 'name', label: 'Track Name', type: 'text', required: true },
  { key: 'tagline', label: 'Tagline', type: 'text', required: true },
  { key: 'ageRange', label: 'Age Range', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea', showInTable: false },
  { key: 'color', label: 'Color', type: 'text', showInTable: false },
  { key: 'icon', label: 'Icon', type: 'text' },
  { key: 'missions', label: 'Missions', type: 'tags', showInTable: false },
]

function AdminChallengesPage() {
  return (
    <ContentCrudPage
      moduleName="challenges"
      title="Challenges"
      subtitle="Manage competition tracks, missions, and details"
      defaultItems={DEFAULT_CONTENT_STORE.challenges}
      fields={fields}
    />
  )
}

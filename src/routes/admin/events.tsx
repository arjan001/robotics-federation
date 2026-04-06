import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/events')({
  component: AdminEventsPage,
})

const fields: FieldConfig[] = [
  { key: 'name', label: 'Event Name', type: 'text', required: true },
  { key: 'date', label: 'Date', type: 'text', required: true },
  { key: 'location', label: 'Location', type: 'text', required: true },
  {
    key: 'status',
    label: 'Status',
    type: 'badge',
    badgeVariant: (val) => {
      if (val === 'current') return 'success'
      if (val === 'upcoming') return 'info'
      return 'default'
    },
    showInForm: false,
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'past', label: 'Past' },
      { value: 'current', label: 'Current' },
      { value: 'upcoming', label: 'Upcoming' },
    ],
    showInTable: false,
    required: true,
  },
  { key: 'description', label: 'Description', type: 'textarea', showInTable: false },
  { key: 'teamsParticipated', label: 'Teams', type: 'number' },
  { key: 'highlights', label: 'Highlights', type: 'tags', showInTable: false },
]

function AdminEventsPage() {
  return (
    <ContentCrudPage
      moduleName="events"
      title="Events"
      subtitle="Manage the full events timeline"
      defaultItems={DEFAULT_CONTENT_STORE.events}
      fields={fields}
    />
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/partners')({
  component: AdminPartnersPage,
})

const fields: FieldConfig[] = [
  { key: 'name', label: 'Partner Name', type: 'text', required: true },
  {
    key: 'type',
    label: 'Type',
    type: 'badge',
    badgeVariant: (val) => {
      if (val === 'sponsor') return 'success'
      if (val === 'technology') return 'info'
      if (val === 'educational') return 'warning'
      return 'default'
    },
    showInForm: false,
  },
  {
    key: 'type',
    label: 'Type',
    type: 'select',
    options: [
      { value: 'sponsor', label: 'Sponsor' },
      { value: 'technology', label: 'Technology' },
      { value: 'educational', label: 'Educational' },
      { value: 'media', label: 'Media' },
    ],
    showInTable: false,
    required: true,
  },
  { key: 'description', label: 'Description', type: 'textarea', showInTable: false },
  { key: 'contribution', label: 'Contribution', type: 'textarea' },
]

function AdminPartnersPage() {
  return (
    <ContentCrudPage
      moduleName="partners"
      title="Partners"
      subtitle="Manage partner and sponsor records"
      defaultItems={DEFAULT_CONTENT_STORE.partners}
      fields={fields}
    />
  )
}

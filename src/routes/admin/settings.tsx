import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettingsPage,
})

const fields: FieldConfig[] = [
  { key: 'siteName', label: 'Site Name', type: 'text', required: true },
  { key: 'organizationName', label: 'Organization', type: 'text', required: true },
  { key: 'siteTagline', label: 'Tagline', type: 'textarea' },
  { key: 'contactEmail', label: 'Contact Email', type: 'text' },
]

function AdminSettingsPage() {
  return (
    <ContentCrudPage
      moduleName="settings"
      title="Settings"
      subtitle="Manage global application settings"
      defaultItems={DEFAULT_CONTENT_STORE.settings}
      fields={fields}
    />
  )
}

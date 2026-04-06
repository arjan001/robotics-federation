import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/footer')({
  component: AdminFooterPage,
})

const fields: FieldConfig[] = [
  { key: 'tagline', label: 'Tagline', type: 'textarea', required: true },
  { key: 'copyright', label: 'Copyright', type: 'text', required: true },
  { key: 'email', label: 'Contact Email', type: 'text', required: true },
]

function AdminFooterPage() {
  return (
    <ContentCrudPage
      moduleName="footer"
      title="Footer"
      subtitle="Manage footer copy and contact information"
      defaultItems={DEFAULT_CONTENT_STORE.footer}
      fields={fields}
    />
  )
}

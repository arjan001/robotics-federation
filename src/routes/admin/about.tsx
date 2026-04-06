import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/about')({
  component: AdminAboutPage,
})

const fields: FieldConfig[] = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'subtitle', label: 'Subtitle', type: 'textarea', required: true },
]

function AdminAboutPage() {
  return (
    <ContentCrudPage
      moduleName="about-content"
      title="About Page"
      subtitle="Manage About page headline and summary content"
      defaultItems={DEFAULT_CONTENT_STORE['about-content']}
      fields={fields}
    />
  )
}

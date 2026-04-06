import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/home')({
  component: AdminHomePage,
})

const fields: FieldConfig[] = [
  { key: 'heroTitle', label: 'Hero Title', type: 'text', required: true },
  { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', required: true },
  { key: 'primaryCtaLabel', label: 'Primary CTA Label', type: 'text' },
  { key: 'primaryCtaHref', label: 'Primary CTA Link', type: 'text' },
  { key: 'secondaryCtaLabel', label: 'Secondary CTA Label', type: 'text' },
  { key: 'secondaryCtaHref', label: 'Secondary CTA Link', type: 'text' },
]

function AdminHomePage() {
  return (
    <ContentCrudPage
      moduleName="home"
      title="Home Page"
      subtitle="Manage homepage hero content and call-to-action buttons"
      defaultItems={DEFAULT_CONTENT_STORE.home}
      fields={fields}
    />
  )
}

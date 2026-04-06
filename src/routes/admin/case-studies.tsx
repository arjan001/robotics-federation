import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/case-studies')({
  component: AdminCaseStudiesPage,
})

const fields: FieldConfig[] = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'category', label: 'Category', type: 'text', required: true },
  { key: 'summary', label: 'Summary', type: 'textarea' },
  { key: 'challenge', label: 'Challenge', type: 'textarea', showInTable: false },
  { key: 'solution', label: 'Solution', type: 'textarea', showInTable: false },
  { key: 'outcomes', label: 'Outcomes', type: 'tags', showInTable: false },
  { key: 'accent', label: 'Accent Color', type: 'text', showInTable: false },
]

function AdminCaseStudiesPage() {
  return (
    <ContentCrudPage
      moduleName="case-studies"
      title="Case Studies"
      subtitle="Manage portfolio case studies displayed on the About page"
      defaultItems={DEFAULT_CONTENT_STORE['case-studies']}
      fields={fields}
    />
  )
}

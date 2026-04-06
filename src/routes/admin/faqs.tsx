import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/faqs')({
  component: AdminFaqsPage,
})

const fields: FieldConfig[] = [
  { key: 'question', label: 'Question', type: 'text', required: true },
  { key: 'answer', label: 'Answer', type: 'textarea', required: true },
]

function AdminFaqsPage() {
  return (
    <ContentCrudPage
      moduleName="about-faqs"
      title="FAQs"
      subtitle="Manage frequently asked questions shown on the About page"
      defaultItems={DEFAULT_CONTENT_STORE['about-faqs']}
      fields={fields}
    />
  )
}

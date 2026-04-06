import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/register')({
  component: AdminRegisterPage,
})

const fields: FieldConfig[] = [
  { key: 'title', label: 'Page Title', type: 'text', required: true },
  { key: 'subtitle', label: 'Page Subtitle', type: 'textarea' },
  { key: 'teamTitle', label: 'Team Card Title', type: 'text' },
  { key: 'teamDescription', label: 'Team Card Description', type: 'textarea', showInTable: false },
  { key: 'partnerTitle', label: 'Partner Card Title', type: 'text' },
  { key: 'partnerDescription', label: 'Partner Card Description', type: 'textarea', showInTable: false },
]

function AdminRegisterPage() {
  return (
    <ContentCrudPage
      moduleName="register"
      title="Register Page"
      subtitle="Manage registration page content and copy"
      defaultItems={DEFAULT_CONTENT_STORE.register}
      fields={fields}
    />
  )
}

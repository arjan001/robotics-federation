import { createFileRoute } from '@tanstack/react-router'
import { ContentCrudPage, type FieldConfig } from '@/components/admin/ContentCrudPage'
import { DEFAULT_CONTENT_STORE } from '@/lib/content-store.defaults'

export const Route = createFileRoute('/admin/categories')({
  component: AdminCategoriesPage,
})

const fields: FieldConfig[] = [
  { key: 'name', label: 'Category Name', type: 'text', required: true },
  { key: 'track', label: 'Track', type: 'text', required: true },
  {
    key: 'status',
    label: 'Status',
    type: 'badge',
    badgeVariant: (val) => (val === 'Active' ? 'success' : 'warning'),
    showInForm: false,
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
    ],
    showInTable: false,
    required: true,
  },
]

function AdminCategoriesPage() {
  return (
    <ContentCrudPage
      moduleName="categories"
      title="Categories"
      subtitle="Manage competition categories and taxonomy"
      defaultItems={DEFAULT_CONTENT_STORE.categories}
      fields={fields}
    />
  )
}

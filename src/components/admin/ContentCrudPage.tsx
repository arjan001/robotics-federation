import { useMemo, useState } from 'react'
import {
  ActionButtons,
  AdminButton,
  AdminCard,
  AdminModal,
  AdminPage,
  AdminTable,
  Badge,
  FormField,
  SelectInput,
  TextArea,
  TextInput,
} from '@/components/admin/AdminUI'
import { useContentModule, type ContentItem } from '@/lib/use-content-module'
import type { ContentModuleName } from '@/lib/content-store.defaults'
import { Plus } from 'lucide-react'

export type FieldType = 'text' | 'textarea' | 'select' | 'number' | 'tags' | 'badge'

export type FieldConfig = {
  key: string
  label: string
  type: FieldType
  options?: { value: string; label: string }[]
  showInTable?: boolean
  showInForm?: boolean
  required?: boolean
  badgeVariant?: (val: string) => 'default' | 'success' | 'warning' | 'danger' | 'info'
}

type ContentCrudPageProps<TItem extends ContentItem> = {
  moduleName: ContentModuleName
  title: string
  subtitle: string
  defaultItems: TItem[]
  fields: FieldConfig[]
}

function getFieldValue(item: ContentItem, key: string): unknown {
  return (item as Record<string, unknown>)[key]
}

function renderCellValue(item: ContentItem, field: FieldConfig): React.ReactNode {
  const val = getFieldValue(item, field.key)

  if (val === undefined || val === null) return <span style={{ color: '#94a3b8' }}>—</span>

  if (field.type === 'badge') {
    const strVal = String(val)
    const variant = field.badgeVariant ? field.badgeVariant(strVal) : 'default'
    return <Badge variant={variant}>{strVal}</Badge>
  }

  if (field.type === 'tags') {
    const arr = Array.isArray(val) ? val : []
    if (arr.length === 0) return <span style={{ color: '#94a3b8' }}>—</span>
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {arr.slice(0, 3).map((tag, i) => (
          <Badge key={i} variant="info">{String(tag)}</Badge>
        ))}
        {arr.length > 3 && <Badge variant="default">+{arr.length - 3}</Badge>}
      </div>
    )
  }

  if (field.type === 'textarea') {
    const strVal = String(val)
    return (
      <span style={{ display: 'block', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {strVal}
      </span>
    )
  }

  return String(val)
}

export function ContentCrudPage<TItem extends ContentItem>({
  moduleName,
  title,
  subtitle,
  defaultItems,
  fields,
}: ContentCrudPageProps<TItem>) {
  const { items, loading, error, create, update, remove, reset } = useContentModule<TItem>(moduleName, defaultItems)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const records = useMemo(() => items, [items])
  const tableFields = useMemo(() => fields.filter((f) => f.showInTable !== false), [fields])
  const formFields = useMemo(() => fields.filter((f) => f.showInForm !== false), [fields])

  const buildFormData = (item?: TItem): Record<string, string> => {
    const data: Record<string, string> = { id: item?.id ?? '' }
    for (const field of fields) {
      const val = item ? getFieldValue(item, field.key) : undefined
      if (field.type === 'tags') {
        data[field.key] = Array.isArray(val) ? (val as string[]).join(', ') : ''
      } else {
        data[field.key] = val !== undefined && val !== null ? String(val) : ''
      }
    }
    return data
  }

  const openCreateModal = () => {
    setEditingId(null)
    setFormData(buildFormData())
    setActionError(null)
    setModalOpen(true)
  }

  const openEditModal = (item: TItem) => {
    setEditingId(item.id)
    setFormData(buildFormData(item))
    setActionError(null)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setActionError(null)
  }

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setActionError(null)

    try {
      const payload: Record<string, unknown> = { id: formData.id?.trim() || editingId || '' }

      for (const field of fields) {
        const raw = formData[field.key] ?? ''
        if (field.type === 'number') {
          payload[field.key] = raw === '' ? 0 : Number(raw)
        } else if (field.type === 'tags') {
          payload[field.key] = raw
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        } else {
          payload[field.key] = raw
        }
      }

      if (!payload.id || typeof payload.id !== 'string') {
        throw new Error('Record ID is required')
      }

      if (editingId) {
        await update(editingId, payload as Partial<TItem>)
      } else {
        await create(payload as TItem)
      }

      closeModal()
    } catch (saveError) {
      setActionError(saveError instanceof Error ? saveError.message : 'Unable to save record')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setActionError(null)
    try {
      await remove(id)
    } catch (deleteError) {
      setActionError(deleteError instanceof Error ? deleteError.message : 'Unable to delete record')
    }
  }

  return (
    <AdminPage
      title={title}
      subtitle={subtitle}
      actions={
        <>
          <AdminButton variant="secondary" onClick={() => void reset()}>
            Reset Module
          </AdminButton>
          <AdminButton variant="primary" onClick={openCreateModal}>
            <Plus size={14} /> Add Record
          </AdminButton>
        </>
      }
    >
      <AdminCard
        title="Module Records"
        subtitle={loading ? 'Loading records...' : `${records.length} record(s) in ${moduleName}`}
      >
        {error && (
          <p style={{ color: 'var(--danger, #dc2626)', marginBottom: 12 }}>
            {error}
          </p>
        )}
        {actionError && (
          <p style={{ color: 'var(--danger, #dc2626)', marginBottom: 12 }}>
            {actionError}
          </p>
        )}
        <AdminTable columns={['ID', ...tableFields.map((f) => f.label), 'Actions']}>
          {records.map((item) => (
            <tr key={item.id}>
              <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{item.id}</td>
              {tableFields.map((field) => (
                <td key={field.key}>{renderCellValue(item, field)}</td>
              ))}
              <td>
                <ActionButtons
                  onEdit={() => openEditModal(item)}
                  onDelete={() => void handleDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      <AdminModal
        open={modalOpen}
        onClose={closeModal}
        title={editingId ? 'Edit Record' : 'Create Record'}
        footer={
          <>
            <AdminButton variant="secondary" onClick={closeModal}>
              Cancel
            </AdminButton>
            <AdminButton variant="primary" onClick={() => void handleSave()} disabled={saving}>
              {saving ? 'Saving...' : 'Save Record'}
            </AdminButton>
          </>
        }
      >
        <FormField label="Record ID" required>
          <TextInput
            value={formData.id ?? ''}
            onChange={(val) => updateField('id', val)}
            placeholder="unique-record-id"
          />
        </FormField>
        {formFields.map((field) => (
          <FormField key={field.key} label={field.label} required={field.required}>
            {field.type === 'textarea' ? (
              <TextArea
                value={formData[field.key] ?? ''}
                onChange={(val) => updateField(field.key, val)}
                rows={4}
              />
            ) : field.type === 'select' && field.options ? (
              <SelectInput
                value={formData[field.key] ?? ''}
                onChange={(val) => updateField(field.key, val)}
                options={field.options}
                placeholder={`Select ${field.label.toLowerCase()}`}
              />
            ) : field.type === 'tags' ? (
              <TextInput
                value={formData[field.key] ?? ''}
                onChange={(val) => updateField(field.key, val)}
                placeholder="Comma-separated values"
              />
            ) : field.type === 'number' ? (
              <TextInput
                value={formData[field.key] ?? ''}
                onChange={(val) => updateField(field.key, val)}
                type="number"
                placeholder="0"
              />
            ) : (
              <TextInput
                value={formData[field.key] ?? ''}
                onChange={(val) => updateField(field.key, val)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            )}
          </FormField>
        ))}
      </AdminModal>
    </AdminPage>
  )
}

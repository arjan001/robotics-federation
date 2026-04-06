import { ReactNode } from 'react'
import { Pencil, Trash2, Eye, GripVertical } from 'lucide-react'

// Page wrapper
export function AdminPage({ title, subtitle, actions, children }: {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{title}</h1>
          {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="admin-page-actions">{actions}</div>}
      </div>
      {children}
    </div>
  )
}

// Stat card
export function StatCard({ label, value, change, icon }: {
  label: string
  value: string | number
  change?: string
  icon: ReactNode
}) {
  const isPositive = change?.startsWith('+')
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-icon">{icon}</div>
      <div className="admin-stat-info">
        <span className="admin-stat-value">{value}</span>
        <span className="admin-stat-label">{label}</span>
      </div>
      {change && (
        <span className={`admin-stat-change ${isPositive ? 'positive' : 'negative'}`}>
          {change}
        </span>
      )}
    </div>
  )
}

// Card container
export function AdminCard({ title, subtitle, actions, children, className }: {
  title?: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`admin-card ${className || ''}`}>
      {(title || actions) && (
        <div className="admin-card-header">
          <div>
            {title && <h3 className="admin-card-title">{title}</h3>}
            {subtitle && <p className="admin-card-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="admin-card-actions">{actions}</div>}
        </div>
      )}
      <div className="admin-card-body">{children}</div>
    </div>
  )
}

// Table
export function AdminTable({ columns, children }: {
  columns: string[]
  children: ReactNode
}) {
  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

// Badge
export function Badge({ variant = 'default', children }: {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  children: ReactNode
}) {
  return <span className={`admin-badge admin-badge-${variant}`}>{children}</span>
}

// Action buttons
export function ActionButtons({ onEdit, onDelete, onView }: {
  onEdit?: () => void
  onDelete?: () => void
  onView?: () => void
}) {
  return (
    <div className="admin-action-buttons">
      {onView && (
        <button className="admin-action-btn view" onClick={onView} title="View">
          <Eye size={15} />
        </button>
      )}
      {onEdit && (
        <button className="admin-action-btn edit" onClick={onEdit} title="Edit">
          <Pencil size={15} />
        </button>
      )}
      {onDelete && (
        <button className="admin-action-btn delete" onClick={onDelete} title="Delete">
          <Trash2 size={15} />
        </button>
      )}
    </div>
  )
}

// Primary button
export function AdminButton({ variant = 'primary', size = 'md', children, onClick, disabled, type }: {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  return (
    <button
      className={`admin-btn admin-btn-${variant} admin-btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      type={type || 'button'}
    >
      {children}
    </button>
  )
}

// Form input
export function FormField({ label, required, children, hint }: {
  label: string
  required?: boolean
  children: ReactNode
  hint?: string
}) {
  return (
    <div className="admin-form-field">
      <label className="admin-form-label">
        {label}
        {required && <span className="admin-form-required">*</span>}
      </label>
      {children}
      {hint && <p className="admin-form-hint">{hint}</p>}
    </div>
  )
}

export function TextInput({ placeholder, value, onChange, type = 'text' }: {
  placeholder?: string
  value?: string
  onChange?: (val: string) => void
  type?: string
}) {
  return (
    <input
      className="admin-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
}

export function TextArea({ placeholder, value, onChange, rows = 4 }: {
  placeholder?: string
  value?: string
  onChange?: (val: string) => void
  rows?: number
}) {
  return (
    <textarea
      className="admin-input admin-textarea"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      rows={rows}
    />
  )
}

export function SelectInput({ options, value, onChange, placeholder }: {
  options: { value: string; label: string }[]
  value?: string
  onChange?: (val: string) => void
  placeholder?: string
}) {
  return (
    <select
      className="admin-input admin-select"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

// Toggle switch
export function ToggleSwitch({ label, checked, onChange }: {
  label: string
  checked: boolean
  onChange: (val: boolean) => void
}) {
  return (
    <label className="admin-toggle">
      <div className={`admin-toggle-track ${checked ? 'active' : ''}`} onClick={() => onChange(!checked)}>
        <div className="admin-toggle-thumb" />
      </div>
      <span className="admin-toggle-label">{label}</span>
    </label>
  )
}

// Tabs
export function AdminTabs({ tabs, activeTab, onTabChange }: {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (id: string) => void
}) {
  return (
    <div className="admin-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// Empty state
export function EmptyState({ icon, title, description, action }: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="admin-empty-state">
      <div className="admin-empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}

// Drag handle
export function DragHandle() {
  return (
    <span className="admin-drag-handle">
      <GripVertical size={16} />
    </span>
  )
}

// Section divider
export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="admin-divider">
      {label && <span>{label}</span>}
    </div>
  )
}

// Modal
export function AdminModal({ open, onClose, title, children, footer }: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}) {
  if (!open) return null
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>{title}</h2>
          <button className="admin-modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="admin-modal-body">{children}</div>
        {footer && <div className="admin-modal-footer">{footer}</div>}
      </div>
    </div>
  )
}

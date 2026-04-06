import { useRouterState, useNavigate } from '@tanstack/react-router'
import { Bell, Search, User, ChevronRight, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean)
  const crumbs: { label: string; path: string }[] = []
  let path = ''
  for (const part of parts) {
    path += '/' + part
    crumbs.push({
      label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
      path,
    })
  }
  return crumbs
}

interface SessionUser {
  name: string
  email: string
  role: string
}

export function AdminHeader() {
  const routerState = useRouterState()
  const navigate = useNavigate()
  const breadcrumbs = getBreadcrumbs(routerState.location.pathname)
  const [searchOpen, setSearchOpen] = useState(false)
  const [user, setUser] = useState<SessionUser | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('admin_user')
      if (stored) {
        setUser(JSON.parse(stored) as SessionUser)
      }
    } catch {
      // ignore
    }
  }, [])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      localStorage.removeItem('admin_user')
      void navigate({ to: '/admin-login' as string })
    } catch {
      void navigate({ to: '/admin-login' as string })
    }
  }

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <nav className="admin-breadcrumbs">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.path} className="admin-breadcrumb">
              {i > 0 && <ChevronRight size={14} className="admin-breadcrumb-sep" />}
              <span className={i === breadcrumbs.length - 1 ? 'admin-breadcrumb-active' : ''}>
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      </div>

      <div className="admin-header-right">
        <div className={`admin-search-wrapper ${searchOpen ? 'open' : ''}`}>
          <button className="admin-icon-btn" onClick={() => setSearchOpen(!searchOpen)}>
            <Search size={18} />
          </button>
          {searchOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="admin-search-input"
              autoFocus
            />
          )}
        </div>

        <button className="admin-icon-btn admin-notification-btn">
          <Bell size={18} />
          <span className="admin-notification-badge">3</span>
        </button>

        <div className="admin-user-menu" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="admin-avatar">
            <User size={18} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span className="admin-user-name" style={{ fontSize: 13, fontWeight: 600 }}>
              {user?.name || 'Admin'}
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>
              {user?.role || 'User'}
            </span>
          </div>
          <button
            className="admin-icon-btn"
            onClick={() => void handleLogout()}
            disabled={loggingOut}
            title="Sign out"
            style={{ marginLeft: 4, color: 'var(--text-muted)' }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}

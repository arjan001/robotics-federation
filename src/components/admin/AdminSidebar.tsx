import { Link, useRouterState } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Home,
  Info,
  PanelBottom,
  Calendar,
  Trophy,
  Grid3X3,
  Handshake,
  Network,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Shield,
  ClipboardList,
  UserPlus,
  GraduationCap,
  UserCog,
  BookOpen,
  HelpCircle,
  FileText,
  LogOut,
} from 'lucide-react'
import { useState, useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    ],
  },
  {
    label: 'Content Management',
    items: [
      { label: 'Home Page', path: '/admin/home', icon: <Home size={18} /> },
      { label: 'About Page', path: '/admin/about', icon: <Info size={18} /> },
      { label: 'FAQs', path: '/admin/faqs', icon: <HelpCircle size={18} /> },
      { label: 'Case Studies', path: '/admin/case-studies', icon: <BookOpen size={18} /> },
      { label: 'Register Page', path: '/admin/register', icon: <FileText size={18} /> },
      { label: 'Footer', path: '/admin/footer', icon: <PanelBottom size={18} /> },
    ],
  },
  {
    label: 'Events & Competitions',
    items: [
      { label: 'Events', path: '/admin/events', icon: <Calendar size={18} /> },
      { label: 'Challenges', path: '/admin/challenges', icon: <Trophy size={18} /> },
      { label: 'Categories', path: '/admin/categories', icon: <Grid3X3 size={18} /> },
    ],
  },
  {
    label: 'Registrations',
    items: [
      { label: 'Partner Registrations', path: '/admin/partner-registrations', icon: <ClipboardList size={18} /> },
      { label: 'Team Registrations', path: '/admin/team-registrations', icon: <UserPlus size={18} /> },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Partners', path: '/admin/partners', icon: <Handshake size={18} /> },
      { label: 'Schools', path: '/admin/schools', icon: <GraduationCap size={18} /> },
      { label: 'Organizers', path: '/admin/organizers', icon: <UserCog size={18} /> },
      { label: 'Ecosystem', path: '/admin/ecosystem', icon: <Network size={18} /> },
    ],
  },
  {
    label: 'Administration',
    items: [
      { label: 'Users & Roles', path: '/admin/users', icon: <Users size={18} /> },
      { label: 'Permissions', path: '/admin/permissions', icon: <Shield size={18} /> },
      { label: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
    ],
  },
]

export function AdminSidebar() {
  const routerState = useRouterState()
  const navigate = useNavigate()
  const currentPath = routerState.location.pathname
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleGroup = (label: string) => {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const isActive = (path: string) => {
    if (path === '/admin') return currentPath === '/admin'
    return currentPath.startsWith(path)
  }

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      localStorage.removeItem('admin_user')
    } catch {
      // continue to redirect
    }
    void navigate({ to: '/admin-login' as string })
  }, [navigate])

  const sidebarContent = (
    <>
      <div className="admin-sidebar-brand">
        <img src="/rfk-logo.png" alt="RFK" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'contain' }} />
        <div>
          <div className="admin-sidebar-title">Robotics Federation</div>
          <div className="admin-sidebar-subtitle">Admin Panel</div>
        </div>
      </div>

      <nav className="admin-sidebar-nav">
        {navGroups.map((group) => (
          <div key={group.label} className="admin-nav-group">
            <button
              className="admin-nav-group-header"
              onClick={() => toggleGroup(group.label)}
            >
              <span>{group.label}</span>
              {collapsed[group.label] ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
            </button>
            {!collapsed[group.label] && (
              <ul className="admin-nav-list">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <Link to="/" className="admin-nav-item" onClick={() => setMobileOpen(false)}>
          <Home size={18} />
          <span>View Website</span>
        </Link>
        <button
          className="admin-nav-item"
          onClick={() => void handleLogout()}
          style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', color: 'inherit', fontSize: 'inherit' }}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      <button
        className="admin-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
        {sidebarContent}
      </aside>
    </>
  )
}

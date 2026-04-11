import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X, ChevronDown } from 'lucide-react'

interface NavLink {
  label: string
  to: string
  children?: undefined
}

interface NavGroup {
  label: string
  to?: undefined
  children: { label: string; to: string }[]
}

type NavItem = NavLink | NavGroup

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/challenges' },
  { label: 'Events', to: '/events' },
  {
    label: 'Ecosystem',
    children: [
      { label: 'Member Schools', to: '/schools' },
      { label: 'Partners & Affiliates', to: '/partners' },
      { label: 'Leadership', to: '/organizers' },
    ],
  },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ecosystemOpen, setEcosystemOpen] = useState(false)

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img
              src="/rfk-logo.png"
              alt="Robotics Federation of Kenya"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setEcosystemOpen(true)}
                  onMouseLeave={() => setEcosystemOpen(false)}
                >
                  <button
                    className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors hover:bg-slate-100"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                  >
                    {item.label}
                    <ChevronDown size={14} />
                  </button>
                  {ecosystemOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 w-52 rounded-lg py-2 shadow-xl border"
                      style={{
                        background: '#ffffff',
                        borderColor: 'var(--border-color)',
                      }}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-2.5 text-sm no-underline transition-colors hover:bg-slate-50"
                          style={{ color: 'var(--text-secondary)' }}
                          onClick={() => setEcosystemOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors hover:bg-slate-100"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              to="/register"
              className="ml-3 px-5 py-2.5 rounded-lg text-sm font-semibold no-underline text-white transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              Get Involved
            </Link>
          </nav>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-4 space-y-1"
          style={{ borderColor: 'var(--border-color)', background: '#ffffff' }}
        >
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    className="block px-6 py-2 text-sm no-underline rounded-lg"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="block px-3 py-2 text-sm font-medium no-underline rounded-lg"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            to="/register"
            className="block mx-3 mt-3 px-5 py-2.5 rounded-lg text-sm font-semibold no-underline text-white text-center"
            style={{ background: 'var(--accent)' }}
            onClick={() => setMobileOpen(false)}
          >
            Get Involved
          </Link>
        </div>
      )}
    </header>
  )
}

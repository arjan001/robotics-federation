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
  { label: 'Challenges', to: '/challenges' },
  { label: 'Events', to: '/events' },
  {
    label: 'Ecosystem',
    children: [
      { label: 'Schools', to: '/schools' },
      { label: 'Partners & Sponsors', to: '/partners' },
      { label: 'Organizers', to: '/organizers' },
    ],
  },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ecosystemOpen, setEcosystemOpen] = useState(false)

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img
              src="/inspire-robotics-logo.jpeg"
              alt="Inspire Robotics"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <span className="font-bold text-xl hidden sm:block text-white">
              Inspire Robotics
            </span>
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
                    className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors text-white/70 hover:text-white"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {item.label}
                    <ChevronDown size={14} />
                  </button>
                  {ecosystemOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 w-52 rounded-lg py-2 shadow-lg border"
                      style={{
                        background: 'var(--bg-dark-secondary)',
                        borderColor: 'rgba(255,255,255,0.1)',
                      }}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-2 text-sm no-underline text-white/70 hover:text-white transition-colors"
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
                  className="px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors text-white/70 hover:text-white"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              to="/register"
              className="ml-2 px-5 py-2 rounded-lg text-sm font-semibold no-underline text-white transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              Register Interest
            </Link>
          </nav>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
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
          style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'var(--bg-dark)' }}
        >
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    className="block px-6 py-2 text-sm no-underline rounded-lg text-white/70"
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
                className="block px-3 py-2 text-sm font-medium no-underline rounded-lg text-white/70"
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
            Register Interest
          </Link>
        </div>
      )}
    </header>
  )
}

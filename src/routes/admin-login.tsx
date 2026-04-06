import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin-login')({
  component: AdminLoginPage,
})

function AdminLoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      setError('Email and password are required')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      let data: { success?: boolean; session?: { role: string }; error?: string }
      try {
        data = (await res.json()) as { success?: boolean; session?: { role: string }; error?: string }
      } catch {
        setError('Server error. Please try again later.')
        return
      }

      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }

      if (data.session) {
        localStorage.setItem('admin_user', JSON.stringify(data.session))
      }

      void navigate({ to: '/admin' as string })
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-12"
      style={{ background: '#f5f5f3', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl text-white"
            style={{ background: 'var(--accent, #c24b3b)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>
            Welcome back
          </h1>
          <p className="text-sm mt-2" style={{ color: '#555' }}>
            Sign in to the Inspire Robotics admin panel
          </p>
        </div>

        <div className="rounded-2xl p-8" style={{
          background: '#ffffff',
          border: '1px solid #e5e5e5',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.04)',
        }}>
          {error && (
            <div className="rounded-lg px-4 py-3 text-sm mb-5" style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b5423a',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={(e) => void handleSubmit(e)}>
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
                style={{
                  background: '#f5f5f3',
                  border: '1px solid #e5e5e5',
                  color: '#1a1a1a',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent, #c24b3b)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e5e5' }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
                style={{
                  background: '#f5f5f3',
                  border: '1px solid #e5e5e5',
                  color: '#1a1a1a',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent, #c24b3b)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e5e5' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg text-white text-sm font-semibold transition-all"
              style={{
                background: loading ? '#888' : 'var(--accent, #c24b3b)',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'var(--accent-hover, #a33830)' }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = 'var(--accent, #c24b3b)' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm" style={{ color: '#555' }}>
            Need an account?{' '}
            <a href="/admin-signup" className="font-semibold transition-colors" style={{ color: 'var(--accent, #c24b3b)', textDecoration: 'none' }}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin-signup')({
  component: AdminRegisterPage,
})

function AdminRegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.name || !form.email || !form.password) {
      setError('All fields are required')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      })

      let data: { success?: boolean; user?: { role: string }; error?: string }
      try {
        data = (await res.json()) as { success?: boolean; user?: { role: string }; error?: string }
      } catch {
        setError('Server error. Please try again later.')
        return
      }

      if (!res.ok) {
        setError(data.error || 'Registration failed')
        return
      }

      setSuccess(`Account created successfully as ${data.user?.role}. Redirecting to login...`)
      setTimeout(() => {
        void navigate({ to: '/admin-login' as string })
      }, 2000)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
  const inputStyle = {
    background: '#f5f5f3',
    border: '1px solid #e5e5e5',
    color: '#1a1a1a',
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-12"
      style={{ background: '#f5f5f3', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="w-full max-w-[460px]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl text-white"
            style={{ background: 'var(--accent, #c41e2a)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>
            Create your account
          </h1>
          <p className="text-sm mt-2" style={{ color: '#555' }}>
            Register as an admin for the Robotics Federation
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

          {success && (
            <div className="rounded-lg px-4 py-3 text-sm mb-5" style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#166534',
            }}>
              {success}
            </div>
          )}

          <form onSubmit={(e) => void handleSubmit(e)}>
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Enter your full name"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent, #c41e2a)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e5e5' }}
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="admin@example.com"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent, #c41e2a)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e5e5' }}
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="Min 6 characters"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent, #c41e2a)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e5e5' }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                placeholder="Re-enter your password"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent, #c41e2a)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e5e5' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg text-white text-sm font-semibold transition-all"
              style={{
                background: loading ? '#888' : 'var(--accent, #c41e2a)',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'var(--accent-hover, #a33830)' }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = 'var(--accent, #c41e2a)' }}
            >
              {loading ? 'Creating Account...' : 'Create Admin Account'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm" style={{ color: '#555' }}>
            Already have an account?{' '}
            <a href="/admin-login" className="font-semibold transition-colors" style={{ color: 'var(--accent, #c41e2a)', textDecoration: 'none' }}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

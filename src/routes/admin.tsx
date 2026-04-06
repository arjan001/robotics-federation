import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { createContext, useContext, useEffect, useState } from 'react'
import '../admin.css'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

export const AdminAuthContext = createContext<AuthUser | null>(null)

export function useAdminAuth(): AuthUser | null {
  return useContext(AdminAuthContext)
}

function AdminLayout() {
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/session')
        if (!res.ok) {
          if (!cancelled) {
            void navigate({ to: '/admin-login' as string })
          }
          return
        }
        const data = (await res.json()) as { authenticated: boolean; user?: AuthUser }
        if (!data.authenticated) {
          if (!cancelled) {
            void navigate({ to: '/admin-login' as string })
          }
          return
        }
        if (!cancelled) {
          setAuthUser(data.user ?? null)
          setChecking(false)
        }
      } catch {
        if (!cancelled) {
          void navigate({ to: '/admin-login' as string })
        }
      }
    }
    void checkSession()
    return () => { cancelled = true }
  }, [navigate])

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        color: '#94a3b8',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48,
            height: 48,
            border: '3px solid rgba(99,102,241,0.2)',
            borderTopColor: '#6366f1',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }} />
          <p>Verifying session...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    )
  }

  return (
    <AdminAuthContext.Provider value={authUser}>
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <AdminHeader />
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      </div>
    </AdminAuthContext.Provider>
  )
}

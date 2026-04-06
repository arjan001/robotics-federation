import { createAPIFileRoute } from '@tanstack/react-start/api'
import { registerUser, getUserCount } from '@/lib/auth-store.server'

export const APIRoute = createAPIFileRoute('/api/auth/register')({
  POST: async ({ request }) => {
    try {
      let body: { name?: string; email?: string; password?: string }
      try {
        body = (await request.json()) as { name?: string; email?: string; password?: string }
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const { name, email, password } = body

      if (!name || !email || !password) {
        return new Response(JSON.stringify({ error: 'Name, email, and password are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      if (password.length < 6) {
        return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({ error: 'Invalid email format' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      // Determine role - first user is always Super Admin, subsequent users are always Viewer
      // (Super Admins can promote users later via the admin panel)
      const userCount = await getUserCount()
      const assignedRole = userCount === 0 ? 'Super Admin' : 'Viewer'

      const user = await registerUser(name, email, password, assignedRole)

      return new Response(
        JSON.stringify({
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
          },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      const status = message.includes('Unable to access') || message.includes('Unable to save') ? 500 : 400
      return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
})

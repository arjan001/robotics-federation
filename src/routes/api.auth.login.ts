import { createAPIFileRoute } from '@tanstack/react-start/api'
import { loginUser } from '@/lib/auth-store.server'

export const APIRoute = createAPIFileRoute('/api/auth/login')({
  POST: async ({ request }) => {
    try {
      let body: { email?: string; password?: string }
      try {
        body = (await request.json()) as { email?: string; password?: string }
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const { email, password } = body

      if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Email and password are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const session = await loginUser(email, password)

      return new Response(
        JSON.stringify({
          success: true,
          session: {
            id: session.id,
            userId: session.userId,
            name: session.name,
            email: session.email,
            role: session.role,
            expiresAt: session.expiresAt,
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `admin_session=${session.id}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
          },
        }
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      const status = message.includes('Unable to') ? 500 : 401
      return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
})

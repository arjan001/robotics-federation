import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { getSession } from '@/lib/auth-store.server'

export const APIRoute = createAPIFileRoute('/api/auth/session')({
  GET: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get('cookie') || ''
      const sessionId = cookieHeader
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('admin_session='))
        ?.split('=')[1]

      if (!sessionId) {
        return json({ authenticated: false }, { status: 401 })
      }

      const session = await getSession(sessionId)
      if (!session) {
        return json({ authenticated: false }, { status: 401 })
      }

      return json({
        authenticated: true,
        user: {
          id: session.userId,
          name: session.name,
          email: session.email,
          role: session.role,
        },
      })
    } catch {
      return json({ authenticated: false }, { status: 401 })
    }
  },
})

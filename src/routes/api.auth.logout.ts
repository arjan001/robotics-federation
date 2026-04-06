import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { destroySession } from '@/lib/auth-store.server'

export const APIRoute = createAPIFileRoute('/api/auth/logout')({
  POST: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get('cookie') || ''
      const sessionId = cookieHeader
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('admin_session='))
        ?.split('=')[1]

      if (sessionId) {
        await destroySession(sessionId)
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': 'admin_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0',
          },
        }
      )
    } catch {
      return json({ error: 'Logout failed' }, { status: 500 })
    }
  },
})

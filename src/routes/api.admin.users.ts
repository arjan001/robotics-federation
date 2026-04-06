import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { listUsers, registerUser, updateUser, deleteUser, getSession, changePassword } from '@/lib/auth-store.server'

export const APIRoute = createAPIFileRoute('/api/admin/users')({
  GET: async ({ request }) => {
    try {
      // Verify admin session
      const cookieHeader = request.headers.get('cookie') || ''
      const sessionId = cookieHeader
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('admin_session='))
        ?.split('=')[1]

      if (!sessionId) {
        return json({ error: 'Unauthorized' }, { status: 401 })
      }

      const session = await getSession(sessionId)
      if (!session) {
        return json({ error: 'Unauthorized' }, { status: 401 })
      }

      const users = await listUsers()
      return json({ users })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users'
      return json({ error: message }, { status: 500 })
    }
  },

  POST: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get('cookie') || ''
      const sessionId = cookieHeader
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('admin_session='))
        ?.split('=')[1]

      if (!sessionId) {
        return json({ error: 'Unauthorized' }, { status: 401 })
      }

      const session = await getSession(sessionId)
      if (!session || session.role !== 'Super Admin') {
        return json({ error: 'Only Super Admins can create users' }, { status: 403 })
      }

      const body = (await request.json()) as {
        name?: string
        email?: string
        password?: string
        role?: string
      }

      if (!body.name || !body.email || !body.password) {
        return json({ error: 'Name, email, and password are required' }, { status: 400 })
      }

      const user = await registerUser(
        body.name,
        body.email,
        body.password,
        (body.role as 'Super Admin' | 'Editor' | 'Viewer') || 'Viewer'
      )

      return json({
        success: true,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status },
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create user'
      return json({ error: message }, { status: 400 })
    }
  },

  PUT: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get('cookie') || ''
      const sessionId = cookieHeader
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('admin_session='))
        ?.split('=')[1]

      if (!sessionId) {
        return json({ error: 'Unauthorized' }, { status: 401 })
      }

      const session = await getSession(sessionId)
      if (!session || session.role !== 'Super Admin') {
        return json({ error: 'Only Super Admins can modify users' }, { status: 403 })
      }

      const body = (await request.json()) as {
        id?: string
        name?: string
        email?: string
        role?: string
        status?: string
      }

      if (!body.id) {
        return json({ error: 'User ID is required' }, { status: 400 })
      }

      const updated = await updateUser(body.id, {
        ...(body.name ? { name: body.name } : {}),
        ...(body.email ? { email: body.email } : {}),
        ...(body.role ? { role: body.role as 'Super Admin' | 'Editor' | 'Viewer' } : {}),
        ...(body.status ? { status: body.status as 'Active' | 'Inactive' } : {}),
      })

      if (!updated) {
        return json({ error: 'User not found' }, { status: 404 })
      }

      return json({ success: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user'
      return json({ error: message }, { status: 400 })
    }
  },

  PATCH: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get('cookie') || ''
      const sessionId = cookieHeader
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('admin_session='))
        ?.split('=')[1]

      if (!sessionId) {
        return json({ error: 'Unauthorized' }, { status: 401 })
      }

      const session = await getSession(sessionId)
      if (!session) {
        return json({ error: 'Unauthorized' }, { status: 401 })
      }

      const body = (await request.json()) as {
        id?: string
        name?: string
        email?: string
        role?: string
        status?: string
        password?: string
      }

      if (!body.id) {
        return json({ error: 'User ID is required' }, { status: 400 })
      }

      // Only Super Admin can modify other users
      if (body.id !== session.userId && session.role !== 'Super Admin') {
        return json({ error: 'Only Super Admins can modify other users' }, { status: 403 })
      }

      // Handle password change
      if (body.password) {
        if (body.password.length < 6) {
          return json({ error: 'Password must be at least 6 characters' }, { status: 400 })
        }
        const changed = await changePassword(body.id, body.password)
        if (!changed) {
          return json({ error: 'User not found' }, { status: 404 })
        }
      }

      // Handle other field updates
      const fieldUpdates: Record<string, string> = {}
      if (body.name) fieldUpdates.name = body.name
      if (body.email) fieldUpdates.email = body.email
      if (body.role && session.role === 'Super Admin') fieldUpdates.role = body.role
      if (body.status && session.role === 'Super Admin') fieldUpdates.status = body.status

      if (Object.keys(fieldUpdates).length > 0) {
        const updated = await updateUser(body.id, fieldUpdates as any)
        if (!updated) {
          return json({ error: 'User not found' }, { status: 404 })
        }
      }

      return json({ success: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to patch user'
      return json({ error: message }, { status: 400 })
    }
  },

  DELETE: async ({ request }) => {
    try {
      const cookieHeader = request.headers.get('cookie') || ''
      const sessionId = cookieHeader
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('admin_session='))
        ?.split('=')[1]

      if (!sessionId) {
        return json({ error: 'Unauthorized' }, { status: 401 })
      }

      const session = await getSession(sessionId)
      if (!session || session.role !== 'Super Admin') {
        return json({ error: 'Only Super Admins can delete users' }, { status: 403 })
      }

      const body = (await request.json()) as { id?: string }
      if (!body.id) {
        return json({ error: 'User ID is required' }, { status: 400 })
      }

      if (body.id === session.userId) {
        return json({ error: 'Cannot delete your own account' }, { status: 400 })
      }

      const deleted = await deleteUser(body.id)
      if (!deleted) {
        return json({ error: 'User not found' }, { status: 404 })
      }

      return json({ success: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user'
      return json({ error: message }, { status: 400 })
    }
  },
})

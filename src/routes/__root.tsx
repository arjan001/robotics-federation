import { HeadContent, Outlet, Scripts, createRootRoute, Link, useRouterState } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Inspire Robotics Challenge | Stemtrix EA',
      },
      {
        name: 'description',
        content:
          'Inspire Robotics Challenge is East Africa\'s premier robotics and AI competition for students ages 6-18. Organized by Stemtrix EA, fostering innovation, teamwork, and STEM education.',
      },
      {
        name: 'keywords',
        content:
          'robotics competition, STEM education, East Africa, Kenya, robotics challenge, AI competition, Stemtrix EA, student robotics, coding, engineering',
      },
      {
        property: 'og:title',
        content: 'Inspire Robotics Challenge | Stemtrix EA',
      },
      {
        property: 'og:description',
        content:
          'Inspire Robotics Challenge is East Africa\'s premier robotics and AI competition for students ages 6-18. Organized by Stemtrix EA, fostering innovation, teamwork, and STEM education.',
      },
      {
        property: 'og:image',
        content: '/og-image.jpeg',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Inspire Robotics Challenge | Stemtrix EA',
      },
      {
        name: 'twitter:description',
        content:
          'Inspire Robotics Challenge is East Africa\'s premier robotics and AI competition for students ages 6-18.',
      },
      {
        name: 'twitter:image',
        content: '/og-image.jpeg',
      },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  const routerState = useRouterState()
  const pathname = routerState.location.pathname
  const isAdmin = pathname.startsWith('/admin')
  const isAdminAuth = pathname === '/admin-login' || pathname === '/admin-signup'

  if (isAdmin || isAdminAuth) {
    return <Outlet />
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function NotFoundComponent() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <h1
        className="text-6xl font-bold mb-4"
        style={{ color: 'var(--accent)' }}
      >
        404
      </h1>
      <p
        className="text-xl mb-8"
        style={{ color: 'var(--text-secondary)' }}
      >
        Page not found
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg text-white font-medium no-underline"
        style={{ background: 'var(--accent)' }}
      >
        Back to Home
      </Link>
    </div>
  )
}

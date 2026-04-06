import { createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'
import { schools, stats, type School } from '@/data/ecosystem'
import { useContentModule } from '@/lib/use-content-module'
import { MapPin, Calendar } from 'lucide-react'

export const Route = createFileRoute('/schools')({
  component: SchoolsPage,
})

function SchoolsPage() {
  const { items: dynamicSchools } = useContentModule<School>('schools', schools)
  const schoolRecords = dynamicSchools

  return (
    <div>
      {/* Page banner */}
      <section className="py-24 px-4 text-center" style={{ background: 'var(--bg-dark)' }}>
        <FadeIn>
          <p className="text-sm text-white/50 uppercase tracking-widest mb-4">Home &mdash; Schools</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Member Schools</h1>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--text-on-dark-secondary)' }}>
            Schools across Kenya registered with the Robotics Federation to deliver structured STEM and robotics programs.
          </p>
        </FadeIn>
      </section>

      {/* Stats bar */}
      <section className="border-b" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-subtle, #e5e7eb)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'var(--border-subtle, #e5e7eb)' }}>
            <FadeIn>
              <div className="py-10 px-6 text-center">
                <p className="text-4xl md:text-5xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                  {stats.schoolsReached}+
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Member Schools</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Registered with the Federation</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="py-10 px-6 text-center">
                <p className="text-4xl md:text-5xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                  10K+
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Students Reached</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Learning STEM and robotics</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="py-10 px-6 text-center">
                <p className="text-4xl md:text-5xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                  {stats.satisfactionRate}%
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Satisfaction Rate</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>From educators and students</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trusted by Kenya's Best */}
      <section className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Federation Member Schools
              </h2>
              <p className="max-w-xl mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
                Schools across Kenya delivering robotics and STEM programs through the Federation network.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {schoolRecords.map((school, i) => (
              <FadeIn key={school.id} delay={i * 0.05}>
                <div
                  className="rounded-xl border p-5 h-full flex flex-col items-center text-center transition-shadow hover:shadow-lg"
                  style={{
                    borderColor: 'var(--border-subtle, #e5e7eb)',
                    background: 'var(--bg-primary)',
                  }}
                >
                  {/* Logo placeholder */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-lg font-bold"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {school.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>

                  <h3 className="font-bold text-sm mb-1 leading-tight" style={{ color: 'var(--text-primary)' }}>
                    {school.name}
                  </h3>

                  <p className="flex items-center gap-1 text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                    <MapPin size={10} />
                    {school.city}
                  </p>

                  <span
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full mt-auto"
                    style={{
                      background: 'var(--accent-light)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Calendar size={10} />
                    Since {school.since}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ background: 'var(--bg-secondary)' }}>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Want your school to join?
            </h3>
            <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Register your school with the Robotics Federation of Kenya and give your students access to structured STEM programs, competitions, and mentorship.
            </p>
            <a
              href="/register"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-white text-sm no-underline"
              style={{ background: 'var(--accent)' }}
            >
              Register Your School
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}

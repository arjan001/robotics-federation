import { createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'
import { organizers, type Organizer } from '@/data/ecosystem'
import { useContentModule } from '@/lib/use-content-module'
import { User, Users, Award, Heart } from 'lucide-react'

export const Route = createFileRoute('/organizers')({
  component: OrganizersPage,
})

function OrganizersPage() {
  const { items: dynamicOrganizers } = useContentModule<Organizer>('organizers', organizers)
  const organizerRecords = dynamicOrganizers

  return (
    <div>
      {/* Page banner */}
      <section className="py-24 px-4 text-center" style={{ background: 'var(--bg-dark)' }}>
        <FadeIn>
          <p className="text-sm text-white/50 uppercase tracking-widest mb-4">Home &mdash; Team</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Team</h1>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--text-on-dark-secondary)' }}>
            The dedicated professionals at Stemtrix EA who make the Inspire Robotics Challenge a reality.
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
                  <Users size={32} className="inline-block mr-2" />{organizerRecords.length}+
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Core Team Members</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Leading the challenge forward</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="py-10 px-6 text-center">
                <p className="text-4xl md:text-5xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                  <Award size={32} className="inline-block mr-2" />85+
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Volunteers Engaged</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Judges, mentors, and coordinators</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="py-10 px-6 text-center">
                <p className="text-4xl md:text-5xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                  <Heart size={32} className="inline-block mr-2" />100%
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Passion Driven</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Committed to STEM education in Kenya</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Meet the Team
              </h2>
              <p className="max-w-xl mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
                The people behind every successful season of the Inspire Robotics Challenge.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {organizerRecords.map((person, i) => (
              <FadeIn key={person.id} delay={i * 0.08}>
                <div
                  className="rounded-xl border p-6 h-full flex flex-col items-center text-center transition-shadow hover:shadow-lg"
                  style={{
                    borderColor: 'var(--border-subtle, #e5e7eb)',
                    background: 'var(--bg-primary)',
                  }}
                >
                  {/* Avatar */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(194, 75, 59, 0.1)',
                      color: 'var(--accent)',
                    }}
                  >
                    <User size={32} />
                  </div>

                  <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>
                    {person.name}
                  </h3>

                  <span
                    className="inline-flex items-center text-xs px-3 py-1 rounded-full mb-4"
                    style={{
                      background: 'rgba(194, 75, 59, 0.08)',
                      color: 'var(--accent)',
                    }}
                  >
                    {person.role}
                  </span>

                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {person.bio}
                  </p>
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
              Want to volunteer?
            </h3>
            <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Join our team of volunteers as a judge, mentor, or event coordinator and help shape the future of STEM in Kenya.
            </p>
            <a
              href="/register"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-white text-sm no-underline"
              style={{ background: 'var(--accent)' }}
            >
              Get Involved
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}

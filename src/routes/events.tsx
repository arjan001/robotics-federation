import { createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'
import { events, type EventData } from '@/data/events'
import { useContentModule } from '@/lib/use-content-module'
import type { CSSProperties } from 'react'
import { MapPin, Trophy, Users, ArrowRight, Clock, Star } from 'lucide-react'

export const Route = createFileRoute('/events')({
  component: EventsPage,
})

const serifHeading: CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  letterSpacing: '-0.02em',
}

function EventsPage() {
  const { items: dynamicEvents } = useContentModule<EventData>('events', events)
  const eventRecords = dynamicEvents

  const currentAndUpcomingEvents = eventRecords
    .filter((event) => event.status !== 'past')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastEvents = eventRecords
    .filter((event) => event.status === 'past')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const totalTeams = eventRecords.reduce((sum, e) => sum + (e.teamsParticipated || 0), 0)
  const totalEvents = eventRecords.length
  const totalWinners = eventRecords.reduce((sum, e) => sum + (e.winners?.length || 0), 0)

  return (
    <div style={{ background: 'var(--bg-secondary)' }}>
      {/* Hero Banner */}
      <section className="px-4 py-24 md:py-32 border-b" style={{ borderColor: '#d9d6d1' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{ color: 'var(--accent)' }}
            >
              Events & Milestones
            </p>
            <h1
              className="text-4xl md:text-6xl max-w-4xl font-bold leading-tight mb-8"
              style={serifHeading}
            >
              Federation events that drive growth and collaboration.
            </h1>
            <p
              className="text-base leading-8 max-w-2xl mb-12"
              style={{ color: 'var(--text-secondary)' }}
            >
              From national summits and teacher training to sanctioned competitions and regional expansion programs, every Federation event is designed to strengthen Kenya's STEM ecosystem.
            </p>
          </FadeIn>

          {/* Stats strip inspired by reference design */}
          <FadeIn delay={0.1}>
            <div
              className="grid grid-cols-1 sm:grid-cols-3 border"
              style={{ borderColor: '#d9d6d1' }}
            >
              <div className="px-8 py-7 border-b sm:border-b-0 sm:border-r" style={{ borderColor: '#d9d6d1' }}>
                <p className="text-4xl font-bold mb-1" style={{ ...serifHeading, color: 'var(--accent)' }}>
                  {totalTeams}+
                </p>
                <p className="text-xs uppercase tracking-[0.18em] font-semibold" style={{ color: '#2f3a46' }}>
                  Teams Participated
                </p>
              </div>
              <div className="px-8 py-7 border-b sm:border-b-0 sm:border-r" style={{ borderColor: '#d9d6d1' }}>
                <p className="text-4xl font-bold mb-1" style={{ ...serifHeading, color: 'var(--accent)' }}>
                  {totalEvents}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] font-semibold" style={{ color: '#2f3a46' }}>
                  Season Events
                </p>
              </div>
              <div className="px-8 py-7">
                <p className="text-4xl font-bold mb-1" style={{ ...serifHeading, color: 'var(--accent)' }}>
                  {totalWinners}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] font-semibold" style={{ color: '#2f3a46' }}>
                  Awards Given
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How Events Work - 4-step process inspired by reference */}
      <section className="px-4 py-20 border-b" style={{ borderColor: '#d9d6d1', background: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>
                The journey
              </p>
              <h2 className="text-4xl md:text-5xl font-bold" style={serifHeading}>
                How Each Season Unfolds
              </h2>
              <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: '#2f3a46' }}>
                Your path from registration to the championship stage in four milestones
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {[
              {
                icon: <Users size={28} strokeWidth={1.5} />,
                step: '01',
                title: 'Kickoff',
                desc: 'Teams register, receive kits, and begin building alongside mentors.',
              },
              {
                icon: <Clock size={28} strokeWidth={1.5} />,
                step: '02',
                title: 'Build Season',
                desc: 'Weeks of design, prototyping, coding, and refining robot capabilities.',
              },
              {
                icon: <Star size={28} strokeWidth={1.5} />,
                step: '03',
                title: 'Qualifiers',
                desc: 'Regional competitions determine which teams advance to nationals.',
              },
              {
                icon: <Trophy size={28} strokeWidth={1.5} />,
                step: '04',
                title: 'Championship',
                desc: 'Top teams compete for national titles, awards, and scholarships.',
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.08}>
                <div className="text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-5 rounded-lg flex items-center justify-center"
                    style={{ border: '1px solid #d9d6d1', color: '#1a1a1a' }}
                  >
                    {item.icon}
                  </div>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    Step {item.step}
                  </p>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={serifHeading}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7" style={{ color: '#2f3a46' }}>
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Current & Upcoming Events */}
      <section className="px-4 py-20 border-b" style={{ borderColor: '#d9d6d1' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Active Timeline
            </p>
            <h2
              className="text-4xl md:text-5xl max-w-3xl mb-14 font-bold leading-[1.08]"
              style={serifHeading}
            >
              Current and upcoming events.
            </h2>
          </FadeIn>

          <div className="space-y-6">
            {currentAndUpcomingEvents.map((event, index) => (
              <FadeIn key={event.id} delay={index * 0.06}>
                <article
                  className="border rounded-lg overflow-hidden transition-shadow hover:shadow-md"
                  style={{ borderColor: '#d9d6d1', background: '#ffffff' }}
                >
                  <div className="grid lg:grid-cols-[240px_1fr] gap-0">
                    {/* Date sidebar */}
                    <div
                      className="px-8 py-8 lg:py-10 flex flex-row lg:flex-col items-start gap-4 lg:gap-2"
                      style={{
                        background:
                          event.status === 'current'
                            ? 'var(--accent)'
                            : '#1a1a1a',
                      }}
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] mb-1 font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          {event.status === 'current' ? 'Happening Now' : 'Upcoming'}
                        </p>
                        <p className="text-3xl font-bold text-white" style={serifHeading}>
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-sm text-white/60">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      {event.teamsParticipated && (
                        <div className="lg:mt-4 flex items-center gap-2 text-white/80">
                          <Users size={14} />
                          <span className="text-sm font-semibold">{event.teamsParticipated} teams</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="px-8 py-8 lg:py-10">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2" style={serifHeading}>
                        {event.name}
                      </h3>
                      <p className="flex items-center gap-1.5 text-sm mb-5" style={{ color: 'var(--accent)' }}>
                        <MapPin size={13} />
                        {event.location}
                      </p>
                      <p className="text-base leading-8 mb-6" style={{ color: '#2f3a46' }}>
                        {event.description}
                      </p>
                      {event.highlights && event.highlights.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                          {event.highlights.map((highlight) => (
                            <p
                              key={highlight}
                              className="text-sm leading-7 flex items-start gap-2"
                              style={{ color: '#2f3a46' }}
                            >
                              <span style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }}>&#10003;</span>
                              {highlight}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Archive */}
      <section className="px-4 py-20 border-b" style={{ borderColor: '#d9d6d1' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Archive
            </p>
            <h2
              className="text-4xl md:text-5xl max-w-3xl mb-14 font-bold leading-[1.08]"
              style={serifHeading}
            >
              Completed events and results.
            </h2>
          </FadeIn>

          <div className="space-y-5">
            {pastEvents.map((event, index) => (
              <FadeIn key={event.id} delay={index * 0.04}>
                <article
                  className="border rounded-lg overflow-hidden"
                  style={{ borderColor: '#d9d6d1', background: '#ffffff' }}
                >
                  <div className="grid lg:grid-cols-[240px_1fr] gap-0">
                    {/* Date sidebar */}
                    <div
                      className="px-8 py-8 lg:py-10"
                      style={{ background: '#f5f5f3', borderRight: '1px solid #d9d6d1' }}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] mb-1 font-semibold" style={{ color: 'var(--accent)' }}>
                        Completed
                      </p>
                      <p className="text-3xl font-bold" style={serifHeading}>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm mb-4" style={{ color: '#2f3a46' }}>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                        })}
                      </p>
                      {event.teamsParticipated && (
                        <div className="flex items-center gap-2" style={{ color: '#2f3a46' }}>
                          <Users size={14} />
                          <span className="text-sm font-semibold">{event.teamsParticipated} teams</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="px-8 py-8 lg:py-10">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2" style={serifHeading}>
                        {event.name}
                      </h3>
                      <p className="flex items-center gap-1.5 text-sm mb-5" style={{ color: 'var(--accent)' }}>
                        <MapPin size={13} />
                        {event.location}
                      </p>
                      <p className="text-base leading-8 mb-6" style={{ color: '#2f3a46' }}>
                        {event.description}
                      </p>

                      {/* Winners */}
                      {event.winners && event.winners.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Trophy size={14} style={{ color: 'var(--accent)' }} />
                            <p className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--accent)' }}>
                              Winners
                            </p>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {event.winners.map((winner) => (
                              <div
                                key={`${winner.team}-${winner.award}`}
                                className="flex items-start gap-3 px-4 py-3 rounded-md"
                                style={{ background: '#f5f5f3', border: '1px solid #e8e6e1' }}
                              >
                                <div
                                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                                  style={{ background: 'var(--accent)' }}
                                >
                                  {winner.track.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold">{winner.team}</p>
                                  <p className="text-xs" style={{ color: '#2f3a46' }}>
                                    {winner.award}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Highlights */}
                      {event.highlights && event.highlights.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                          {event.highlights.map((highlight) => (
                            <p
                              key={highlight}
                              className="text-sm leading-7 flex items-start gap-2"
                              style={{ color: '#2f3a46' }}
                            >
                              <span style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }}>&#10003;</span>
                              {highlight}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - dark, inspired by reference "Let's Work Together" */}
      <section
        className="px-4 py-24 md:py-32"
        style={{ background: 'var(--bg-dark)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2
              className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
              style={serifHeading}
            >
              Be Part of Kenya's STEM Movement.
            </h2>
            <p className="text-base leading-8 mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Whether you're a school ready to join, a team ready to compete, or a partner looking to support the next generation of innovators — we're ready to connect.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase no-underline text-white border border-white/30 hover:bg-white hover:text-black transition-colors"
              >
                Register Team <ArrowRight size={14} />
              </a>
              <a
                href="/partners"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase no-underline text-white/70 hover:text-white transition-colors"
              >
                Become Partner <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

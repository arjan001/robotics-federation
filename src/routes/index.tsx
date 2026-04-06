import { Link, createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'
import { competitionTracks, type CompetitionTrack } from '@/data/competition'
import { events, type EventData } from '@/data/events'
import { useContentModule } from '@/lib/use-content-module'
import { ArrowRight } from 'lucide-react'
import type { CSSProperties } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const serifHeading: CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  letterSpacing: '-0.02em',
}

function HomePage() {
  const { items: dynamicHomeItems } = useContentModule<{
    id: string
    heroTitle: string
    heroSubtitle: string
    primaryCtaLabel: string
    primaryCtaHref: string
    secondaryCtaLabel: string
    secondaryCtaHref: string
  }>('home', [
    {
      id: 'home-main',
      heroTitle: 'Inspire Robotics Challenge',
      heroSubtitle:
        "East Africa's premier robotics and AI competition hub. Empowering young minds to build, innovate, and shape the future through technology.",
      primaryCtaLabel: 'Register Your Team',
      primaryCtaHref: '/register',
      secondaryCtaLabel: 'Explore Challenges',
      secondaryCtaHref: '/challenges',
    },
  ])
  const { items: dynamicEvents } = useContentModule<EventData>('events', events)
  const { items: dynamicTracks } = useContentModule<CompetitionTrack>('challenges', competitionTracks)
  const homeCopy = dynamicHomeItems[0]
  const upcomingEvents = dynamicEvents.filter((event) => event.status !== 'past').slice(0, 3)

  return (
    <div>
      {/* Hero section intentionally preserved */}
      <section className="section-full hero-parallax px-4 relative">
        <div className="absolute inset-0 bg-black/45" />
        <div className="max-w-4xl mx-auto w-full py-20 text-center relative z-10">
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight text-white">
              {homeCopy?.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-white/90">
              {homeCopy?.heroSubtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={homeCopy?.primaryCtaHref || '/register'}
                className="px-8 py-3.5 rounded-lg font-semibold text-white no-underline text-sm flex items-center gap-2"
                style={{ background: 'var(--accent)' }}
              >
                {homeCopy?.primaryCtaLabel || 'Register Your Team'} <ArrowRight size={16} />
              </a>
              <a
                href={homeCopy?.secondaryCtaHref || '/challenges'}
                className="px-8 py-3.5 rounded-lg font-semibold no-underline text-sm border flex items-center gap-2"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                  color: '#ffffff',
                  background: 'rgba(255, 255, 255, 0.12)',
                }}
              >
                {homeCopy?.secondaryCtaLabel || 'Explore Challenges'} <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            <FadeIn>
              <div className="h-full flex flex-col justify-center pr-0 lg:pr-8">
                <p className="text-sm mb-5" style={{ color: 'var(--accent)' }}>
                  Bringing integrity and consciousness to robotics learning.
                </p>
                <h2 className="text-4xl md:text-6xl font-bold leading-[1.08] mb-8" style={serifHeading}>
                  Crafted for young makers.
                  <br />
                  Cut to precision.
                </h2>
                <p className="text-base leading-8 mb-5" style={{ color: '#2f3a46' }}>
                  Stemtrix builds robotics pathways that balance discipline and creativity. Each team receives
                  guided mentorship, practical engineering experience, and a competitive arena designed for real growth.
                </p>
                <p className="text-base leading-8 pl-4" style={{ color: '#2f3a46', borderLeft: '2px solid rgba(194,75,59,0.35)' }}>
                  The result is confidence, technical fluency, and students ready to solve actual community problems.
                </p>
                <div className="mt-9">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-7 py-3 text-xs font-bold tracking-[0.2em] uppercase no-underline text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    Discover More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="relative h-full min-h-[620px] overflow-hidden" style={{ border: '1px solid #d9d6d1' }}>
                <img
                  src="/students-robotics-royaltyfree.jpg"
                  alt="Students building robots"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(21,24,29,0.82), rgba(21,24,29,0.44) 60%, rgba(21,24,29,0.16))' }} />
                <div className="absolute inset-0 grid grid-cols-2 divide-x divide-y" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                  {[
                    {
                      step: '1.',
                      title: 'Consultation & Discovery',
                      text: 'Mentors align track level, team strengths, and season outcomes before kickoff.',
                    },
                    {
                      step: '2.',
                      title: 'Build & Programming',
                      text: 'Teams move from concepts to tested robots with structured weekly milestones.',
                    },
                    {
                      step: '3.',
                      title: 'Testing & Iteration',
                      text: 'Practice rounds sharpen reliability, strategy, and technical decision-making.',
                    },
                    {
                      step: '4.',
                      title: 'Showcase & Delivery',
                      text: 'Students present complete solutions at regional events and championship finals.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="p-6 md:p-8 flex flex-col justify-end">
                      <p className="text-5xl font-bold mb-3 text-white/80" style={serifHeading}>
                        {item.step}
                      </p>
                      <h3 className="text-2xl font-bold mb-2 text-white" style={serifHeading}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-7 text-white/80">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="px-4 py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
              Our process is designed to make every student feel equipped and involved.
            </p>
            <h2 className="text-4xl md:text-6xl max-w-3xl mb-12 font-bold leading-[1.08]" style={serifHeading}>
              A robotics experience built around your team.
            </h2>
          </FadeIn>

          <div className="border-t" style={{ borderColor: '#d9d6d1' }}>
            {[
              {
                number: '1',
                title: 'Season Onboarding & Team Formation',
                body: 'Schools and independent teams are onboarded, grouped into tracks, and introduced to mentors. Expectations, season timeline, and challenge briefs are clarified from day one.',
              },
              {
                number: '2',
                title: 'Precise Build Planning & Pattern Work',
                body: 'Students break the challenge into engineering modules, assign roles, and draft technical approaches. This step aligns design, code, and field strategy before heavy prototyping begins.',
              },
              {
                number: '3',
                title: 'Field Testing & Adjustments',
                body: 'Teams run iterative testing cycles and improve robot stability, timing, and scoring efficiency. Mentors focus on measurable gains and resilience under match pressure.',
              },
              {
                number: '4',
                title: 'Final Review & Competition Delivery',
                body: 'Before events, each team receives final readiness checks across mechanics, software, and presentation. Competition day execution then reflects months of focused preparation.',
              },
            ].map((item) => (
              <FadeIn key={item.number}>
                <div className="py-10 md:py-12 border-b grid md:grid-cols-[90px_1.2fr_1fr] gap-6 md:gap-10" style={{ borderColor: '#d9d6d1' }}>
                  <p className="text-6xl text-[rgba(194,75,59,0.7)] leading-none font-bold" style={serifHeading}>
                    {item.number}
                  </p>
                  <h3 className="text-3xl font-bold leading-[1.2]" style={serifHeading}>
                    {item.title}
                  </h3>
                  <p className="text-base leading-8 pl-4" style={{ color: '#2f3a46', borderLeft: '2px solid rgba(194,75,59,0.45)' }}>
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
              Crafting excellence with masterful tools and unmatched skills.
            </p>
            <h2 className="text-4xl md:text-6xl font-bold max-w-3xl leading-[1.08]" style={serifHeading}>
              Perfecting our craft with the finest tools and timeless skills.
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 mt-12" style={{ borderTop: '1px solid #d9d6d1', borderLeft: '1px solid #d9d6d1' }}>
            {[
              {
                title: 'Bespoke Team Coaching',
                desc: 'Track-specific mentoring, curriculum support, and practical engineering guidance tailored to each team.',
              },
              {
                title: 'Robot Alterations & Repairs',
                desc: 'Fast diagnostics, mechanical refinements, and software fixes that keep teams competition-ready.',
              },
              {
                title: 'Mission Strategy Design',
                desc: 'Scoring-path analysis, autonomous routine planning, and driver practice formats for stronger match results.',
              },
              {
                title: 'Restyling & Upskilling',
                desc: 'Continuous workshops that help teams upgrade weak areas and preserve high-performing systems.',
              },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08}>
                <div className="p-8 h-full" style={{ borderRight: '1px solid #d9d6d1', borderBottom: '1px solid #d9d6d1' }}>
                  <p className="text-xs uppercase tracking-[0.22em] mb-6" style={{ color: 'var(--accent)' }}>
                    0{index + 1}
                  </p>
                  <h3 className="text-3xl mb-4 font-bold leading-tight" style={serifHeading}>
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

      <section
        className="px-4 py-20"
        style={{
          background:
            'radial-gradient(circle at 12% 8%, rgba(194,75,59,0.14), transparent 42%), radial-gradient(circle at 92% 92%, rgba(194,75,59,0.1), transparent 38%), linear-gradient(145deg, #121421 0%, #16192b 52%, #131b35 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-6 mb-8 md:mb-12 items-start">
              <h2 className="text-4xl md:text-5xl font-bold text-white" style={serifHeading}>
                Explore our challenge tracks
              </h2>
              <p className="text-base leading-8 max-w-xl lg:justify-self-end" style={{ color: 'rgba(255,255,255,0.66)' }}>
                Every track is intentionally shaped for a specific age range and technical depth.
                Students grow progressively from exploration to advanced competition strategy.
              </p>
            </div>
          </FadeIn>

          <div className="border-y" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            {dynamicTracks.map((track, index) => (
              <FadeIn key={track.id} delay={index * 0.06}>
                <Link
                  to="/challenges"
                  className="grid md:grid-cols-[86px_1fr_auto] gap-4 items-center py-8 no-underline border-b last:border-b-0"
                  style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  <span className="text-5xl font-bold" style={{ color: 'rgba(255,255,255,0.45)', ...serifHeading }}>
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-5xl md:text-7xl leading-none font-black" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {track.name}
                    </h3>
                    <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.68)' }}>
                      {track.ageRange} - {track.tagline}
                    </p>
                  </div>
                  <span className="text-white/80 text-sm font-semibold inline-flex items-center gap-2">
                    Open <ArrowRight size={14} />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-sm mb-3" style={{ color: 'var(--accent)' }}>
                  Upcoming and active season milestones.
                </p>
                <h2 className="text-4xl md:text-6xl font-bold leading-[1.08]" style={serifHeading}>
                  Events cut across the full competition journey.
                </h2>
              </div>
              <Link to="/events" className="text-sm font-semibold no-underline inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                View all events <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>

          <div className="border-t" style={{ borderColor: '#d9d6d1' }}>
            {upcomingEvents.map((event) => (
              <FadeIn key={event.id}>
                <article className="py-8 border-b grid lg:grid-cols-[220px_1fr_auto] gap-6 items-start" style={{ borderColor: '#d9d6d1' }}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--accent)' }}>
                      {event.status}
                    </p>
                    <p className="text-2xl font-bold" style={serifHeading}>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={serifHeading}>
                      {event.name}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: '#2f3a46' }}>
                      {event.location}
                    </p>
                    <p className="text-base leading-7" style={{ color: '#2f3a46' }}>
                      {event.description}
                    </p>
                  </div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                    {event.teamsParticipated ? `${event.teamsParticipated} teams` : 'Program event'}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

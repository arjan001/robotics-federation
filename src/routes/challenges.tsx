import { createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'
import { competitionTracks, type CompetitionTrack } from '@/data/competition'
import { useContentModule } from '@/lib/use-content-module'
import type { CSSProperties } from 'react'

export const Route = createFileRoute('/challenges')({
  component: ChallengesPage,
})

const serifHeading: CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  letterSpacing: '-0.02em',
}

function ChallengesPage() {
  const { items: dynamicTracks } = useContentModule<CompetitionTrack>('challenges', competitionTracks)
  const tracks = dynamicTracks

  return (
    <div style={{ background: 'var(--bg-secondary)' }}>
      <section className="px-4 py-24 border-b" style={{ borderColor: '#d9d6d1' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
              Home - Challenges
            </p>
            <h1 className="text-5xl md:text-7xl max-w-4xl font-bold leading-[1.04]" style={serifHeading}>
              Challenges and themes built for progression, not guesswork.
            </h1>
            <p className="mt-6 text-base leading-8 max-w-2xl" style={{ color: '#2f3a46' }}>
              Every track uses clear missions, transparent rubrics, and age-appropriate complexity so students can
              build confidence while advancing technical depth season after season.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-20 border-b" style={{ borderColor: '#d9d6d1' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
              Season track architecture
            </p>
            <h2 className="text-4xl md:text-6xl max-w-3xl mb-12 font-bold leading-[1.08]" style={serifHeading}>
              The challenge structure, cut across all levels.
            </h2>
          </FadeIn>

          <div className="border-t" style={{ borderColor: '#d9d6d1' }}>
            {tracks.map((track, index) => (
              <FadeIn key={track.id} delay={index * 0.06}>
                <article className="py-10 border-b" style={{ borderColor: '#d9d6d1' }}>
                  <div className="grid lg:grid-cols-[88px_1.1fr_1fr] gap-6 lg:gap-10 mb-8">
                    <p className="text-6xl leading-none font-bold text-[rgba(194,75,59,0.72)]" style={serifHeading}>
                      {index + 1}
                    </p>
                    <div>
                      <h3 className="text-4xl md:text-5xl font-bold mb-3" style={serifHeading}>
                        {track.name}
                      </h3>
                      <p className="text-sm uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>
                        {track.ageRange} - {track.tagline}
                      </p>
                    </div>
                    <p className="text-base leading-8 pl-4" style={{ color: '#2f3a46', borderLeft: '2px solid rgba(194,75,59,0.45)' }}>
                      {track.description}
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-10">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>
                        Missions
                      </p>
                      <div className="border-t" style={{ borderColor: '#d9d6d1' }}>
                        {track.missions.map((mission) => (
                          <div key={mission} className="py-4 border-b text-base leading-8" style={{ color: '#2f3a46', borderColor: '#d9d6d1' }}>
                            {mission}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>
                        Scoring rubric
                      </p>
                      <div className="border-t" style={{ borderColor: '#d9d6d1' }}>
                        {track.rubric.map((category) => (
                          <div key={category.name} className="py-4 border-b" style={{ borderColor: '#d9d6d1' }}>
                            <div className="flex items-center justify-between gap-4 mb-2">
                              <h4 className="text-2xl font-bold" style={serifHeading}>
                                {category.name}
                              </h4>
                              <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                                {category.maxPoints} pts
                              </p>
                            </div>
                            <p className="text-sm leading-7" style={{ color: '#2f3a46' }}>
                              {category.criteria.join(' - ')}
                            </p>
                          </div>
                        ))}
                        <div className="py-4 flex items-center justify-between">
                          <p className="text-lg font-bold" style={serifHeading}>
                            Total points
                          </p>
                          <p className="text-base font-semibold" style={{ color: 'var(--accent)' }}>
                            {track.rubric.reduce((sum, item) => sum + item.maxPoints, 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <FadeIn>
            <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
              Season 2 theme
            </p>
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.08] mb-6" style={serifHeading}>
              Building Tomorrow
            </h2>
            <p className="text-base leading-8" style={{ color: '#2f3a46' }}>
              Teams are challenged to design robotics solutions that address sustainability goals, from smart
              agriculture and mobility to efficient energy and resource systems in local communities.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative min-h-[420px] overflow-hidden" style={{ border: '1px solid #d9d6d1' }}>
              <img
                src="/education-tech-royaltyfree.jpg"
                alt="Season challenge theme"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.76))' }} />
              <div className="absolute left-6 right-6 bottom-6">
                <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  Challenge intent
                </p>
                <p className="text-sm leading-7" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Build practical prototypes that demonstrate social impact, technical integrity, and measurable
                  problem-solving value.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

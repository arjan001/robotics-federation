import { createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'
import { partners, type Partner } from '@/data/ecosystem'
import { useContentModule } from '@/lib/use-content-module'
import { Handshake, Cpu, GraduationCap, Radio } from 'lucide-react'
import type { ReactNode } from 'react'

export const Route = createFileRoute('/partners')({
  component: PartnersPage,
})

const typeIcons: Record<string, ReactNode> = {
  sponsor: <Handshake size={28} />,
  technology: <Cpu size={28} />,
  educational: <GraduationCap size={28} />,
  media: <Radio size={28} />,
}

const typeLabels: Record<string, string> = {
  sponsor: 'Sponsor',
  technology: 'Technology Partner',
  educational: 'Educational Partner',
  media: 'Media Partner',
}

function PartnersPage() {
  const { items: dynamicPartners } = useContentModule<Partner>('partners', partners)
  const partnerRecords = dynamicPartners

  return (
    <div>
      {/* Page banner */}
      <section className="py-24 px-4 text-center" style={{ background: 'var(--bg-dark)' }}>
        <FadeIn>
          <p className="text-sm text-white/50 uppercase tracking-widest mb-4">Home &mdash; Partners</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Partners & Sponsors</h1>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--text-on-dark-secondary)' }}>
            The organizations making the Inspire Robotics Challenge possible across Kenya.
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
                  {partnerRecords.length}+
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Partner Organizations</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Supporting STEM education in Kenya</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="py-10 px-6 text-center">
                <p className="text-4xl md:text-5xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                  4
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Partnership Types</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Sponsors, Technology, Education, Media</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="py-10 px-6 text-center">
                <p className="text-4xl md:text-5xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                  15+
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Schools Supported</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Through partner contributions</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Our Partners
              </h2>
              <p className="max-w-xl mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
                Organizations driving STEM innovation and robotics education across Kenya.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {partnerRecords.map((partner, i) => (
              <FadeIn key={partner.id} delay={i * 0.06}>
                <div
                  className="rounded-xl border p-5 h-full flex flex-col items-center text-center transition-shadow hover:shadow-lg"
                  style={{
                    borderColor: 'var(--border-subtle, #e5e7eb)',
                    background: 'var(--bg-primary)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--accent)',
                    }}
                  >
                    {typeIcons[partner.type]}
                  </div>

                  <h3 className="font-bold text-sm mb-1 leading-tight" style={{ color: 'var(--text-primary)' }}>
                    {partner.name}
                  </h3>

                  <span
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full mb-3"
                    style={{
                      background: 'rgba(194, 75, 59, 0.08)',
                      color: 'var(--accent)',
                    }}
                  >
                    {typeLabels[partner.type]}
                  </span>

                  <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {partner.description}
                  </p>

                  <div
                    className="w-full text-xs px-3 py-2 rounded-md"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
                  >
                    <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Contribution:</span>{' '}
                    {partner.contribution}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn className="mt-16">
            <div className="p-8 md:p-12 rounded-xl text-center" style={{ background: 'var(--bg-dark)' }}>
              <h3 className="text-xl font-bold mb-3 text-white">
                Become a Partner
              </h3>
              <p className="mb-6 max-w-lg mx-auto" style={{ color: 'var(--text-on-dark-secondary)' }}>
                Interested in supporting STEM education in Kenya? Join the Inspire Robotics Challenge as a partner or sponsor.
              </p>
              <a
                href="/register"
                className="inline-block px-8 py-3 rounded-lg font-semibold text-white text-sm no-underline"
                style={{ background: 'var(--accent)' }}
              >
                Express Interest
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'
import { caseStudies, type CaseStudy } from '@/data/caseStudies'
import { useContentModule } from '@/lib/use-content-module'

export const Route = createFileRoute('/case-studies/$caseStudyId')({
  component: CaseStudyPage,
})

function CaseStudyPage() {
  const { caseStudyId } = Route.useParams()
  const { items: dynamicCaseStudies } = useContentModule<CaseStudy>('case-studies', caseStudies)
  const caseStudy = dynamicCaseStudies.find((entry) => entry.id === caseStudyId)

  if (!caseStudy) {
    return (
      <section className="min-h-screen px-4 py-24" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent)' }}>
            Case Study
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Case study not found
          </h1>
          <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
            The selected case study does not exist or has moved.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 no-underline text-sm font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            <ArrowLeft size={14} /> Back to About
          </Link>
        </div>
      </section>
    )
  }

  return (
    <div>
      <section
        className="px-4 py-24"
        style={{
          background:
            'radial-gradient(circle at 12% 8%, rgba(194,75,59,0.2), transparent 42%), radial-gradient(circle at 95% 88%, rgba(194,75,59,0.14), transparent 38%), linear-gradient(145deg, #121421 0%, #16192b 52%, #131b35 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 no-underline text-sm font-semibold mb-8"
              style={{ color: 'rgba(255,255,255,0.76)' }}
            >
              <ArrowLeft size={14} /> Back to About
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] mb-5" style={{ color: caseStudy.accent }}>
              {caseStudy.category}
            </p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight text-white max-w-4xl mb-7">
              {caseStudy.title}
            </h1>
            <p className="text-base md:text-lg max-w-3xl" style={{ color: 'rgba(255,255,255,0.74)' }}>
              {caseStudy.summary}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
          <FadeIn>
            <article className="rounded-2xl p-7 md:p-8 h-full" style={{ background: '#f5f5f3', border: '1px solid #e6e6e6' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>
                Challenge
              </p>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#555555' }}>
                {caseStudy.challenge}
              </p>
            </article>
          </FadeIn>

          <FadeIn delay={0.08}>
            <article className="rounded-2xl p-7 md:p-8 h-full" style={{ background: '#f5f5f3', border: '1px solid #e6e6e6' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>
                Solution
              </p>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#555555' }}>
                {caseStudy.solution}
              </p>
            </article>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 pb-24" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto rounded-2xl p-7 md:p-9" style={{ background: 'var(--bg-secondary)', border: '1px solid #e4e4e4' }}>
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--accent)' }}>
              Outcomes
            </p>
            <ul className="space-y-3">
              {caseStudy.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-2.5 h-2.5 rounded-full" style={{ background: caseStudy.accent }} />
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

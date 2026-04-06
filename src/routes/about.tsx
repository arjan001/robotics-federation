import { Link, createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'
import { caseStudies, type CaseStudy } from '@/data/caseStudies'
import { useContentModule } from '@/lib/use-content-module'
import { useState, type CSSProperties } from 'react'
import { ArrowRight, Minus, Plus } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const serifHeading: CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  letterSpacing: '-0.02em',
}

function AboutPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const { items: dynamicCaseStudies } = useContentModule<CaseStudy>('case-studies', caseStudies)
  const { items: dynamicFaqs } = useContentModule<{ id: string; question: string; answer: string }>('about-faqs', [
    {
      id: 'faq-join',
      question: 'How do students join Inspire Robotics programs?',
      answer:
        'Schools and independent teams register by track, complete onboarding, and receive challenge guides, calendars, and mentor matching before build sessions begin.',
    },
    {
      id: 'faq-experience',
      question: 'Do participants need prior robotics experience?',
      answer:
        'No. Tracks are age-appropriate and skill-staged. Students can start from basic exploration and progress into advanced strategy, automation, and programming challenges.',
    },
    {
      id: 'faq-outcomes',
      question: 'What outcomes are tracked across a season?',
      answer:
        'Programs track technical capability, teamwork, documentation quality, challenge completion, and presentation readiness so schools can measure growth beyond final scores.',
    },
    {
      id: 'faq-partners',
      question: 'How can schools or partners collaborate with Stemtrix EA?',
      answer:
        'Partners can support kits, mentoring, workshops, venue access, and scholarships. Schools can host qualifiers, open labs, and join multi-city season rollouts.',
    },
  ])
  const { items: aboutContent } = useContentModule<{ id: string; title: string; subtitle: string }>('about-content', [
    {
      id: 'about-main',
      title: 'Built for future innovators. Designed for measurable impact.',
      subtitle:
        'Stemtrix EA runs a competition-first learning ecosystem where students build real robotics skills, mentors shape team growth, and schools gain a structured path to future-ready STEM outcomes.',
    },
  ])
  const aboutCopy = aboutContent[0]

  return (
    <div style={{ background: 'var(--bg-secondary)' }}>
      <section className="px-4 py-24 border-b" style={{ borderColor: '#d9d6d1' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
              Home - About Us
            </p>
            <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-[1.04]" style={serifHeading}>
              {aboutCopy?.title}
            </h1>
            <p className="mt-6 text-base leading-8 max-w-2xl" style={{ color: '#2f3a46' }}>
              {aboutCopy?.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-20 border-b" style={{ borderColor: '#d9d6d1' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
          <FadeIn>
            <div className="h-full flex flex-col justify-center pr-0 lg:pr-8">
              <p className="text-sm mb-5" style={{ color: 'var(--accent)' }}>
                Why this platform exists
              </p>
              <h2 className="text-4xl md:text-6xl font-bold leading-[1.08] mb-7" style={serifHeading}>
                A STEM movement grounded in access, rigor, and creativity.
              </h2>
              <p className="text-base leading-8 mb-5" style={{ color: '#2f3a46' }}>
                The mission is to make robotics and AI education practical, inclusive, and deeply engaging across
                East Africa through year-round mentoring, challenge-based learning, and high-quality competitions.
              </p>
              <p className="text-base leading-8 pl-4" style={{ color: '#2f3a46', borderLeft: '2px solid rgba(194,75,59,0.45)' }}>
                Programs are built to move students from curiosity to execution with clear technical progression and
                real-world problem solving at the center of every season.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative min-h-[560px] overflow-hidden" style={{ border: '1px solid #d9d6d1' }}>
              <img
                src="/education-tech-royaltyfree.jpg"
                alt="AI and robotics education"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(15,19,28,0.8), rgba(15,19,28,0.2) 58%, rgba(15,19,28,0.65))' }} />
              <div className="absolute left-6 right-6 bottom-6 space-y-5">
                {[
                  'Regional school partnerships and mentor ecosystems',
                  'Track-based progression from beginner to advanced',
                  'Competition formats aligned to practical STEM outcomes',
                ].map((point) => (
                  <div key={point} className="text-sm text-white/90 leading-7 pl-4" style={{ borderLeft: '2px solid rgba(194,75,59,0.7)' }}>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-20 border-b" style={{ borderColor: '#d9d6d1' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
              The operating framework
            </p>
            <h2 className="text-4xl md:text-6xl max-w-3xl mb-12 font-bold leading-[1.08]" style={serifHeading}>
              How the organization delivers consistency at scale.
            </h2>
          </FadeIn>

          <div className="border-t" style={{ borderColor: '#d9d6d1' }}>
            {[
              {
                number: '1',
                title: 'Mission Alignment',
                body: 'Learning design is grounded in inclusion, practical engineering, and student-led innovation with measurable educational outcomes.',
              },
              {
                number: '2',
                title: 'Program Architecture',
                body: 'Each season uses defined tracks, mission briefs, skill rubrics, and coaching loops so every team gets a clear progression path.',
              },
              {
                number: '3',
                title: 'Regional Execution',
                body: 'Schools, mentors, and partners coordinate through local hubs to run workshops, qualifiers, and cross-city knowledge sharing.',
              },
              {
                number: '4',
                title: 'Impact Measurement',
                body: 'Performance is evaluated using participation quality, challenge completion, innovation depth, and long-term STEM pathway retention.',
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

      <section
        className="px-4 py-20 border-b"
        style={{
          borderColor: 'rgba(255,255,255,0.14)',
          background:
            'radial-gradient(circle at 12% 8%, rgba(194,75,59,0.14), transparent 42%), radial-gradient(circle at 92% 92%, rgba(194,75,59,0.1), transparent 38%), linear-gradient(145deg, #121421 0%, #16192b 52%, #131b35 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-8 md:mb-12 grid lg:grid-cols-2 gap-6 items-start">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={serifHeading}>
                Explore our case studies
              </h2>
              <p className="text-base max-w-xl lg:justify-self-end leading-8" style={{ color: 'rgba(255,255,255,0.66)' }}>
                Real implementations showing how AI and robotics initiatives were translated into practical student and
                school outcomes.
              </p>
            </div>
          </FadeIn>

          <div className="border-y" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            {dynamicCaseStudies.map((study, index) => (
              <FadeIn key={study.id} delay={index * 0.05}>
                <Link
                  to="/case-studies/$caseStudyId"
                  params={{ caseStudyId: study.id }}
                  className="grid md:grid-cols-[86px_1fr_auto] gap-4 items-center py-8 no-underline border-b last:border-b-0"
                  style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  <span className="text-5xl font-bold" style={{ color: 'rgba(255,255,255,0.45)', ...serifHeading }}>
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-5xl md:text-7xl leading-none font-black" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {study.title}
                    </h3>
                    <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.68)' }}>
                      {study.category}
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

      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <FadeIn>
              <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
                Frequently asked questions
              </p>
              <h2 className="text-4xl md:text-6xl font-bold leading-[1.08] mb-8" style={serifHeading}>
                Everything schools and teams ask before joining.
              </h2>
            </FadeIn>

            <div className="border-t" style={{ borderColor: '#d9d6d1' }}>
              {dynamicFaqs.map((faq, index) => {
                const isOpen = openFaq === index

                return (
                  <div key={faq.question} className="border-b" style={{ borderColor: '#d9d6d1' }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between gap-6 text-left py-6"
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      <span className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>
                        {faq.question}
                      </span>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </button>
                    {isOpen && (
                      <p className="text-base leading-8 pb-6" style={{ color: '#2f3a46' }}>
                        {faq.answer}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <FadeIn delay={0.1}>
            <div className="relative min-h-[560px] overflow-hidden" style={{ border: '1px solid #d9d6d1' }}>
              <img
                src="/students-robotics-royaltyfree.jpg"
                alt="Robotics workshop participants"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.78))' }} />
              <div className="absolute left-6 right-6 bottom-6">
                <p className="text-xs uppercase tracking-[0.24em] mb-3" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Need direct support?
                </p>
                <h3 className="text-3xl font-bold text-white mb-4" style={serifHeading}>
                  Connect with the program team to plan your next season.
                </h3>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase no-underline text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  Start Registration <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

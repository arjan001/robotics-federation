import { Link, createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'
import { caseStudies, type CaseStudy } from '@/data/caseStudies'
import { useContentModule } from '@/lib/use-content-module'
import { useState, type CSSProperties } from 'react'
import { ArrowRight, Minus, Plus, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const serifHeading: CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  letterSpacing: '-0.02em',
}

function RotatingCube() {
  return (
    <div className="cube-scene mx-auto">
      <div className="cube">
        <div className="cube-face cube-face--front">
          <div className="text-center">
            <span className="text-3xl mb-2 block">🤖</span>
            <span>Robotics</span>
          </div>
        </div>
        <div className="cube-face cube-face--back">
          <div className="text-center">
            <span className="text-3xl mb-2 block">🔬</span>
            <span>STEM</span>
          </div>
        </div>
        <div className="cube-face cube-face--right">
          <div className="text-center">
            <span className="text-3xl mb-2 block">💡</span>
            <span>Innovation</span>
          </div>
        </div>
        <div className="cube-face cube-face--left">
          <div className="text-center">
            <span className="text-3xl mb-2 block">🎓</span>
            <span>Education</span>
          </div>
        </div>
        <div className="cube-face cube-face--top">
          <div className="text-center">
            <span className="text-3xl mb-2 block">🌍</span>
            <span>Kenya</span>
          </div>
        </div>
        <div className="cube-face cube-face--bottom">
          <div className="text-center">
            <span className="text-3xl mb-2 block">🏆</span>
            <span>Excellence</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AboutPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const { items: dynamicCaseStudies } = useContentModule<CaseStudy>('case-studies', caseStudies)
  const { items: dynamicFaqs } = useContentModule<{ id: string; question: string; answer: string }>('about-faqs', [
    {
      id: 'faq-join',
      question: 'How can a school join the Robotics Federation of Kenya?',
      answer:
        'Schools can register through our website or contact the Federation directly. We provide a structured onboarding process that includes needs assessment, program design, equipment guidance, teacher training, and connection to local competition circuits.',
    },
    {
      id: 'faq-experience',
      question: 'Do schools need existing STEM infrastructure to participate?',
      answer:
        'No. The Federation works with partner organizations like Stemtrix EA and Inspire Robotics Challenge to help schools start from scratch. We provide frameworks for setting up robotics clubs, sourcing equipment, and training teachers regardless of the school\'s current capacity.',
    },
    {
      id: 'faq-outcomes',
      question: 'What outcomes does the Federation track?',
      answer:
        'We measure student enrollment in STEM programs, competition participation rates, teacher certification in robotics pedagogy, county-level coverage, and long-term career pathway tracking for participating students.',
    },
    {
      id: 'faq-partners',
      question: 'How can organizations partner with the Federation?',
      answer:
        'We welcome partnerships from technology companies, NGOs, educational institutions, and government bodies. Partners can support through funding, equipment donations, mentorship, curriculum development, or hosting regional events.',
    },
  ])
  const { items: aboutContent } = useContentModule<{ id: string; title: string; subtitle: string }>('about-content', [
    {
      id: 'about-main',
      title: 'The national body advancing robotics and STEM for every Kenyan learner.',
      subtitle:
        'The Robotics Federation of Kenya coordinates, standardizes, and grows the national ecosystem for robotics and STEM education — connecting government, schools, industry, and competition organizers under one unified framework.',
    },
  ])
  const aboutCopy = aboutContent[0]

  return (
    <div style={{ background: 'var(--bg-secondary)' }}>
      {/* Hero header */}
      <section className="px-4 py-24 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm mb-4 font-medium tracking-wide uppercase" style={{ color: 'var(--accent)' }}>
              About Us
            </p>
            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl leading-tight" style={serifHeading}>
              {aboutCopy?.title}
            </h1>
            <p className="mt-6 text-base leading-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {aboutCopy?.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section 1: Image LEFT — Text RIGHT */}
      <section className="px-4 py-20 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="relative min-h-[480px] overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border-color)' }}>
              <img
                src="/education-tech-royaltyfree.jpg"
                alt="Robotics and STEM education program in Kenya"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(15,23,42,0.8), rgba(15,23,42,0.15) 55%, rgba(15,23,42,0.65))' }} />
              <div className="absolute left-6 right-6 bottom-6 space-y-4">
                {[
                  'National coordination of robotics and STEM activities',
                  'Equitable access from Nairobi to rural counties',
                  'Alignment with the Competency-Based Curriculum framework',
                ].map((point) => (
                  <div key={point} className="text-sm text-white/90 leading-7 pl-4" style={{ borderLeft: '2px solid var(--accent)' }}>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col justify-center">
              <p className="text-sm mb-5 font-medium tracking-wide uppercase" style={{ color: 'var(--accent)' }}>
                Why the Federation Exists
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-7" style={serifHeading}>
                A unified voice for STEM and robotics education in Kenya.
              </h2>
              <p className="text-base leading-8 mb-5" style={{ color: 'var(--text-secondary)' }}>
                Kenya has a growing ecosystem of robotics programs, competitions, and STEM initiatives — but until now, there has been no central body to coordinate standards, ensure equitable access, or represent the sector at national policy level. The Robotics Federation of Kenya was established to fill that gap.
              </p>
              <p className="text-base leading-8 pl-5" style={{ color: 'var(--text-secondary)', borderLeft: '2px solid var(--accent)' }}>
                We bring together competition organizers like Inspire Robotics Challenge, education providers like Stemtrix East Africa, government bodies, and corporate partners to create a cohesive national strategy for STEM development.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 2: Text LEFT — 3D Cube RIGHT (reversed layout) */}
      <section className="px-4 py-20 border-b" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="flex flex-col justify-center">
              <p className="text-sm mb-5 font-medium tracking-wide uppercase" style={{ color: 'var(--accent)' }}>
                Our Commitment
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-7" style={serifHeading}>
                Building the future of STEM education in Kenya.
              </h2>
              <p className="text-base leading-8 mb-8" style={{ color: 'var(--text-secondary)' }}>
                We believe a well-coordinated national approach to robotics education does more than teach skills — it transforms how students think, innovate, and build. Every program we support is an investment in Kenya's future workforce and global competitiveness.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'Quality Without Compromise', desc: 'Rigorous standards for every program we sanction.' },
                  { label: 'Attention to Detail', desc: 'From curriculum alignment to competition rules, precision matters.' },
                  { label: 'Community First Approach', desc: 'Programs designed with and for local school communities.' },
                  { label: 'Modern Pedagogy', desc: 'Hands-on learning, critical thinking, and 21st-century skills.' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                      <p className="text-xs leading-5" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex items-center justify-center min-h-[480px] rounded-2xl relative overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <RotatingCube />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Operating Framework */}
      <section className="px-4 py-20 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm mb-4 font-medium tracking-wide uppercase" style={{ color: 'var(--accent)' }}>
              How We Operate
            </p>
            <h2 className="text-3xl md:text-5xl max-w-3xl mb-12 font-bold leading-tight" style={serifHeading}>
              The Federation's operating framework.
            </h2>
          </FadeIn>

          <div className="border-t" style={{ borderColor: 'var(--border-color)' }}>
            {[
              {
                number: '1',
                title: 'Policy & Standards',
                body: 'We develop and maintain national standards for robotics education, competition rules, safety protocols, and teacher certification in collaboration with the Ministry of Education and KICD.',
              },
              {
                number: '2',
                title: 'Program Coordination',
                body: 'We coordinate the activities of affiliated organizations — from Inspire Robotics Challenge events to Stemtrix EA training programs — ensuring alignment with national goals and avoiding duplication of effort.',
              },
              {
                number: '3',
                title: 'Regional Development',
                body: 'Through county-level coordinators and regional hubs, we extend STEM programs beyond Nairobi to ensure students in Mombasa, Kisumu, Nakuru, Eldoret, and rural areas have equal access.',
              },
              {
                number: '4',
                title: 'Impact & Accountability',
                body: 'We track participation metrics, student outcomes, teacher readiness, and competition standards to provide transparent reporting to stakeholders and continuously improve programs.',
              },
            ].map((item) => (
              <FadeIn key={item.number}>
                <div className="py-10 md:py-12 border-b grid md:grid-cols-[90px_1.2fr_1fr] gap-6 md:gap-10" style={{ borderColor: 'var(--border-color)' }}>
                  <p className="text-5xl font-bold leading-none" style={{ color: 'var(--accent)', opacity: 0.5, ...serifHeading }}>
                    {item.number}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight" style={serifHeading}>
                    {item.title}
                  </h3>
                  <p className="text-base leading-8 pl-4" style={{ color: 'var(--text-secondary)', borderLeft: '2px solid var(--accent)' }}>
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Programs & Initiatives */}
      <section
        className="px-4 py-20 border-b"
        style={{
          borderColor: 'rgba(255,255,255,0.14)',
          background: 'var(--bg-dark)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-8 md:mb-12 grid lg:grid-cols-2 gap-6 items-start">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={serifHeading}>
                Programs & Initiatives
              </h2>
              <p className="text-base max-w-xl lg:justify-self-end leading-8" style={{ color: 'rgba(255,255,255,0.66)' }}>
                Real programs driving measurable impact in schools and communities across Kenya.
              </p>
            </div>
          </FadeIn>

          <div className="border-y" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
            {dynamicCaseStudies.map((study, index) => (
              <FadeIn key={study.id} delay={index * 0.05}>
                <Link
                  to="/case-studies/$caseStudyId"
                  params={{ caseStudyId: study.id }}
                  className="grid md:grid-cols-[86px_1fr_auto] gap-4 items-center py-8 no-underline border-b last:border-b-0"
                  style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                >
                  <span className="text-4xl font-bold" style={{ color: 'rgba(255,255,255,0.4)', ...serifHeading }}>
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-3xl md:text-5xl leading-none font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {study.title}
                    </h3>
                    <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {study.category}
                    </p>
                  </div>
                  <span className="text-white/70 text-sm font-semibold inline-flex items-center gap-2">
                    Details <ArrowRight size={14} />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Image LEFT — FAQ RIGHT (alternating back) */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <FadeIn delay={0.1}>
            <div className="relative min-h-[560px] overflow-hidden rounded-2xl lg:sticky lg:top-24" style={{ border: '1px solid var(--border-color)' }}>
              <img
                src="/students-robotics-royaltyfree.jpg"
                alt="Kenyan students participating in robotics program"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.75))' }} />
              <div className="absolute left-6 right-6 bottom-6">
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Ready to get started?
                </p>
                <h3 className="text-2xl font-bold text-white mb-4" style={serifHeading}>
                  Connect with the Federation to bring STEM to your school or community.
                </h3>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold no-underline text-white rounded-lg"
                  style={{ background: 'var(--accent)' }}
                >
                  Get Involved <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <p className="text-sm mb-4 font-medium tracking-wide uppercase" style={{ color: 'var(--accent)' }}>
                Frequently Asked Questions
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8" style={serifHeading}>
                Questions from schools and partners.
              </h2>
            </FadeIn>

            <div className="border-t" style={{ borderColor: 'var(--border-color)' }}>
              {dynamicFaqs.map((faq, index) => {
                const isOpen = openFaq === index

                return (
                  <div key={faq.question} className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between gap-6 text-left py-6"
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      <span className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {faq.question}
                      </span>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </button>
                    {isOpen && (
                      <p className="text-base leading-8 pb-6" style={{ color: 'var(--text-secondary)' }}>
                        {faq.answer}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

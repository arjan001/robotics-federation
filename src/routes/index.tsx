import { Link, createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'
import { ArrowRight, Target, Eye, Lightbulb, GraduationCap, Users, Globe, Award, BookOpen, Cpu, School, Handshake } from 'lucide-react'
import type { CSSProperties } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const serifHeading: CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  letterSpacing: '-0.02em',
}

function HomePage() {
  return (
    <div>
      {/* Hero section */}
      <section className="section-full hero-parallax px-4 relative">
        <div className="max-w-4xl mx-auto w-full py-20 text-center relative z-10">
          <FadeIn delay={0.1}>
            <img
              src="/rfk-logo.png"
              alt="Robotics Federation of Kenya"
              className="h-28 md:h-36 w-auto mx-auto mb-8 object-contain drop-shadow-lg"
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm md:text-base font-medium tracking-widest uppercase mb-6 text-white/70">
              The National Governing Body for Robotics & STEM Education
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white">
              Robotics Federation of Kenya
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-white/90">
              Uniting schools, organizations, and industry partners to build a robust STEM and robotics ecosystem that prepares every Kenyan learner for the future.
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/about"
                className="px-8 py-3.5 rounded-lg font-semibold text-white no-underline text-sm flex items-center gap-2"
                style={{ background: 'var(--accent)' }}
              >
                Learn About Our Mission <ArrowRight size={16} />
              </Link>
              <Link
                to="/register"
                className="px-8 py-3.5 rounded-lg font-semibold no-underline text-sm border flex items-center gap-2"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                  color: '#ffffff',
                  background: 'rgba(255, 255, 255, 0.12)',
                }}
              >
                Get Involved <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="px-4 py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm mb-4 font-medium" style={{ color: 'var(--accent)' }}>
              Who We Are
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl" style={serifHeading}>
              Shaping Kenya's future through robotics and STEM education.
            </h2>
            <p className="text-base leading-8 max-w-2xl mb-12" style={{ color: 'var(--text-secondary)' }}>
              The Robotics Federation of Kenya (RFK) serves as the central coordinating body for all robotics and STEM-related activities across the nation. We work with government agencies, educational institutions, and private sector partners to integrate robotics and STEM into Kenya's education system from primary through secondary school.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target size={28} />,
                title: 'Our Mission',
                text: 'To advance robotics and STEM education across Kenya by coordinating national programs, supporting curriculum integration, fostering competitions, and building partnerships that ensure every learner has access to future-ready skills.',
              },
              {
                icon: <Eye size={28} />,
                title: 'Our Vision',
                text: 'A Kenya where every young person, regardless of background or location, has the opportunity to develop critical thinking, problem-solving, and technical skills through hands-on robotics and STEM education.',
              },
              {
                icon: <Lightbulb size={28} />,
                title: 'Our Values',
                text: 'Inclusivity in access to STEM education. Excellence in program delivery. Collaboration across sectors. Innovation as a driver of national development. Integrity in governance and partnerships.',
              },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div
                  className="p-8 rounded-xl border h-full"
                  style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card)' }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={serifHeading}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do - Federation Roles */}
      <section className="px-4 py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm mb-4 font-medium" style={{ color: 'var(--accent)' }}>
              What We Do
            </p>
            <h2 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight mb-4" style={serifHeading}>
              The Federation's role in Kenya's STEM transformation.
            </h2>
            <p className="text-base leading-8 max-w-2xl mb-12" style={{ color: 'var(--text-secondary)' }}>
              As the national governing body, RFK plays a unique and critical role in ensuring robotics and STEM education is coordinated, standardized, and accessible nationwide.
            </p>
          </FadeIn>

          <div className="border-t" style={{ borderColor: 'var(--border-color)' }}>
            {[
              {
                number: '1',
                title: 'Curriculum Integration & Standards',
                body: 'Working with the Kenya Institute of Curriculum Development (KICD) and the Ministry of Education to integrate robotics and STEM modules into the Competency-Based Curriculum (CBC), ensuring alignment from primary to secondary education.',
              },
              {
                number: '2',
                title: 'National Competition Coordination',
                body: 'Sanctioning and overseeing national robotics competitions including the Inspire Robotics Challenge, regional STEM olympiads, and inter-school coding tournaments. We ensure fair standards, qualified judges, and equitable participation.',
              },
              {
                number: '3',
                title: 'School Onboarding & Support',
                body: 'Facilitating the introduction of STEM and robotics programs in schools through partner organizations like Inspire Robotics Challenge and Stemtrix East Africa. We provide frameworks for equipment procurement, teacher training, and club formation.',
              },
              {
                number: '4',
                title: 'Partnership & Resource Mobilization',
                body: 'Connecting schools with technology providers, corporate sponsors, NGOs, and international organizations to fund equipment, training, and competition participation. Building a sustainable ecosystem of support.',
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

      {/* Impact Stats */}
      <section className="px-4 py-20" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm mb-3 font-medium" style={{ color: 'var(--accent)' }}>
                Our Impact
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={serifHeading}>
                Building Kenya's STEM future, one school at a time.
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '200+', label: 'Schools Engaged', icon: <School size={24} /> },
              { value: '50,000+', label: 'Students Reached', icon: <Users size={24} /> },
              { value: '30+', label: 'Partner Organizations', icon: <Handshake size={24} /> },
              { value: '15+', label: 'Counties Active', icon: <Globe size={24} /> },
            ].map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.08}>
                <div className="text-center p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--accent)' }}>
                    {stat.icon}
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="px-4 py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm mb-4 font-medium" style={{ color: 'var(--accent)' }}>
              Strategic Goals 2025-2030
            </p>
            <h2 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight" style={serifHeading}>
              A five-year roadmap for nationwide STEM adoption.
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: <GraduationCap size={24} />,
                title: 'Universal Access',
                desc: 'Ensure every county in Kenya has at least 5 schools running structured robotics and STEM programs by 2028.',
              },
              {
                icon: <BookOpen size={24} />,
                title: 'Curriculum Alignment',
                desc: 'Complete integration of robotics modules into the CBC framework across all school levels by 2027.',
              },
              {
                icon: <Award size={24} />,
                title: 'Competition Excellence',
                desc: 'Grow national competitions to include 1,000+ teams and achieve representation in international robotics events.',
              },
              {
                icon: <Cpu size={24} />,
                title: 'Teacher Capacity',
                desc: 'Train 5,000+ teachers in robotics and STEM pedagogy to create sustainable in-school programs nationwide.',
              },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08}>
                <div
                  className="p-7 rounded-xl border h-full"
                  style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card)' }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={serifHeading}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Key Partners */}
      <section className="px-4 py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <p className="text-sm mb-3 font-medium" style={{ color: 'var(--accent)' }}>
                  Our Partners
                </p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={serifHeading}>
                  Working together to transform STEM education.
                </h2>
              </div>
              <Link to="/partners" className="text-sm font-semibold no-underline inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                View all partners <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Inspire Robotics Challenge',
                role: 'Competition Partner',
                desc: 'Running Kenya\'s premier student robotics competition across multiple age tracks, providing hands-on competitive experience for thousands of students.',
              },
              {
                name: 'Stemtrix East Africa',
                role: 'Education Partner',
                desc: 'Delivering STEM curriculum, teacher training, and robotics equipment to schools across East Africa. A founding partner of the Federation.',
              },
              {
                name: 'Ministry of Education',
                role: 'Government Partner',
                desc: 'Collaborating on policy frameworks for STEM integration into the national Competency-Based Curriculum and school standards.',
              },
            ].map((partner, index) => (
              <FadeIn key={partner.name} delay={index * 0.1}>
                <div
                  className="p-7 rounded-xl border h-full"
                  style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card)' }}
                >
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                    {partner.role}
                  </span>
                  <h3 className="text-lg font-bold mb-3" style={serifHeading}>
                    {partner.name}
                  </h3>
                  <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
                    {partner.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-5" style={serifHeading}>
              Ready to bring robotics to your school?
            </h2>
            <p className="text-base leading-8 max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
              The Federation provides the framework, partnerships, and support to help any school in Kenya launch or grow a STEM and robotics program. Join the national movement today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3.5 rounded-lg font-semibold text-white no-underline text-sm flex items-center gap-2"
                style={{ background: 'var(--accent)' }}
              >
                Register Your School <ArrowRight size={16} />
              </Link>
              <Link
                to="/partners"
                className="px-8 py-3.5 rounded-lg font-semibold no-underline text-sm flex items-center gap-2 border"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                Become a Partner <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

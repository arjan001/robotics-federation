import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, MapPin, Phone, ArrowRight, ArrowUp, Globe, Users, BookOpen, Linkedin, Twitter, Navigation } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden">
      {/* CTA Banner */}
      <div style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Join the Movement for STEM Excellence in Kenya
          </h2>
          <p className="text-base leading-7 mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Whether you're a school, organization, or individual passionate about robotics and STEM education, there's a place for you in the Federation.
          </p>
          <form
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 px-5 py-3.5 text-sm outline-none rounded-lg"
              style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: '#ffffff' }}
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white inline-flex items-center justify-center gap-2 rounded-lg transition-colors"
              style={{ background: 'var(--accent)', border: 'none', cursor: 'pointer' }}
            >
              {subscribed ? 'Subscribed!' : 'Stay Updated'} <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Feature strip */}
      <div style={{ background: '#1e293b', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-4 px-6 py-5">
              <Globe size={20} style={{ color: 'rgba(255,255,255,0.5)' }} />
              <div>
                <p className="text-sm font-semibold text-white">Nationwide Reach</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Programs across all 47 counties</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-5">
              <BookOpen size={20} style={{ color: 'rgba(255,255,255,0.5)' }} />
              <div>
                <p className="text-sm font-semibold text-white">Curriculum Integration</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>STEM aligned to CBC framework</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-5">
              <Users size={20} style={{ color: 'rgba(255,255,255,0.5)' }} />
              <div>
                <p className="text-sm font-semibold text-white">Growing Community</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Schools, partners, and mentors united</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] gap-10 lg:gap-8">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/rfk-logo.png"
                  alt="Robotics Federation of Kenya"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <h4 className="text-lg font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                Robotics Federation of Kenya
              </h4>
              <div className="w-10 h-[2px] mb-4" style={{ background: 'var(--accent)' }} />
              <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                The national governing body for robotics and STEM education in Kenya — your central hub for programs, competitions, and curriculum integration.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-full flex items-center justify-center no-underline transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#1DA1F2'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full flex items-center justify-center no-underline transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#0077B5'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="mailto:info@roboticsfederationkenya.org"
                  aria-label="Email"
                  className="w-10 h-10 rounded-full flex items-center justify-center no-underline transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>

            {/* Federation links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-6">
                Federation
              </h4>
              <div className="space-y-3.5">
                {[
                  { to: '/about', label: 'About Us' },
                  { to: '/challenges', label: 'Programs' },
                  { to: '/events', label: 'Events' },
                  { to: '/register', label: 'Get Involved' },
                ].map((link) => (
                  <Link key={link.to} to={link.to} className="block text-sm no-underline transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Ecosystem links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-6">
                Ecosystem
              </h4>
              <div className="space-y-3.5">
                {[
                  { to: '/schools', label: 'Member Schools' },
                  { to: '/partners', label: 'Partners & Affiliates' },
                  { to: '/organizers', label: 'Leadership' },
                ].map((link) => (
                  <Link key={link.to} to={link.to} className="block text-sm no-underline transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-6">
                Get in Touch
              </h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Navigation size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <div>
                    <p className="text-sm font-semibold text-white">Robotics Federation of Kenya</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Westlands, Nairobi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <a href="tel:+254700000000" className="text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>+254 700 000 000</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <a href="mailto:info@roboticsfederationkenya.org" className="text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>info@roboticsfederationkenya.org</a>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Westlands+Nairobi+Kenya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold no-underline rounded-lg transition-colors duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', background: 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
              >
                <MapPin size={13} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Policy links row */}
      <div style={{ background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {[
              { to: '/about', label: 'FAQ' },
              { to: '/privacy-policy', label: 'Privacy Policy' },
              { to: '/terms', label: 'Terms of Service' },
              { to: '/cookie-policy', label: 'Cookie Policy' },
            ].map((link, i) => (
              <span key={link.to} className="flex items-center gap-6">
                {i > 0 && <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>}
                <Link to={link.to} className="no-underline hover:text-white transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: '#020617', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <p>
              &copy; {new Date().getFullYear()} Robotics Federation of Kenya. All rights reserved.
            </p>
            <p>
              Designed & developed by{' '}
              <a
                href="https://oneplusafrica.com"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline font-medium transition-colors duration-200"
                style={{ color: 'var(--accent)' }}
              >
                OnePlusAfrica Tech Solutions
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full flex items-center justify-center text-white z-40 transition-all duration-200 hover:scale-110"
        style={{ background: 'var(--bg-dark)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  )
}

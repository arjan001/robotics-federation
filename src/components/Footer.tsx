import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, MapPin, Phone, ArrowRight, ArrowUp, Globe, Users, BookOpen, Linkedin, Twitter } from 'lucide-react'

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
              style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', color: '#ffffff' }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-10 lg:gap-8">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: 'var(--accent)' }}
                >
                  RFK
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Robotics Federation
                  </h3>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>of Kenya</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                The national governing body for robotics and STEM education in Kenya. Coordinating programs, competitions, and curriculum integration to prepare the next generation of innovators.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-full flex items-center justify-center no-underline text-white transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <Twitter size={15} />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full flex items-center justify-center no-underline text-white transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <Linkedin size={15} />
                </a>
                <a
                  href="mailto:info@roboticsfederationkenya.org"
                  aria-label="Email"
                  className="w-9 h-9 rounded-full flex items-center justify-center no-underline text-white transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <Mail size={15} />
                </a>
              </div>
            </div>

            {/* Federation links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-5">
                Federation
              </h4>
              <div className="space-y-3">
                <Link to="/about" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  About Us
                </Link>
                <Link to="/challenges" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Programs
                </Link>
                <Link to="/events" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Events
                </Link>
                <Link to="/register" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Get Involved
                </Link>
              </div>
            </div>

            {/* Ecosystem links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-5">
                Ecosystem
              </h4>
              <div className="space-y-3">
                <Link to="/schools" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Member Schools
                </Link>
                <Link to="/partners" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Partners & Affiliates
                </Link>
                <Link to="/organizers" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Leadership
                </Link>
              </div>
            </div>

            {/* Contact column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-5">
                Contact
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  <div>
                    <p className="text-sm font-medium text-white">Nairobi, Kenya</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Westlands, Nairobi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  <a href="tel:+254700000000" className="text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>+254 700 000 000</a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  <a href="mailto:info@roboticsfederationkenya.org" className="text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>info@roboticsfederationkenya.org</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: '#020617', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <p>
              &copy; {new Date().getFullYear()} Robotics Federation of Kenya. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy Policy</Link>
              <Link to="/terms" className="no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>Terms of Use</Link>
              <Link to="/cookie-policy" className="no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>Cookies</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white z-40 transition-opacity hover:opacity-80"
        style={{ background: 'var(--accent)', border: 'none', cursor: 'pointer' }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  )
}

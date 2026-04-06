import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight, ArrowUp, Truck, Shield, RotateCcw } from 'lucide-react'
import type { CSSProperties } from 'react'

const serifHeading: CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  letterSpacing: '-0.02em',
}

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
      {/* CTA Banner - "Let's Work Together" inspired by reference */}
      <div style={{ background: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ ...serifHeading, fontStyle: 'italic' }}
          >
            Let's Build the Future Together
          </h2>
          <p className="text-base leading-8 mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Whether you need a single team mentored or a complete program partnership, we're ready to help.
          </p>
          <form
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 px-5 py-3.5 text-sm text-white outline-none"
              style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'transparent' }}
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase text-black inline-flex items-center justify-center gap-2"
              style={{ background: '#ffffff', border: 'none', cursor: 'pointer' }}
            >
              Get in Touch <ArrowRight size={13} />
            </button>
          </form>
        </div>
      </div>

      {/* Service strip - inspired by reference's "Nationwide Delivery / Quality / Returns" */}
      <div style={{ background: '#2a2a2a', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-4 px-6 py-5">
              <Truck size={22} style={{ color: 'rgba(255,255,255,0.5)' }} />
              <div>
                <p className="text-sm font-semibold text-white">Pan-African Reach</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Events across East Africa</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-5">
              <Shield size={22} style={{ color: 'rgba(255,255,255,0.5)' }} />
              <div>
                <p className="text-sm font-semibold text-white">Quality Programs</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Structured STEM curriculum</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-5">
              <RotateCcw size={22} style={{ color: 'rgba(255,255,255,0.5)' }} />
              <div>
                <p className="text-sm font-semibold text-white">Ongoing Support</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Year-round mentorship</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal rule */}
      <div style={{ background: '#1e1e1e', height: '1px' }} />

      {/* Main footer - 4-column layout matching reference */}
      <div style={{ background: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-10 lg:gap-8">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/inspire-robotics-logo.jpeg"
                  alt="Inspire Robotics"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <h3
                  className="text-2xl md:text-3xl font-bold text-white"
                  style={serifHeading}
                >
                  Inspire Robotics
                </h3>
              </div>
              <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                East Africa's premier student robotics platform for practical STEM learning, innovation, and future-ready skills — your destination for competitive robotics.
              </p>
              {/* Social icons - colored circles like reference */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full flex items-center justify-center no-underline text-white transition-opacity hover:opacity-80"
                  style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full flex items-center justify-center no-underline text-white transition-opacity hover:opacity-80"
                  style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full flex items-center justify-center no-underline text-white transition-opacity hover:opacity-80"
                  style={{ background: '#25D366' }}
                >
                  <Facebook size={16} />
                </a>
              </div>
            </div>

            {/* Competition links */}
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5"
              >
                Competition
              </h4>
              <div className="space-y-3">
                <Link to="/about" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  About
                </Link>
                <Link to="/challenges" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Challenges
                </Link>
                <Link to="/events" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Events
                </Link>
                <Link to="/register" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Register
                </Link>
              </div>
            </div>

            {/* Ecosystem links */}
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5"
              >
                Ecosystem
              </h4>
              <div className="space-y-3">
                <Link to="/schools" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Schools
                </Link>
                <Link to="/partners" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Partners & Sponsors
                </Link>
                <Link to="/organizers" className="block text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Organizers
                </Link>
              </div>
            </div>

            {/* Contact / Visit column - matching reference's "VISIT OUR STORE" */}
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5"
              >
                Get in Touch
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  <div>
                    <p className="text-sm font-semibold text-white">Nairobi</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Kabarnet Road off Ngong Road, J2 Jamhuri Cres, Nairobi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  <div className="flex flex-col gap-1">
                    <a href="tel:+254728128353" className="text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>+254 728 128 353</a>
                    <a href="tel:+254110394940" className="text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>+254 110 394 940</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  <a href="mailto:stemtrix@gmail.com" className="text-sm no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>stemtrix@gmail.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 flex-shrink-0" />
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    <p>Mon - Fri: 8AM - 6PM</p>
                    <p>Sat: 9AM - 1PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom links bar - matching reference's pipe-separated policy links */}
      <div style={{ background: '#1a1a1a', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <Link to="/about" className="no-underline hover:text-white transition-colors px-2" style={{ color: 'rgba(255,255,255,0.35)' }}>About</Link>
            <span>|</span>
            <Link to="/challenges" className="no-underline hover:text-white transition-colors px-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Challenges</Link>
            <span>|</span>
            <Link to="/events" className="no-underline hover:text-white transition-colors px-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Events</Link>
            <span>|</span>
            <Link to="/register" className="no-underline hover:text-white transition-colors px-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Register</Link>
            <span>|</span>
            <Link to="/partners" className="no-underline hover:text-white transition-colors px-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Partners</Link>
            <span>|</span>
            <Link to="/schools" className="no-underline hover:text-white transition-colors px-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Schools</Link>
          </div>
        </div>
      </div>

      {/* Copyright bar - matching reference bottom */}
      <div style={{ background: '#141414', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>
              &copy; {new Date().getFullYear()} <strong className="text-white/70">Stemtrix EA</strong>. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top button - matching reference */}
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

import { createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
})

function TermsPage() {
  return (
    <div>
      <section className="py-24 px-4 text-center" style={{ background: 'var(--bg-dark)' }}>
        <FadeIn>
          <p className="text-sm text-white/50 uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Terms of Use</h1>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--text-on-dark-secondary)' }}>
            Last updated: March 2026
          </p>
        </FadeIn>
      </section>

      <section className="py-16 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Acceptance of Terms</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  By accessing and using the Inspire Robotics Challenge website and services operated by Stemtrix EA, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website or services. Stemtrix EA is registered and operates in Nairobi, Kenya at Kabarnet Road off Ngong Road, J2 Jamhuri Cres.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Competition Participation</h2>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li>Participants must register through an affiliated school or as an independent team through the official registration process.</li>
                  <li>Participants aged under 18 must have parental or guardian consent, typically facilitated through the registering school.</li>
                  <li>Teams must adhere to the competition rules, guidelines, and code of conduct as published for each season.</li>
                  <li>Stemtrix EA reserves the right to disqualify teams that violate competition rules or exhibit unsportsmanlike behavior.</li>
                  <li>Competition schedules, venues, and formats are subject to change at the discretion of the organizing committee.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. Intellectual Property</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  All content on this website, including text, graphics, logos, images, and software, is the property of Stemtrix EA or its content suppliers and is protected by Kenyan and international copyright laws. The Inspire Robotics Challenge name, logo, and branding are trademarks of Stemtrix EA. Participating teams retain ownership of their robot designs and code, but grant Stemtrix EA a non-exclusive license to use photos, videos, and descriptions of their work for promotional and educational purposes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Website Use</h2>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li>You may use this website for lawful purposes only.</li>
                  <li>You must not attempt to gain unauthorized access to our systems or interfere with the website&apos;s operation.</li>
                  <li>Information provided on this website is for general informational purposes and may be updated without notice.</li>
                  <li>We strive to keep the website accessible and functional but do not guarantee uninterrupted availability.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Registration and Fees</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Competition registration fees, where applicable, are published on the registration page for each season. Fees are non-refundable unless a season or event is cancelled by Stemtrix EA. Scholarship and fee waiver programs may be available for qualifying teams from underserved communities.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Liability</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Stemtrix EA takes reasonable measures to ensure the safety of participants during competition events. However, participation in robotics competitions involves inherent risks. Stemtrix EA shall not be liable for any injuries, damages, or losses arising from participation in competition activities, except where caused by gross negligence. Participating schools and guardians acknowledge these risks upon registration.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>7. Media and Photography</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  By participating in Inspire Robotics Challenge events, participants and their guardians consent to being photographed and filmed. These materials may be used on our website, social media, and promotional materials. If you wish to opt out of media coverage, please notify us in writing before the event.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>8. Governing Law</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  These Terms of Use are governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>9. Contact</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  For questions about these terms, contact us:
                </p>
                <div className="mt-3 p-4 rounded-lg text-sm" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                  <p><strong>Stemtrix EA</strong></p>
                  <p>Kabarnet Road off Ngong Road, J2 Jamhuri Cres, Nairobi, Kenya</p>
                  <p>Phone: +254 728 128 353 / +254 110 394 940</p>
                  <p>Email: info@stemtrixea.org</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

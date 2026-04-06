import { createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <div>
      <section className="py-24 px-4 text-center" style={{ background: 'var(--bg-dark)' }}>
        <FadeIn>
          <p className="text-sm text-white/50 uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--text-on-dark-secondary)' }}>
            Last updated: March 2026
          </p>
        </FadeIn>
      </section>

      <section className="py-16 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto prose-style">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Introduction</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Stemtrix EA (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the Inspire Robotics Challenge website and related services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or participate in our programs. We are located at Kabarnet Road off Ngong Road, J2 Jamhuri Cres, Nairobi, Kenya.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Information We Collect</h2>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  We may collect the following types of information:
                </p>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li><strong>Personal Information:</strong> Name, email address, phone number, school name, and age of participants provided during registration.</li>
                  <li><strong>Team Information:</strong> Team name, member details, school affiliation, and competition track preferences.</li>
                  <li><strong>Communication Data:</strong> Information you provide when contacting us via email, phone (+254 728 128 353 / +254 110 394 940), or our website forms.</li>
                  <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our website, collected automatically through cookies and similar technologies.</li>
                  <li><strong>Media:</strong> Photos and videos taken during competition events for promotional and educational purposes.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. How We Use Your Information</h2>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li>To register and manage team participation in the Inspire Robotics Challenge</li>
                  <li>To communicate competition schedules, updates, and important announcements</li>
                  <li>To process partnership and sponsorship inquiries</li>
                  <li>To send newsletters and marketing communications (with your consent)</li>
                  <li>To improve our website, programs, and user experience</li>
                  <li>To comply with legal obligations under Kenyan law</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Data Protection</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  We implement appropriate technical and organizational measures to protect your personal data in accordance with the Kenya Data Protection Act, 2019. We use secure servers and encryption to safeguard your information. Access to personal data is restricted to authorized personnel only.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Children&apos;s Privacy</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Our programs serve students aged 6-18. We collect information about minors only with parental or guardian consent, typically through school-authorized registration processes. We do not knowingly collect personal information from children without appropriate consent. Parents and guardians may contact us to review, modify, or delete their child&apos;s information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Sharing of Information</h2>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  We do not sell your personal information. We may share information with:
                </p>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li>Partner schools for coordination of competition activities</li>
                  <li>Sponsors and partners as required for program delivery (aggregated, non-identifying data only)</li>
                  <li>Service providers who assist in operating our website and programs</li>
                  <li>Government authorities when required by Kenyan law</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>7. Your Rights</h2>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Under the Kenya Data Protection Act, 2019, you have the right to:
                </p>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to the processing of your data</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>8. Contact Us</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:
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

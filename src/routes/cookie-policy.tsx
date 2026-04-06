import { createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'

export const Route = createFileRoute('/cookie-policy')({
  component: CookiePolicyPage,
})

function CookiePolicyPage() {
  return (
    <div>
      <section className="py-24 px-4 text-center" style={{ background: 'var(--bg-dark)' }}>
        <FadeIn>
          <p className="text-sm text-white/50 uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Cookie Policy</h1>
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
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. What Are Cookies</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to website operators. This Cookie Policy explains how the Inspire Robotics Challenge website, operated by Stemtrix EA, uses cookies and similar technologies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. How We Use Cookies</h2>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  We use cookies for the following purposes:
                </p>
                <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li>
                    <strong>Essential Cookies:</strong> These are necessary for the website to function properly. They enable core features like page navigation, form submissions, and access to secure areas. The website cannot function properly without these cookies.
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the website experience for all users.
                  </li>
                  <li>
                    <strong>Functional Cookies:</strong> These remember your preferences and choices (such as language or region) to provide a more personalized experience.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. Third-Party Cookies</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Some cookies on our website are placed by third-party services that appear on our pages. These may include analytics providers (such as Google Analytics) and social media platforms. We do not control these cookies and recommend reviewing the privacy policies of these third parties for more information about their cookie practices.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Managing Cookies</h2>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  You can control and manage cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li>View what cookies are stored on your device and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block cookies from specific websites</li>
                  <li>Block all cookies</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
                <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>
                  Please note that blocking or deleting cookies may affect the functionality of this website and your user experience.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Data Protection</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Our use of cookies complies with the Kenya Data Protection Act, 2019. For more information about how we handle your personal data, please refer to our <a href="/privacy-policy" style={{ color: 'var(--accent)' }}>Privacy Policy</a>.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Updates to This Policy</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. Any changes will be posted on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>7. Contact Us</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  If you have questions about our use of cookies, contact us:
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

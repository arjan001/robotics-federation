import { createFileRoute } from '@tanstack/react-router'
import { FadeIn } from '@/components/FadeIn'
import { useContentModule } from '@/lib/use-content-module'
import { useState } from 'react'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Users,
  Handshake,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  GraduationCap,
  Sparkles,
  Loader2,
} from 'lucide-react'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

type RegistrationType = null | 'team' | 'partner'

function RegisterPage() {
  const [type, setType] = useState<RegistrationType>(null)
  const { items: registerItems } = useContentModule<{
    id: string
    title: string
    subtitle: string
    teamTitle: string
    teamDescription: string
    partnerTitle: string
    partnerDescription: string
  }>('register', [
    {
      id: 'register-main',
      title: 'Get Involved',
      subtitle: 'Register your school with the Federation or express interest as a partner organization.',
      teamTitle: 'School Registration',
      teamDescription: 'Register your school to join the Robotics Federation of Kenya and access STEM programs, competitions, and resources.',
      partnerTitle: 'Partner Interest',
      partnerDescription: 'Interested in partnering with or sponsoring the Robotics Federation of Kenya?',
    },
  ])
  const copy = registerItems[0]

  return (
    <div>
      <section className="py-24 px-4 text-center" style={{ background: 'var(--bg-dark)' }}>
        <FadeIn>
          <p className="text-sm text-white/50 uppercase tracking-widest mb-4">Home &mdash; Register</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">{copy?.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--text-on-dark-secondary)' }}>
            {copy?.subtitle}
          </p>
        </FadeIn>
      </section>

      <section className="section-full px-4 py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-4xl mx-auto w-full">
          {type === null && (
            <FadeIn>
              <div className="grid sm:grid-cols-2 gap-8">
                <RegistrationCard
                  icon={<Users size={28} />}
                  title={copy?.teamTitle || 'Team Registration'}
                  description={copy?.teamDescription || ''}
                  features={['Multi-step guided process', 'Team & school details', 'Track selection', 'Equipment assessment']}
                  onClick={() => setType('team')}
                />
                <RegistrationCard
                  icon={<Handshake size={28} />}
                  title={copy?.partnerTitle || 'Partner Interest'}
                  description={copy?.partnerDescription || ''}
                  features={['Organization profile', 'Partnership type selection', 'Contribution details', 'Quick submission']}
                  onClick={() => setType('partner')}
                />
              </div>
            </FadeIn>
          )}

          {type === 'team' && (
            <FadeIn>
              <button
                onClick={() => setType(null)}
                className="flex items-center gap-1 text-sm mb-6 font-medium"
                style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <ArrowLeft size={14} /> Back to options
              </button>
              <TeamRegistration />
            </FadeIn>
          )}

          {type === 'partner' && (
            <FadeIn>
              <button
                onClick={() => setType(null)}
                className="flex items-center gap-1 text-sm mb-6 font-medium"
                style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <ArrowLeft size={14} /> Back to options
              </button>
              <PartnerRegistration />
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  )
}

function RegistrationCard({
  icon,
  title,
  description,
  features,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="card p-8 text-left cursor-pointer hover:border-[var(--accent)] transition-all group"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
        style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
      >
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>
      <ul className="space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Check size={12} style={{ color: 'var(--accent)' }} />
            {f}
          </li>
        ))}
      </ul>
      <div
        className="mt-6 flex items-center gap-1.5 text-sm font-semibold"
        style={{ color: 'var(--accent)' }}
      >
        Get Started <ArrowRight size={14} />
      </div>
    </button>
  )
}

/* ─── Team Registration (Multi-Step) ─── */

interface TeamFormData {
  schoolName: string
  city: string
  county: string
  contactPerson: string
  email: string
  phone: string
  teamName: string
  memberCount: string
  ageRange: string
  experience: string
  competitionTrack: string
  hasEquipment: string
  coachName: string
  coachEmail: string
  notes: string
}

const emptyTeamForm: TeamFormData = {
  schoolName: '', city: '', county: '', contactPerson: '', email: '', phone: '',
  teamName: '', memberCount: '', ageRange: '', experience: '',
  competitionTrack: '', hasEquipment: '', coachName: '', coachEmail: '', notes: '',
}

function TeamRegistration() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<TeamFormData>(emptyTeamForm)

  const set = (field: keyof TeamFormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }))

  const steps = [
    { label: 'School Info', icon: <GraduationCap size={14} /> },
    { label: 'Team Details', icon: <Users size={14} /> },
    { label: 'Track & Equipment', icon: <Sparkles size={14} /> },
    { label: 'Review & Submit', icon: <Check size={14} /> },
  ]

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/registrations/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          memberCount: parseInt(form.memberCount, 10) || 1,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.details?.join(', ') || data.error || 'Submission failed')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="card p-10 text-center" style={{ background: 'var(--bg-card)' }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}
        >
          <Check size={40} />
        </div>
        <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Registration Submitted!
        </h3>
        <p className="max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Thank you for registering <strong>{form.teamName}</strong>. The Federation team will review your
          application and contact you within 5 business days at <strong>{form.email}</strong>.
        </p>
        <div
          className="mt-6 inline-block px-4 py-2 rounded-lg text-sm"
          style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
        >
          Reference: Your registration is being processed
        </div>
      </div>
    )
  }

  return (
    <div className="card p-0 overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
      {/* Progress Header */}
      <div className="px-6 pt-6 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
          Team Registration
        </h3>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
          Step {step + 1} of {steps.length} &mdash; {steps[step].label}
        </p>
        <div className="flex gap-2">
          {steps.map((s, i) => (
            <div key={s.label} className="flex-1">
              <div
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: i <= step ? 'var(--accent)' : 'var(--border-color)',
                }}
              />
              <p
                className="text-[10px] mt-1.5 font-medium hidden sm:block"
                style={{ color: i <= step ? 'var(--text-primary)' : 'var(--text-muted)' }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' }}>
            {error}
          </div>
        )}

        {step === 0 && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="School Name" icon={<GraduationCap size={16} />} placeholder="Enter your school name" value={form.schoolName} onChange={set('schoolName')} required />
              <FormInput label="City / Town" icon={<MapPin size={16} />} placeholder="e.g., Nairobi" value={form.city} onChange={set('city')} required />
            </div>
            <FormInput label="County / Region" icon={<MapPin size={16} />} placeholder="e.g., Nairobi County" value={form.county} onChange={set('county')} />
            <FormInput label="Contact Person (Teacher/Coach)" icon={<Users size={16} />} placeholder="Full name of primary contact" value={form.contactPerson} onChange={set('contactPerson')} required />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Email Address" icon={<Mail size={16} />} type="email" placeholder="school@example.com" value={form.email} onChange={set('email')} required />
              <FormInput label="Phone Number" icon={<Phone size={16} />} type="tel" placeholder="+254..." value={form.phone} onChange={set('phone')} required />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Team Name" icon={<Sparkles size={16} />} placeholder="Choose a creative team name" value={form.teamName} onChange={set('teamName')} required />
              <FormInput label="Number of Members" type="number" placeholder="4-8 recommended" value={form.memberCount} onChange={set('memberCount')} required />
            </div>
            <FormSelect
              label="Age Range of Members"
              value={form.ageRange}
              onChange={set('ageRange')}
              options={[
                { value: '6-10', label: '6-10 years (Explore)' },
                { value: '11-14', label: '11-14 years (Innovators)' },
                { value: '15-18', label: '15-18 years (Challengers)' },
              ]}
              required
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Coach / Mentor Name" placeholder="Optional mentor name" value={form.coachName} onChange={set('coachName')} />
              <FormInput label="Coach Email" type="email" placeholder="coach@example.com" value={form.coachEmail} onChange={set('coachEmail')} />
            </div>
            <FormTextarea label="Previous Competition Experience" placeholder="Briefly describe any robotics or STEM competition experience (optional)" value={form.experience} onChange={set('experience')} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <FormSelect
              label="Competition Track"
              value={form.competitionTrack}
              onChange={set('competitionTrack')}
              options={[
                { value: 'explore', label: 'Explore (Ages 6-10)' },
                { value: 'innovators', label: 'Innovators (Ages 11-14)' },
                { value: 'challengers', label: 'Challengers (Ages 15-18)' },
              ]}
              required
            />
            <FormSelect
              label="Do you have access to robotics equipment?"
              value={form.hasEquipment}
              onChange={set('hasEquipment')}
              options={[
                { value: 'yes', label: 'Yes, we have our own equipment' },
                { value: 'partial', label: 'We have some equipment' },
                { value: 'no', label: 'No, we need a starter kit' },
              ]}
              required
            />
            <FormTextarea label="Additional Notes" placeholder="Any additional information, special requirements, or questions..." value={form.notes} onChange={set('notes')} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
              <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                School Information
              </div>
              <div className="p-4 space-y-2">
                <ReviewRow label="School" value={form.schoolName} />
                <ReviewRow label="Location" value={[form.city, form.county].filter(Boolean).join(', ')} />
                <ReviewRow label="Contact" value={form.contactPerson} />
                <ReviewRow label="Email" value={form.email} />
                <ReviewRow label="Phone" value={form.phone} />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
              <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                Team Details
              </div>
              <div className="p-4 space-y-2">
                <ReviewRow label="Team Name" value={form.teamName} />
                <ReviewRow label="Members" value={form.memberCount} />
                <ReviewRow label="Age Range" value={form.ageRange} />
                <ReviewRow label="Track" value={form.competitionTrack} />
                <ReviewRow label="Equipment" value={form.hasEquipment} />
                {form.coachName && <ReviewRow label="Coach" value={form.coachName} />}
              </div>
            </div>
            <div className="p-4 rounded-xl text-sm" style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--accent)' }}>
              By submitting, you agree to the Robotics Federation of Kenya program guidelines and code of conduct.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className="px-5 py-2.5 rounded-lg text-sm font-medium border"
            style={{
              visibility: step === 0 ? 'hidden' : 'visible',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <span className="flex items-center gap-1.5"><ArrowLeft size={14} /> Back</span>
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white flex items-center gap-1.5"
              style={{ background: 'var(--accent)', border: 'none', cursor: 'pointer' }}
            >
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white flex items-center gap-1.5"
              style={{ background: submitting ? '#999' : 'var(--accent)', border: 'none', cursor: submitting ? 'wait' : 'pointer' }}
            >
              {submitting ? (
                <><Loader2 size={14} className="animate-spin" /> Submitting...</>
              ) : (
                <>Submit Registration <Check size={14} /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Partner Registration ─── */

interface PartnerFormData {
  organizationName: string
  contactPerson: string
  email: string
  phone: string
  partnershipType: string
  website: string
  contribution: string
}

const emptyPartnerForm: PartnerFormData = {
  organizationName: '', contactPerson: '', email: '', phone: '',
  partnershipType: '', website: '', contribution: '',
}

function PartnerRegistration() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<PartnerFormData>(emptyPartnerForm)

  const set = (field: keyof PartnerFormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }))

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/registrations/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.details?.join(', ') || data.error || 'Submission failed')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="card p-10 text-center" style={{ background: 'var(--bg-card)' }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}
        >
          <Check size={40} />
        </div>
        <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Thank You for Your Interest!
        </h3>
        <p className="max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          We've received <strong>{form.organizationName}</strong>'s partnership inquiry.
          Our team will reach out to <strong>{form.email}</strong> within 3 business days.
        </p>
      </div>
    )
  }

  return (
    <div className="card p-0 overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
      <div className="px-6 pt-6 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
          Partner Registration
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Tell us about your organization and how you'd like to contribute
        </p>
      </div>
      <div className="p-6 space-y-4">
        {error && (
          <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' }}>
            {error}
          </div>
        )}
        <FormInput label="Organization Name" icon={<Building2 size={16} />} placeholder="Enter organization name" value={form.organizationName} onChange={set('organizationName')} required />
        <div className="grid sm:grid-cols-2 gap-4">
          <FormInput label="Contact Person" icon={<Users size={16} />} placeholder="Full name" value={form.contactPerson} onChange={set('contactPerson')} required />
          <FormInput label="Website" icon={<Globe size={16} />} placeholder="https://example.com" value={form.website} onChange={set('website')} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormInput label="Email Address" icon={<Mail size={16} />} type="email" placeholder="email@organization.com" value={form.email} onChange={set('email')} required />
          <FormInput label="Phone Number" icon={<Phone size={16} />} type="tel" placeholder="+254..." value={form.phone} onChange={set('phone')} required />
        </div>
        <FormSelect
          label="Partnership Type"
          value={form.partnershipType}
          onChange={set('partnershipType')}
          options={[
            { value: 'sponsor', label: 'Financial Sponsor' },
            { value: 'technology', label: 'Technology Partner' },
            { value: 'educational', label: 'Educational Partner' },
            { value: 'media', label: 'Media Partner' },
            { value: 'venue', label: 'Venue Partner' },
            { value: 'mentorship', label: 'Mentorship Partner' },
            { value: 'other', label: 'Other' },
          ]}
          required
        />
        <FormTextarea label="How would you like to contribute?" placeholder="Describe how your organization can support the competition — sponsorship, equipment, mentoring, venue, media coverage, etc." value={form.contribution} onChange={set('contribution')} />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full px-5 py-3.5 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2 mt-2"
          style={{ background: submitting ? '#999' : 'var(--accent)', border: 'none', cursor: submitting ? 'wait' : 'pointer' }}
        >
          {submitting ? (
            <><Loader2 size={16} className="animate-spin" /> Submitting...</>
          ) : (
            <>Submit Partnership Interest <ArrowRight size={16} /></>
          )}
        </button>
      </div>
    </div>
  )
}

/* ─── Shared Form Components ─── */

function FormInput({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  icon,
  required,
}: {
  label: string
  placeholder: string
  type?: string
  value: string
  onChange: (val: string) => void
  icon?: React.ReactNode
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
        {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full py-2.5 rounded-lg text-sm border outline-none transition-colors focus:border-[var(--accent)]"
          style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
            paddingLeft: icon ? '2.5rem' : '1rem',
            paddingRight: '1rem',
          }}
        />
      </div>
    </div>
  )
}

function FormSelect({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string
  value: string
  onChange: (val: string) => void
  options: { value: string; label: string }[]
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
        {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none transition-colors focus:border-[var(--accent)]"
        style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

function FormTextarea({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (val: string) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg text-sm border min-h-[100px] outline-none transition-colors focus:border-[var(--accent)]"
        style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
      />
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex justify-between text-sm py-1" style={{ borderBottom: '1px solid var(--border-color)' }}>
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  )
}

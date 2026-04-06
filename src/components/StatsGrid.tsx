import { motion } from 'framer-motion'

interface StatCardProps {
  value: number
  label: string
  suffix?: string
  delay?: number
}

export function StatCard({ value, label, suffix = '', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="p-6 text-center rounded-xl"
      style={{ background: 'var(--bg-dark-secondary)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
        {value.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm font-medium" style={{ color: 'var(--text-on-dark-secondary)' }}>
        {label}
      </div>
    </motion.div>
  )
}

interface StatsGridProps {
  stats: { value: number; label: string; suffix?: string }[]
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, i) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          label={stat.label}
          suffix={stat.suffix}
          delay={i * 0.1}
        />
      ))}
    </div>
  )
}

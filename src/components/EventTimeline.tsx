import { motion } from 'framer-motion'
import type { EventData } from '@/data/events'
import { Calendar, MapPin, Trophy, Users } from 'lucide-react'

interface EventTimelineProps {
  events: EventData[]
}

export function EventTimeline({ events }: EventTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
        style={{ background: 'var(--border-color)' }}
      />

      <div className="space-y-12">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 border-4"
                style={{
                  borderColor:
                    event.status === 'current'
                      ? 'var(--accent)'
                      : event.status === 'upcoming'
                        ? 'var(--accent)'
                        : 'var(--border-color)',
                  background:
                    event.status === 'current'
                      ? 'var(--accent)'
                      : 'var(--bg-primary)',
                }}
              />

              {/* Content card */}
              <div
                className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] card p-6 ${
                  isLeft ? 'md:mr-auto' : 'md:ml-auto'
                }`}
              >
                {/* Status badge */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                  style={{
                    background:
                      event.status === 'current'
                        ? 'var(--accent)'
                        : event.status === 'upcoming'
                          ? 'var(--accent-light)'
                          : 'var(--bg-secondary)',
                    color:
                      event.status === 'current'
                        ? '#ffffff'
                        : event.status === 'upcoming'
                          ? 'var(--accent)'
                          : 'var(--text-secondary)',
                  }}
                >
                  {event.status === 'current'
                    ? 'Current Season'
                    : event.status === 'upcoming'
                      ? 'Upcoming'
                      : 'Completed'}
                </span>

                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {event.name}
                </h3>

                <div
                  className="flex flex-wrap gap-4 text-sm mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {event.location}
                  </span>
                  {event.teamsParticipated && (
                    <span className="flex items-center gap-1.5">
                      <Users size={14} />
                      {event.teamsParticipated} teams
                    </span>
                  )}
                </div>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {event.description}
                </p>

                {/* Winners */}
                {event.winners && event.winners.length > 0 && (
                  <div className="mb-3">
                    <h4
                      className="text-sm font-semibold mb-2 flex items-center gap-1.5"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <Trophy size={14} style={{ color: 'var(--accent)' }} />
                      Winners
                    </h4>
                    <div className="space-y-1.5">
                      {event.winners.map((winner) => (
                        <div
                          key={`${winner.team}-${winner.award}`}
                          className="text-xs px-3 py-1.5 rounded-md"
                          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                        >
                          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {winner.team}
                          </span>{' '}
                          ({winner.school}) — {winner.award}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                {event.highlights && (
                  <ul className="space-y-1">
                    {event.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-xs flex items-start gap-2"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <span style={{ color: 'var(--accent)' }}>•</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

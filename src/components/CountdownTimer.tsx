import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: string
  label?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - new Date().getTime()
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export function CountdownTimer({ targetDate, label = 'Next Event' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  return (
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
        {label}
      </p>
      <div className="flex items-center justify-center gap-3 md:gap-4">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-3 md:gap-4">
            <div className="flex flex-col items-center">
              <div
                className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 text-2xl md:text-3xl font-bold rounded-xl"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              >
                {String(unit.value).padStart(2, '0')}
              </div>
              <span className="text-xs mt-2 font-medium" style={{ color: 'var(--text-muted)' }}>
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-2xl font-bold -mt-5" style={{ color: 'var(--accent)' }}>
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

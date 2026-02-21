'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import CountUp from './ui/CountUp'

const stats = [
  { value: 259, suffix: '+', label: 'Leads/week handled', sub: 'Without missing a single one' },
  { value: 3, suffix: 's', label: 'Avg response time', sub: 'Down from hours' },
  { value: 4, suffix: '', label: 'Staff redeployed', sub: 'From chat duty to closing' },
  { value: 0, suffix: '', label: 'Leads missed', sub: 'After go-live' },
]

export default function Results() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-6 border-y border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-4xl lg:text-5xl font-black font-mono text-cyan mb-2">
              {inView ? <CountUp end={stat.value} suffix={stat.suffix} /> : `0${stat.suffix}`}
            </p>
            <p className="text-primary font-semibold text-lg mb-1">{stat.label}</p>
            <p className="text-muted text-base">{stat.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

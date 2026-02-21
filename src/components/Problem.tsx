'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const pains = [
  {
    icon: '💸',
    title: 'Leads Are Slipping Through',
    body: 'You\'re spending real money on Meta ads. Those leads message you on WhatsApp — and wait. Hours pass. They go to a competitor who answered in seconds.',
  },
  {
    icon: '🔥',
    title: 'Hot Leads Buried in Cold Ones',
    body: 'Your team is manually scrolling through dozens of chats. They spend time on tire-kickers and miss the buyer who was ready to close today.',
  },
  {
    icon: '📊',
    title: 'No Visibility, No Pipeline',
    body: 'Your CRM is a graveyard. Nobody has time to update it. You have no idea how many leads came in, what stage they\'re at, or what\'s converting.',
  },
]

export default function Problem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan font-mono text-lg font-medium mb-3 uppercase tracking-widest">The Problem</p>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
            Meta Ads Bring the Leads.
            <br />
            <span className="text-muted">WhatsApp Loses Them.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="p-6 rounded-2xl border border-white/5 bg-surface hover:border-white/10 transition-colors"
            >
              <span className="text-4xl mb-4 block">{pain.icon}</span>
              <h3 className="text-2xl font-bold mb-3">{pain.title}</h3>
              <p className="text-muted text-lg leading-relaxed">{pain.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

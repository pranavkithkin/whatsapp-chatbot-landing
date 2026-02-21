'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const timeline = [
  {
    phase: 'Before',
    color: 'border-red-500/30 bg-red-500/5',
    labelColor: 'text-red-400',
    items: [
      '4 staff dedicated to answering WhatsApp chats manually',
      '259+ leads per week flooding in from Meta ads',
      'Hours-long response times losing hot buyers to competitors',
      'Hot leads buried under cold enquiries — no prioritization',
      'CRM updated sporadically, if at all — pipeline invisible',
    ],
  },
  {
    phase: 'After',
    color: 'border-cyan/30 bg-cyan/5',
    labelColor: 'text-cyan',
    items: [
      'AI handles every incoming lead — instantly, 24/7',
      'Every lead qualified in under 2 minutes automatically',
      '3-second average first response (down from 3+ hours)',
      'Hot leads flagged and routed to closers in real time',
      'CRM updated automatically — full pipeline visibility from day one',
    ],
  },
]

export default function CaseStudy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-cyan font-mono text-lg font-medium uppercase tracking-widest mb-3">Case Study</p>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
            From 4 Staff Drowning in Chats
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-cyan/50">
              to Zero Missed Leads.
            </span>
          </h2>
          <p className="text-muted text-xl max-w-2xl leading-relaxed">
            A UAE-based business setup company was running aggressive Meta ad campaigns —
            and it was working. Too well. 259 leads a week were hitting their WhatsApp.
            Four staff members could barely keep up. Hot buyers were going cold while the
            team worked through the queue. We fixed that in two weeks.
          </p>
        </motion.div>

        {/* The Breaking Point callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-6 rounded-2xl border border-gold/20 bg-gold/5 mb-12"
        >
          <p className="text-gold font-mono text-base font-medium uppercase tracking-widest mb-2">The Breaking Point</p>
          <p className="text-primary text-xl font-medium leading-relaxed">
            &ldquo;We knew we were losing deals. A lead would message us at 9pm, we&apos;d reply the next morning —
            and they&apos;d already signed with someone else. We couldn&apos;t hire our way out of this.&rdquo;
          </p>
        </motion.div>

        {/* Before / After grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {timeline.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              className={`p-6 rounded-2xl border ${phase.color}`}
            >
              <p className={`font-mono text-lg font-bold uppercase tracking-widest mb-4 ${phase.labelColor}`}>
                {phase.phase}
              </p>
              <ul className="space-y-3">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-lg text-muted leading-relaxed">
                    <span className={`mt-1 shrink-0 ${i === 0 ? 'text-red-400' : 'text-cyan'}`}>
                      {i === 0 ? '✗' : '✓'}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Key numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { n: '259', label: 'Leads/week — fully handled' },
            { n: '3s', label: 'Response time (was 3+ hrs)' },
            { n: '4', label: 'Staff freed from chat duty' },
            { n: '2wk', label: 'Time from signed to live' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-surface text-center">
              <p className="text-3xl font-black font-mono text-cyan mb-1">{item.n}</p>
              <p className="text-base text-muted">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

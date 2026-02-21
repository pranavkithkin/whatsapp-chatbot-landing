'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  onBookCall: () => void
}

export default function FinalCTA({ onBookCall }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan/8 blur-[150px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-5xl lg:text-6xl font-black tracking-tight mb-6">
          Stop Losing Leads.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-cyan/50">
            Start Closing Them.
          </span>
        </h2>
        <p className="text-muted text-lg mb-10 leading-relaxed">
          15 minutes. We&apos;ll show you exactly how the system works for your business.
          No commitment. No pitch deck. Just a real conversation.
        </p>
        <button
          onClick={onBookCall}
          className="inline-block px-10 py-5 rounded-full bg-cyan text-bg font-bold text-lg hover:bg-cyan-dark transition-all hover:scale-105 shadow-lg shadow-cyan/20"
        >
          Book Your Free 15-Min Call →
        </button>
        <p className="mt-6 text-muted text-sm">
          UAE-based • Founder-led delivery • Live in 2 weeks
        </p>
      </motion.div>
    </section>
  )
}

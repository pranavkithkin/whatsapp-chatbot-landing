'use client'
import { motion } from 'framer-motion'
import GradientMesh from './ui/GradientMesh'

const CALENDLY_URL = 'CALENDLY_PLACEHOLDER'

const floatingCards = [
  { label: '🔥 Hot Lead', sub: 'Aliya R. — Budget: AED 15K', color: 'border-gold/30 bg-gold/5', delay: 0 },
  { label: '⚡ Responded', sub: '3 seconds after enquiry', color: 'border-cyan/30 bg-cyan/5', delay: 0.3 },
  { label: '✅ Qualified', sub: 'Timeline: This month', color: 'border-green-400/30 bg-green-400/5', delay: 0.6 },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <GradientMesh />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-20">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/30 bg-cyan/5 text-cyan text-xs font-mono font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            AI-Powered • 24/7 • 2-Week Setup
          </div>

          <h1 className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-6">
            Your Meta Ads
            <br />
            Are Working.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-cyan/60">
              Your WhatsApp
              <br />
              Can&apos;t Keep Up.
            </span>
          </h1>

          <p className="text-lg text-muted leading-relaxed mb-8 max-w-lg">
            Every lead that messages you on WhatsApp deserves an instant reply.
            Our AI responds in seconds, qualifies automatically, and only pings
            your team when a lead is ready to close.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-cyan text-bg font-bold text-base hover:bg-cyan-dark transition-all hover:scale-105 text-center"
            >
              Book a Free 15-Min Call
            </a>
            <a
              href="#pipeline"
              className="px-8 py-4 rounded-full border border-white/10 text-primary font-medium text-base hover:border-white/20 transition-colors text-center"
            >
              See How It Works ↓
            </a>
          </div>
        </motion.div>

        {/* Right: floating cards */}
        <div className="relative h-[400px] hidden lg:block">
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: card.delay + 0.5, duration: 0.6 }}
              className={`absolute rounded-xl border p-4 backdrop-blur-sm ${card.color}`}
              style={{
                top: `${15 + i * 30}%`,
                right: `${i % 2 === 0 ? 0 : 60}px`,
                width: '220px',
              }}
            >
              <p className="font-semibold text-sm text-primary">{card.label}</p>
              <p className="text-xs text-muted mt-1">{card.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

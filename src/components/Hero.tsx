'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

const CALENDLY_URL = 'CALENDLY_PLACEHOLDER'
const SPLINE_SCENE = 'https://prod.spline.design/MLoQYMntqoS3loso/scene.splinecode'

const floatingCards = [
  {
    label: '🔥 Hot Lead',
    sub: 'Aliya R. — Budget: AED 15K',
    color: 'border-gold/40 bg-gold/5',
    delay: 0,
    top: '12%',
    right: '0px',
  },
  {
    label: '⚡ Responded in 3s',
    sub: 'While competitor took 4 hrs',
    color: 'border-cyan/40 bg-cyan/5',
    delay: 0.25,
    top: '42%',
    right: '70px',
  },
  {
    label: '✅ Qualified',
    sub: 'Budget ✓  Timeline ✓  Intent ✓',
    color: 'border-green-400/40 bg-green-400/5',
    delay: 0.5,
    top: '70%',
    right: '0px',
  },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      {/* ── Spline 3D background ─────────────────────────────────────────── */}
      {/* Scale up 1.6× — pushes the template's own nav/text off-screen      */}
      {/* pointer-events: none so it never blocks clicks                      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-30%',        /* extra room for the scaled canvas */
            transform: 'scale(1.6)',
            transformOrigin: 'center center',
          }}
        >
          <Spline scene={SPLINE_SCENE} style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Dark overlay so boxes stay subtle, not overpowering */}
        <div className="absolute inset-0 bg-bg/70" />

        {/* Left vignette — keeps copy readable */}
        <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-bg via-bg/80 to-transparent" />

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* ── Ambient cyan glow ─────────────────────────────────────────────── */}
      <div
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-cyan/10 blur-[130px] pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* ── Dot grid ─────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div
        className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-24 w-full"
        style={{ zIndex: 2 }}
      >
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/25 bg-cyan/5 text-cyan text-[11px] font-mono font-medium mb-7 tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            AI-Powered · 24 / 7 · 2-Week Setup
          </motion.div>

          {/* Headline */}
          <h1 className="font-black leading-[1.02] tracking-tight mb-6">
            <span className="block text-5xl lg:text-[62px] text-primary">
              Your Meta Ads
            </span>
            <span className="block text-5xl lg:text-[62px] text-primary">
              Are Working.
            </span>
            <span
              className="block text-5xl lg:text-[62px] mt-1"
              style={{
                backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #22D3EE 50%, #0891B2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Your WhatsApp
            </span>
            <span
              className="block text-5xl lg:text-[62px]"
              style={{
                backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #22D3EE 50%, #0891B2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Can&apos;t Keep Up.
            </span>
          </h1>

          {/* Body */}
          <p className="text-[17px] text-muted leading-[1.7] mb-9 max-w-[440px]">
            Every lead that messages you deserves an instant reply.
            Our AI responds in seconds, qualifies automatically,
            and only pings your team when a deal is ready to close.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full font-bold text-[15px] text-bg text-center transition-colors"
              style={{
                background: 'linear-gradient(135deg, #22D3EE, #0891B2)',
                boxShadow: '0 0 32px rgba(34,211,238,0.25)',
              }}
            >
              Book a Free 15-Min Call
            </motion.a>
            <a
              href="#pipeline"
              className="px-8 py-4 rounded-full border border-white/10 text-primary font-medium text-[15px] hover:border-cyan/30 hover:text-cyan transition-all text-center"
            >
              See How It Works ↓
            </a>
          </div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex items-center gap-5 flex-wrap"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs text-muted">Live in UAE</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <span className="text-xs text-muted">259+ leads / week automated</span>
            <div className="w-px h-3 bg-white/10" />
            <span className="text-xs text-muted">Go live in 2 weeks</span>
          </motion.div>
        </motion.div>

        {/* Right: floating lead cards */}
        <div className="relative h-[420px] hidden lg:block">
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                delay: card.delay + 0.6,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`absolute rounded-2xl border p-4 backdrop-blur-md ${card.color}`}
              style={{
                top: card.top,
                right: card.right,
                width: '230px',
                background: 'rgba(15,22,35,0.6)',
              }}
            >
              <p className="font-semibold text-sm text-primary mb-1">{card.label}</p>
              <p className="text-xs text-muted">{card.sub}</p>

              {/* Subtle glow dot */}
              <div
                className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
                style={{
                  background: i === 0 ? '#F0B429' : i === 1 ? '#22D3EE' : '#4ade80',
                  boxShadow: `0 0 8px 2px ${i === 0 ? '#F0B42960' : i === 1 ? '#22D3EE60' : '#4ade8060'}`,
                }}
              />
            </motion.div>
          ))}

          {/* Vertical connector line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute right-[108px] top-[15%] h-[60%] w-px origin-top"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(34,211,238,0.2), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  )
}

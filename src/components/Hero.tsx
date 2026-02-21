'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

const SPLINE_SCENE = 'https://prod.spline.design/MLoQYMntqoS3loso/scene.splinecode'

interface Props {
  onBookCall: () => void
}

export default function Hero({ onBookCall }: Props) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-cyan/8 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      {/* ── Spline: absolute, right half of viewport, full height ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute hidden lg:block pointer-events-none"
        style={{
          top: 0,
          right: 0,
          width: '56%',
          height: '100%',
          zIndex: 1,
        }}
      >
        {/*
          Spline canvas is rendered oversized (120% × 120%) and nudged up so:
          1. The 3D object fills and centers naturally within the right half
          2. The "Built with Spline" badge (always bottom-right of canvas)
             is pushed below the viewport and never visible
        */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '120%',
            height: '120%',
            pointerEvents: 'none',
          }}
        >
          <Spline
            scene={SPLINE_SCENE}
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          />
        </div>

        {/* Edge fades — blend seamlessly into bg */}
        <div className="absolute inset-y-0 left-0 w-56 pointer-events-none" style={{ background: 'linear-gradient(to right, #080C14 0%, transparent 100%)' }} />
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none" style={{ background: 'linear-gradient(to left, #080C14 0%, transparent 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #080C14 0%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #080C14 0%, transparent 100%)' }} />

        {/* Kill the "Built with Spline" badge — covers bottom-right corner of canvas */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: 0,
            right: 0,
            width: '220px',
            height: '60px',
            background: '#080C14',
          }}
        />
      </motion.div>

      {/* ── Left: copy — sits above Spline via z-10 ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-16 py-20 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[600px]"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/25 bg-cyan/5 text-cyan text-[13px] font-mono font-medium mb-7 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            AI-Powered · 24 / 7 · 2-Week Setup
          </div>

          {/* Headline */}
          <h1 className="font-black leading-[1.02] tracking-tight mb-6">
            <span className="block text-5xl lg:text-[64px] text-primary">Your Meta Ads</span>
            <span className="block text-5xl lg:text-[64px] text-primary">Are Working.</span>
            <span
              className="block text-5xl lg:text-[64px]"
              style={{
                backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Your WhatsApp
            </span>
            <span
              className="block text-5xl lg:text-[64px]"
              style={{
                backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Can&apos;t Keep Up.
            </span>
          </h1>

          {/* Body */}
          <p className="text-[19px] text-muted leading-[1.7] mb-9 max-w-[440px]">
            Every lead that messages you deserves an instant reply.
            Our AI responds in seconds, qualifies automatically,
            and only pings your team when a deal is ready to close.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              onClick={onBookCall}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full font-bold text-[16px] text-bg text-center"
              style={{
                background: 'linear-gradient(135deg, #22D3EE, #0891B2)',
                boxShadow: '0 0 32px rgba(34,211,238,0.25)',
              }}
            >
              Book a Free 15-Min Call
            </motion.button>
            <a
              href="#pipeline"
              className="px-8 py-4 rounded-full border border-white/10 text-primary font-medium text-[16px] hover:border-cyan/30 hover:text-cyan transition-all text-center"
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
              <span className="text-sm text-muted">Live in UAE</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <span className="text-sm text-muted">259+ leads / week automated</span>
            <div className="w-px h-3 bg-white/10" />
            <span className="text-sm text-muted">Go live in 2 weeks</span>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}

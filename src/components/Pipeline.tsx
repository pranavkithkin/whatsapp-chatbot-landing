'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhoneMockup from './ui/PhoneMockup'

gsap.registerPlugin(ScrollTrigger)

const pipelineSteps = [
  {
    step: '01',
    title: 'Lead Messages In',
    body: 'Someone clicks your Meta ad at 11pm and drops a message on WhatsApp. The enquiry is live.',
  },
  {
    step: '02',
    title: 'AI Replies in 3 Seconds',
    body: 'No delay. No "we\'ll get back to you." The AI opens the conversation instantly, in your brand voice.',
  },
  {
    step: '03',
    title: 'Natural Back-and-Forth',
    body: 'It asks the right questions — business type, setup preference, timeline — exactly how a good consultant would.',
  },
  {
    step: '04',
    title: 'Budget & Intent Confirmed',
    body: 'Budget range, urgency, specific needs — all captured naturally without the lead feeling interrogated.',
  },
  {
    step: '05',
    title: '🔥 Lead Scored Automatically',
    body: 'Ready to move fast with budget locked in? That\'s a hot lead. Your team gets notified immediately.',
  },
  {
    step: '06',
    title: 'CRM Updated. Closer Notified.',
    body: 'Full context logged — no manual entry. Your closer picks up the phone knowing exactly who they\'re calling.',
  },
]

export default function Pipeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  // Section height is calculated from window.innerHeight so scroll per step
  // is always proportional to the screen — consistent on every device.
  const [sectionHeight, setSectionHeight] = useState('600vh')

  useEffect(() => {
    // 60% of viewport per step — enough to feel intentional but not tedious
    const scrollPerStep = window.innerHeight * 0.6
    const totalScrollPx = pipelineSteps.length * scrollPerStep
    setSectionHeight(`calc(100vh + ${totalScrollPx}px)`)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalScrollPx}`,
        pin: stickyRef.current,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const step = Math.min(
            Math.floor(self.progress * pipelineSteps.length),
            pipelineSteps.length - 1
          )
          setActiveStep(step)
        },
      })
    }, containerRef)

    // Force recalculation after fonts/images load and layout settles
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="pipeline"
      ref={containerRef}
      style={{ height: sectionHeight }}
    >
      <div
        ref={stickyRef}
        className="h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan/5 blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center w-full">
          {/* Left: steps */}
          <div className="space-y-5">
            <div className="mb-8">
              <p className="text-cyan font-mono text-sm font-medium uppercase tracking-widest mb-3">How It Works</p>
              <h2 className="text-4xl font-black tracking-tight">The WhatsApp Pipeline</h2>
            </div>
            {pipelineSteps.map((s, i) => (
              <div
                key={i}
                className={`flex gap-4 transition-all duration-500 ${
                  i === activeStep ? 'opacity-100' : i < activeStep ? 'opacity-35' : 'opacity-15'
                }`}
              >
                <span className={`font-mono text-sm font-bold w-8 shrink-0 mt-0.5 ${
                  i === activeStep ? 'text-cyan' : 'text-muted'
                }`}>{s.step}</span>
                <div>
                  <h3 className={`font-bold text-sm mb-1 ${i === activeStep ? 'text-primary' : 'text-muted'}`}>
                    {s.title}
                  </h3>
                  {i === activeStep && (
                    <p className="text-muted text-xs leading-relaxed">{s.body}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: 3D phone */}
          <div className="flex justify-center items-center">
            <div
              style={{
                perspective: '1000px',
                transform: `rotateY(${-5 + activeStep * 1.5}deg) rotateX(2deg)`,
                transition: 'transform 0.7s ease',
              }}
            >
              <PhoneMockup step={activeStep} />
            </div>
          </div>
        </div>

        {/* Step progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {pipelineSteps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i <= activeStep ? 'bg-cyan w-8' : 'bg-white/10 w-4'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

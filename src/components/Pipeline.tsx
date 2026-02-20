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
    body: 'Someone clicks your Meta ad and messages your WhatsApp. It could be 2pm or 2am.',
  },
  {
    step: '02',
    title: 'AI Responds in 3 Seconds',
    body: 'Our AI picks up instantly — natural conversation, your brand voice, 24/7.',
  },
  {
    step: '03',
    title: 'AI Qualifies the Lead',
    body: 'Asks the right questions: budget, timeline, intent. No human needed.',
  },
  {
    step: '04',
    title: '🔥 Lead Gets Scored',
    body: 'Hot, Warm, or Cold. Your team only sees the ones worth their time.',
  },
  {
    step: '05',
    title: 'CRM Updated. Team Alerted.',
    body: 'Full context logged automatically. Your closer gets a ping with everything they need.',
  },
]

export default function Pipeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${pipelineSteps.length * 300}`,
        pin: stickyRef.current,
        scrub: 1,
        onUpdate: (self) => {
          const step = Math.min(
            Math.floor(self.progress * pipelineSteps.length),
            pipelineSteps.length - 1
          )
          setActiveStep(step)
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="pipeline" ref={containerRef} style={{ height: `${pipelineSteps.length * 300 + 100}vh` }}>
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
          <div className="space-y-6">
            <div className="mb-10">
              <p className="text-cyan font-mono text-sm font-medium uppercase tracking-widest mb-3">How It Works</p>
              <h2 className="text-4xl font-black tracking-tight">The WhatsApp Pipeline</h2>
            </div>
            {pipelineSteps.map((s, i) => (
              <div
                key={i}
                className={`flex gap-4 transition-all duration-500 ${
                  i === activeStep ? 'opacity-100' : i < activeStep ? 'opacity-40' : 'opacity-20'
                }`}
              >
                <span className={`font-mono text-sm font-bold w-8 shrink-0 mt-1 ${
                  i === activeStep ? 'text-cyan' : 'text-muted'
                }`}>{s.step}</span>
                <div>
                  <h3 className={`font-bold text-base mb-1 ${i === activeStep ? 'text-primary' : 'text-muted'}`}>
                    {s.title}
                  </h3>
                  {i === activeStep && (
                    <p className="text-muted text-sm leading-relaxed">{s.body}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: 3D phone with perspective */}
          <div className="flex justify-center items-center">
            <div
              style={{
                perspective: '1000px',
                transform: `rotateY(${-5 + activeStep * 2}deg) rotateX(2deg)`,
                transition: 'transform 0.8s ease',
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

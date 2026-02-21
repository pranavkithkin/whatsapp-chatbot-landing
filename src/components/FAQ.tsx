'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'How is this different from a regular chatbot?',
    a: 'A chatbot follows a script. Our system uses AI to hold natural conversations, adapt to what the lead says, qualify them based on your criteria, and make scoring decisions — all without any manual configuration per conversation.',
  },
  {
    q: 'Will it sound robotic to my leads?',
    a: "No. We train it on your business, your tone, and your typical conversation flow. Leads regularly don't realize they're talking to AI — and it doesn't matter if they do, because they get an instant, helpful response.",
  },
  {
    q: 'What CRM does it integrate with?',
    a: "We support HubSpot, Salesforce, Zoho, and most popular CRMs via API. If you're using a custom system, we'll discuss it on the call.",
  },
  {
    q: 'How long does setup actually take?',
    a: 'Two weeks from signed proposal to live system. Week 1: setup, integration, AI training. Week 2: testing, refinement, go-live. We handle everything.',
  },
  {
    q: "What happens if a lead asks something the AI can't handle?",
    a: "The AI recognizes when it's out of depth and hands off gracefully — either flagging a human to take over or collecting the lead's details for a callback. Nothing gets dropped.",
  },
  {
    q: 'Do I need technical knowledge to run this?',
    a: "Zero. We set it up, we maintain it, we improve it. You get a dashboard to see your lead pipeline. That's it.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-cyan font-mono text-lg font-medium uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl font-black tracking-tight">Common Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-surface overflow-hidden">
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-lg text-primary">{faq.q}</span>
                <span className={`text-cyan shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-muted text-lg leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

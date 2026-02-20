'use client'
import ChatMessage from './ChatMessage'

interface PhoneMockupProps {
  step: number
}

const steps = [
  // Step 0: Lead messages in
  [
    { text: 'Hi, I saw your ad. Interested in company formation.', sender: 'lead' as const },
  ],
  // Step 1: AI responds instantly
  [
    { text: 'Hi, I saw your ad. Interested in company formation.', sender: 'lead' as const },
    { text: 'Hello! Thanks for reaching out 👋 I\'m here to help. What type of business are you looking to set up?', sender: 'ai' as const },
  ],
  // Step 2: AI qualifies
  [
    { text: 'Hi, I saw your ad. Interested in company formation.', sender: 'lead' as const },
    { text: 'Hello! Thanks for reaching out 👋 I\'m here to help. What type of business are you looking to set up?', sender: 'ai' as const },
    { text: 'A consultancy. Mainland.', sender: 'lead' as const },
    { text: 'Perfect. What\'s your budget range and when are you looking to get started?', sender: 'ai' as const },
    { text: 'Around 15K AED. Want to start this month.', sender: 'lead' as const },
  ],
  // Step 3: Hot lead badge
  [
    { text: 'Hi, I saw your ad. Interested in company formation.', sender: 'lead' as const },
    { text: 'Hello! Thanks for reaching out 👋 I\'m here to help. What type of business are you looking to set up?', sender: 'ai' as const },
    { text: 'A consultancy. Mainland.', sender: 'lead' as const },
    { text: 'Perfect. What\'s your budget range and when are you looking to start?', sender: 'ai' as const },
    { text: 'Around 15K AED. Want to start this month.', sender: 'lead' as const },
    { text: 'Great! I\'ve noted your details. Our team will reach out shortly with a customized proposal 🚀', sender: 'ai' as const },
  ],
  // Step 4: CRM + alert
  [
    { text: 'Hi, I saw your ad. Interested in company formation.', sender: 'lead' as const },
    { text: 'Hello! Thanks for reaching out 👋 I\'m here to help. What type of business are you looking to set up?', sender: 'ai' as const },
    { text: 'A consultancy. Mainland.', sender: 'lead' as const },
    { text: 'Perfect. What\'s your budget range and when are you looking to start?', sender: 'ai' as const },
    { text: 'Around 15K AED. Want to start this month.', sender: 'lead' as const },
    { text: 'Great! I\'ve noted your details. Our team will reach out shortly with a customized proposal 🚀', sender: 'ai' as const },
  ],
]

export default function PhoneMockup({ step }: PhoneMockupProps) {
  const messages = steps[Math.min(step, steps.length - 1)]

  return (
    <div className="relative w-[280px] h-[560px]">
      {/* Phone shell */}
      <div className="absolute inset-0 rounded-[44px] border-[6px] border-[#1a1a2e] bg-[#0d1117] shadow-2xl shadow-black/60" />

      {/* Notch */}
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[90px] h-[22px] rounded-full bg-[#1a1a2e] z-10" />

      {/* Screen */}
      <div className="absolute inset-[6px] rounded-[38px] overflow-hidden bg-[#111b11]">
        {/* WhatsApp header */}
        <div className="bg-[#1f2c34] px-4 pt-10 pb-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan/30 flex items-center justify-center text-xs">AI</div>
          <div>
            <p className="text-white text-xs font-semibold">SynOps AI</p>
            <p className="text-[#8696a0] text-[10px]">online</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="p-3 flex flex-col justify-end h-[calc(100%-72px)] overflow-hidden">
          {messages.map((msg, i) => (
            <ChatMessage
              key={i}
              text={msg.text}
              sender={msg.sender}
              visible={true}
            />
          ))}
        </div>
      </div>

      {/* Hot lead badge overlay */}
      {step >= 3 && (
        <div className="absolute -top-4 -right-8 px-3 py-1.5 rounded-full bg-gold text-bg text-[11px] font-bold shadow-lg shadow-gold/30 animate-bounce">
          🔥 HOT LEAD
        </div>
      )}

      {/* CRM notification overlay */}
      {step >= 4 && (
        <div className="absolute -bottom-6 -left-10 w-[180px] p-2.5 rounded-xl border border-cyan/30 bg-surface/90 backdrop-blur-sm">
          <p className="text-[9px] text-cyan font-mono font-medium mb-1">CRM UPDATED</p>
          <p className="text-[10px] text-primary font-semibold">Lead logged + team alerted</p>
        </div>
      )}
    </div>
  )
}

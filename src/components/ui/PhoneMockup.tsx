'use client'
import ChatMessage from './ChatMessage'

interface PhoneMockupProps {
  step: number
}

// Each step = cumulative conversation up to that point
const steps = [
  // Step 0 — lead messages in
  [
    { text: "Hey! Saw your ad on Instagram. Looking to set up a business in Dubai 🇦🇪", sender: 'lead' as const },
  ],

  // Step 1 — AI replies instantly, warm + conversational
  [
    { text: "Hey! Saw your ad on Instagram. Looking to set up a business in Dubai 🇦🇪", sender: 'lead' as const },
    { text: "Hey, welcome! 😊 Great timing — Dubai's honestly one of the best moves right now. Are you thinking mainland or freezone? Both have their upsides depending on what you're building", sender: 'ai' as const },
  ],

  // Step 2 — back and forth, natural
  [
    { text: "Hey! Saw your ad on Instagram. Looking to set up a business in Dubai 🇦🇪", sender: 'lead' as const },
    { text: "Hey, welcome! 😊 Great timing — Dubai's honestly one of the best moves right now. Are you thinking mainland or freezone? Both have their upsides depending on what you're building", sender: 'ai' as const },
    { text: "Probably mainland? I'm starting a marketing agency", sender: 'lead' as const },
    { text: "Marketing on mainland — good call, means you can work directly with UAE clients without restrictions. Do you need an actual office space or would a flexi-desk do the job for now?", sender: 'ai' as const },
    { text: "Flexi-desk is fine to start", sender: 'lead' as const },
  ],

  // Step 3 — budget scoping, human tone
  [
    { text: "Hey! Saw your ad on Instagram. Looking to set up a business in Dubai 🇦🇪", sender: 'lead' as const },
    { text: "Hey, welcome! 😊 Great timing — Dubai's honestly one of the best moves right now. Are you thinking mainland or freezone? Both have their upsides depending on what you're building", sender: 'ai' as const },
    { text: "Probably mainland? I'm starting a marketing agency", sender: 'lead' as const },
    { text: "Marketing on mainland — good call, means you can work directly with UAE clients without restrictions. Do you need an actual office space or would a flexi-desk do the job for now?", sender: 'ai' as const },
    { text: "Flexi-desk is fine to start", sender: 'lead' as const },
    { text: "For a mainland marketing license + flexi-desk you're roughly looking at AED 12–18K depending on approvals. What's your budget range?", sender: 'ai' as const },
    { text: "Around 15K, maybe a bit more if needed", sender: 'lead' as const },
    { text: "That fits comfortably. And when are you hoping to be operational — any rush or flexible?", sender: 'ai' as const },
    { text: "This month ideally, I've got a client waiting on me", sender: 'lead' as const },
  ],

  // Step 4 — lead scored hot 🔥
  [
    { text: "Hey! Saw your ad on Instagram. Looking to set up a business in Dubai 🇦🇪", sender: 'lead' as const },
    { text: "Hey, welcome! 😊 Great timing — Dubai's honestly one of the best moves right now. Are you thinking mainland or freezone? Both have their upsides depending on what you're building", sender: 'ai' as const },
    { text: "Probably mainland? I'm starting a marketing agency", sender: 'lead' as const },
    { text: "Marketing on mainland — good call, means you can work directly with UAE clients without restrictions. Do you need an actual office space or would a flexi-desk do the job for now?", sender: 'ai' as const },
    { text: "Flexi-desk is fine to start", sender: 'lead' as const },
    { text: "For a mainland marketing license + flexi-desk you're roughly looking at AED 12–18K depending on approvals. What's your budget range?", sender: 'ai' as const },
    { text: "Around 15K, maybe a bit more if needed", sender: 'lead' as const },
    { text: "That fits comfortably. And when are you hoping to be operational — any rush or flexible?", sender: 'ai' as const },
    { text: "This month ideally, I've got a client waiting on me", sender: 'lead' as const },
    { text: "Okay you've got the budget, the timeline, and a clear goal — I'm flagging you as priority for our team 🔥 They'll reach out today with a custom breakdown just for your setup", sender: 'ai' as const },
  ],

  // Step 5 — CRM updated, same convo
  [
    { text: "Hey! Saw your ad on Instagram. Looking to set up a business in Dubai 🇦🇪", sender: 'lead' as const },
    { text: "Hey, welcome! 😊 Great timing — Dubai's honestly one of the best moves right now. Are you thinking mainland or freezone? Both have their upsides depending on what you're building", sender: 'ai' as const },
    { text: "Probably mainland? I'm starting a marketing agency", sender: 'lead' as const },
    { text: "Marketing on mainland — good call, means you can work directly with UAE clients without restrictions. Do you need an actual office space or would a flexi-desk do the job for now?", sender: 'ai' as const },
    { text: "Flexi-desk is fine to start", sender: 'lead' as const },
    { text: "For a mainland marketing license + flexi-desk you're roughly looking at AED 12–18K depending on approvals. What's your budget range?", sender: 'ai' as const },
    { text: "Around 15K, maybe a bit more if needed", sender: 'lead' as const },
    { text: "That fits comfortably. And when are you hoping to be operational — any rush or flexible?", sender: 'ai' as const },
    { text: "This month ideally, I've got a client waiting on me", sender: 'lead' as const },
    { text: "Okay you've got the budget, the timeline, and a clear goal — I'm flagging you as priority for our team 🔥 They'll reach out today with a custom breakdown just for your setup", sender: 'ai' as const },
  ],
]

export default function PhoneMockup({ step }: PhoneMockupProps) {
  const messages = steps[Math.min(step, steps.length - 1)]

  return (
    <div className="relative w-[340px] h-[680px]">
      {/* Phone shell */}
      <div className="absolute inset-0 rounded-[52px] border-[7px] border-[#1a1a2e] bg-[#0d1117] shadow-2xl shadow-black/60" style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)' }} />

      {/* Notch */}
      <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[100px] h-[26px] rounded-full bg-[#1a1a2e] z-10" />

      {/* Screen */}
      <div className="absolute inset-[7px] rounded-[46px] overflow-hidden bg-[#0b1410]">
        {/* WhatsApp header */}
        <div className="bg-[#1f2c34] px-5 pt-12 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan/60 to-cyan/20 flex items-center justify-center text-xs font-bold text-bg">
            AI
          </div>
          <div>
            <p className="text-white text-sm font-semibold">SynOps Assistant</p>
            <p className="text-[#8696a0] text-[11px]">🟢 online</p>
          </div>
          <p className="ml-auto text-[#8696a0] text-[10px]">now</p>
        </div>

        {/* Chat area */}
        <div className="p-4 flex flex-col justify-end h-[calc(100%-84px)] overflow-hidden gap-1">
          {messages.map((msg, i) => (
            <ChatMessage
              key={`${step}-${i}`}
              text={msg.text}
              sender={msg.sender}
              visible={true}
            />
          ))}
        </div>
      </div>

      {/* Hot lead badge */}
      {step >= 4 && (
        <div className="absolute -top-5 -right-10 px-4 py-2 rounded-full bg-gold text-bg text-xs font-bold shadow-lg shadow-gold/30 animate-bounce">
          🔥 HOT LEAD
        </div>
      )}

      {/* CRM notification */}
      {step >= 5 && (
        <div className="absolute -bottom-8 -left-14 w-[220px] p-4 rounded-xl border border-cyan/30 bg-[#0F1623]/95 backdrop-blur-sm shadow-xl">
          <p className="text-[10px] text-cyan font-mono font-medium mb-1 uppercase tracking-wider">CRM Updated</p>
          <p className="text-xs text-primary font-semibold leading-snug">Lead logged · Closer notified · Pipeline live</p>
        </div>
      )}
    </div>
  )
}

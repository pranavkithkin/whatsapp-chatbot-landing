interface ChatMessageProps {
  text: string
  sender: 'lead' | 'ai'
  visible: boolean
}

export default function ChatMessage({ text, sender, visible }: ChatMessageProps) {
  return (
    <div className={`flex ${sender === 'ai' ? 'justify-start' : 'justify-end'} mb-2 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed ${
        sender === 'ai'
          ? 'bg-[#1a2a1a] text-[#e0ffe0] rounded-tl-sm'
          : 'bg-[#005c4b] text-white rounded-tr-sm'
      }`}>
        {text}
      </div>
    </div>
  )
}

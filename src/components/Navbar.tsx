'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const CALENDLY_URL = 'CALENDLY_PLACEHOLDER'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="SynOps Labs"
          width={140}
          height={40}
          className="h-9 w-auto object-contain"
          priority
        />
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-cyan text-bg font-semibold text-base hover:bg-cyan-dark transition-colors"
        >
          Book a Call
        </a>
      </div>
    </nav>
  )
}

'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Pipeline from '@/components/Pipeline'
import Results from '@/components/Results'
import CaseStudy from '@/components/CaseStudy'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main>
      <Navbar onBookCall={() => setModalOpen(true)} />
      <Hero onBookCall={() => setModalOpen(true)} />
      <Problem />
      <Pipeline />
      <Results />
      <CaseStudy />
      <FAQ />
      <FinalCTA onBookCall={() => setModalOpen(true)} />
      <Footer />
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Pipeline from '@/components/Pipeline'
import Results from '@/components/Results'
import CaseStudy from '@/components/CaseStudy'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Pipeline />
      <Results />
      <CaseStudy />
      <FAQ />
    </main>
  )
}

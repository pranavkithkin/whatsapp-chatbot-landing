import type { Metadata } from 'next'
import './globals.css'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  title: 'WhatsApp AI Lead Automation | SynOps Labs',
  description: 'Stop losing Meta ad leads on WhatsApp. Our AI qualifies, scores, and routes every lead — 24/7. 2-week setup.',
  openGraph: {
    title: 'WhatsApp AI Lead Automation | SynOps Labs',
    description: 'Stop losing Meta ad leads on WhatsApp.',
    url: 'https://whatsappchatbot.synopslabs.com',
    siteName: 'SynOps Labs',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-primary antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createCalendarEvent } from '@/lib/googleCalendar'
import { buildConfirmationEmail } from '@/lib/emailTemplate'

interface BookRequest {
  name: string
  email: string
  phone: string
  company: string
  slot: string
}

export async function POST(req: NextRequest) {
  let body: BookRequest
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { name, email, phone, company, slot } = body

  if (!name || !email || !phone || !company || !slot) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  // Mock mode when Google credentials are absent (dev/testing)
  const isMock = !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN

  let meetLink = 'https://meet.google.com/mock-dev-link'
  let eventId = 'mock-event-id'

  if (!isMock) {
    try {
      const result = await createCalendarEvent({ name, email, phone, company, slot })
      meetLink = result.meetLink
      eventId = result.eventId
    } catch (err) {
      console.error('[/api/book] Calendar error:', err)
      return NextResponse.json({ error: 'Failed to create calendar event.' }, { status: 500 })
    }
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const html = buildConfirmationEmail({ name, email, company, slot, meetLink })
      await resend.emails.send({
        from: 'SynopsLabs Sales <sales@synopslabs.com>',
        to: [email],
        subject: 'Your call is confirmed — SynopsLabs',
        html,
      })
    } catch (err) {
      // Don't fail the booking if email delivery fails — event is already created
      console.error('[/api/book] Email error:', err)
    }
  }

  return NextResponse.json({ success: true, meetLink, eventId })
}

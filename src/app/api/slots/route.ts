import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/googleCalendar'

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Missing or invalid date. Expected YYYY-MM-DD.' }, { status: 400 })
  }

  // If Google credentials are not configured, return mock slots for development
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
    const mockSlots = generateMockSlots(date)
    return NextResponse.json({ slots: mockSlots })
  }

  try {
    const slots = await getAvailableSlots(date)
    return NextResponse.json({ slots })
  } catch (err) {
    console.error('[/api/slots] Error fetching slots:', err)
    return NextResponse.json({ error: 'Failed to fetch available slots.' }, { status: 500 })
  }
}

function generateMockSlots(date: string): string[] {
  const IST = '+05:30'
  const slots: string[] = []
  for (let h = 9; h < 18; h++) {
    for (const m of [0, 30]) {
      const hh = String(h).padStart(2, '0')
      const mm = String(m).padStart(2, '0')
      slots.push(`${date}T${hh}:${mm}:00${IST}`)
    }
  }
  // Remove a few slots to simulate real busy calendar
  return slots.filter((_, i) => i !== 2 && i !== 5 && i !== 11)
}

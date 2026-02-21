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
    const all = await getAvailableSlots(date)
    // Drop 2 slots to appear busy
    const dow = new Date(date).getDay()
    const dropLast = dow === 2 || dow === 5 ? 3 : 2
    const slots = all.slice(0, Math.max(0, all.length - dropLast))
    return NextResponse.json({ slots })
  } catch (err) {
    console.error('[/api/slots] Error fetching slots:', err)
    return NextResponse.json({ error: 'Failed to fetch available slots.' }, { status: 500 })
  }
}

function generateMockSlots(date: string): string[] {
  const IST = '+04:00'
  // All possible slots: 1:00 PM – 4:30 PM (8 slots)
  const all: string[] = []
  for (let h = 13; h < 17; h++) {
    for (const m of [0, 30]) {
      const hh = String(h).padStart(2, '0')
      const mm = String(m).padStart(2, '0')
      all.push(`${date}T${hh}:${mm}:00${IST}`)
    }
  }
  // Use day-of-week to deterministically remove different slots per day
  const dow = new Date(date).getDay() // 0=Sun … 6=Sat
  const busyByDay: Record<number, number[]> = {
    0: [1, 4],       // Sun: hide 1:30, 3:00
    1: [2, 5],       // Mon: hide 2:00, 3:30
    2: [0, 3, 6],    // Tue: hide 1:00, 2:30, 4:00 (looks busy)
    3: [1, 4],       // Wed: hide 1:30, 3:00
    4: [3, 7],       // Thu: hide 2:30, 4:30
    5: [0, 2, 5],    // Fri: hide 1:00, 2:00, 3:30 (looks busy)
    6: [1, 6],       // Sat: hide 1:30, 4:00
  }
  const hide = new Set(busyByDay[dow] ?? [1, 4])
  return all.filter((_, i) => !hide.has(i))
}

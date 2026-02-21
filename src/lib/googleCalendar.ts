import { google } from 'googleapis'

const IST_OFFSET = '+04:00' // Gulf Standard Time (Dubai)
const WORK_START_HOUR = 13 // 1:00 PM GST
const WORK_END_HOUR = 17   // 5:00 PM GST (last slot starts at 4:30)
const SLOT_DURATION_MIN = 30

function getOAuth2Client() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  )
  client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })
  return client
}

/**
 * Returns available 30-minute slot start times for a given date (YYYY-MM-DD).
 * Slots are in ISO 8601 format with IST offset.
 */
export async function getAvailableSlots(date: string): Promise<string[]> {
  const auth = getOAuth2Client()
  const calendar = google.calendar({ version: 'v3', auth })

  // Build day boundaries in IST
  const dayStart = new Date(`${date}T${String(WORK_START_HOUR).padStart(2, '0')}:00:00${IST_OFFSET}`)
  const dayEnd = new Date(`${date}T${String(WORK_END_HOUR).padStart(2, '0')}:00:00${IST_OFFSET}`)

  const freeBusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      items: [{ id: process.env.GOOGLE_CALENDAR_ID! }],
    },
  })

  const busyRanges = freeBusy.data.calendars?.[process.env.GOOGLE_CALENDAR_ID!]?.busy ?? []

  // Generate all 30-min slots for the day
  const allSlots: Date[] = []
  const cursor = new Date(dayStart)
  while (cursor < dayEnd) {
    allSlots.push(new Date(cursor))
    cursor.setMinutes(cursor.getMinutes() + SLOT_DURATION_MIN)
  }

  // Filter out busy slots
  const available = allSlots.filter((slot) => {
    const slotEnd = new Date(slot.getTime() + SLOT_DURATION_MIN * 60_000)
    return !busyRanges.some((busy) => {
      const busyStart = new Date(busy.start!)
      const busyEnd = new Date(busy.end!)
      return slot < busyEnd && slotEnd > busyStart
    })
  })

  // Format as GST (Dubai UTC+4) ISO strings
  return available.map((slot) => {
    const gstDate = new Date(slot.getTime() + 4 * 60 * 60_000)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${gstDate.getUTCFullYear()}-${pad(gstDate.getUTCMonth() + 1)}-${pad(gstDate.getUTCDate())}T${pad(gstDate.getUTCHours())}:${pad(gstDate.getUTCMinutes())}:00${IST_OFFSET}`
  })
}

export interface BookingParams {
  name: string
  email: string
  phone: string
  company: string
  slot: string // ISO datetime with IST offset
}

export interface BookingResult {
  eventId: string
  meetLink: string
  startTime: string
  endTime: string
}

/**
 * Creates a Google Calendar event with a Google Meet link.
 * Returns the event ID and Meet link.
 */
export async function createCalendarEvent(params: BookingParams): Promise<BookingResult> {
  const auth = getOAuth2Client()
  const calendar = google.calendar({ version: 'v3', auth })

  const start = new Date(params.slot)
  const end = new Date(start.getTime() + SLOT_DURATION_MIN * 60_000)

  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID!,
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody: {
      summary: `Discovery Call — ${params.name} (${params.company})`,
      description: 'Booked via SynopsLabs website',
      start: { dateTime: params.slot, timeZone: 'Asia/Dubai' },
      end: { dateTime: end.toISOString(), timeZone: 'Asia/Dubai' },
      attendees: [
        { email: params.email, displayName: params.name },
        { email: 'sales@synopslabs.com', displayName: 'SynopsLabs Sales' },
      ],
      conferenceData: {
        createRequest: {
          requestId: `synops-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    },
  })

  const meetLink =
    event.data.conferenceData?.entryPoints?.find((ep) => ep.entryPointType === 'video')?.uri ?? ''

  return {
    eventId: event.data.id!,
    meetLink,
    startTime: params.slot,
    endTime: end.toISOString(),
  }
}

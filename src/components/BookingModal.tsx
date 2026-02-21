'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, parseISO, addDays, startOfToday } from 'date-fns'
import Modal from '@/components/ui/Modal'

interface Props {
  open: boolean
  onClose: () => void
}

interface FormData {
  name: string
  phone: string
  email: string
  company: string
}

type Step = 'form' | 'slots' | 'success'

const DAYS_AHEAD = 7

export default function BookingModal({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>('form')
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', email: '', company: '' })
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [slots, setSlots] = useState<string[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [meetLink, setMeetLink] = useState('')
  const [bookedSlot, setBookedSlot] = useState('')

  const handleClose = useCallback(() => {
    onClose()
    // Reset after exit animation
    setTimeout(() => {
      setStep('form')
      setFormData({ name: '', phone: '', email: '', company: '' })
      setFormErrors({})
      setSelectedDate(null)
      setSelectedSlot(null)
      setSlots([])
      setSlotsError(null)
      setBookingError(null)
    }, 300)
  }, [onClose])

  // --- Step 1: Form ---
  function validateForm(): boolean {
    const errors: Partial<FormData> = {}
    if (!formData.name.trim()) errors.name = 'Required'
    if (!formData.phone.trim()) errors.phone = 'Required'
    if (!formData.email.trim()) errors.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email'
    if (!formData.company.trim()) errors.company = 'Required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  function handleFormContinue() {
    if (validateForm()) setStep('slots')
  }

  // --- Step 2: Slots ---
  const today = startOfToday()
  const dates = Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(today, i + 1))

  async function handleDateSelect(date: Date) {
    setSelectedDate(date)
    setSelectedSlot(null)
    setSlots([])
    setSlotsError(null)
    setSlotsLoading(true)
    try {
      const dateStr = format(date, 'yyyy-MM-dd')
      const res = await fetch(`/api/slots?date=${dateStr}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to load slots')
      setSlots(json.slots)
    } catch (err) {
      setSlotsError(err instanceof Error ? err.message : 'Could not load slots')
    } finally {
      setSlotsLoading(false)
    }
  }

  async function handleBook() {
    if (!selectedSlot) return
    setBookingLoading(true)
    setBookingError(null)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slot: selectedSlot }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Booking failed')
      setMeetLink(json.meetLink)
      setBookedSlot(selectedSlot)
      setStep('success')
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setBookingLoading(false)
    }
  }

  // --- ICS download ---
  function downloadICS() {
    const start = parseISO(bookedSlot)
    const end = new Date(start.getTime() + 30 * 60_000)
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:Discovery Call — SynopsLabs`,
      `DESCRIPTION:Google Meet: ${meetLink}`,
      `URL:${meetLink}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'synopslabs-call.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="bg-[#0D1117] border border-white/8 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
        {/* Top accent */}
        <div className="h-[2px] bg-gradient-to-r from-cyan-400 to-cyan-600" />

        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[11px] font-mono font-semibold tracking-widest uppercase text-cyan-400 mb-2">
                    Book a Call
                  </p>
                  <h2 className="text-2xl font-black text-white leading-tight">Let's talk.</h2>
                  <p className="text-sm text-slate-400 mt-1">Fill in your details to book a call.</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-slate-500 hover:text-slate-300 transition-colors text-xl leading-none mt-0.5"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Fields */}
              <div className="space-y-4">
                {(
                  [
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                    { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
                    { key: 'email', label: 'Work Email', type: 'email', placeholder: 'john@acme.com' },
                    { key: 'company', label: 'Company', type: 'text', placeholder: 'Acme Corp' },
                  ] as const
                ).map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={formData[key]}
                      placeholder={placeholder}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, [key]: e.target.value }))
                        if (formErrors[key]) setFormErrors((p) => ({ ...p, [key]: undefined }))
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-[#0A0F17] border text-sm text-white placeholder-slate-600 outline-none focus:ring-1 transition-all ${
                        formErrors[key]
                          ? 'border-red-500/60 focus:ring-red-500/40'
                          : 'border-white/8 focus:border-cyan-400/50 focus:ring-cyan-400/20'
                      }`}
                    />
                    {formErrors[key] && (
                      <p className="mt-1 text-xs text-red-400">{formErrors[key]}</p>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleFormContinue}
                className="mt-6 w-full py-3.5 rounded-xl font-bold text-sm text-[#080C14] transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #22D3EE, #0891B2)', boxShadow: '0 0 24px rgba(34,211,238,0.2)' }}
              >
                Continue →
              </button>
            </motion.div>
          )}

          {step === 'slots' && (
            <motion.div
              key="slots"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.22 }}
              className="p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <button
                    onClick={() => setStep('form')}
                    className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 mb-2 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    ← Back
                  </button>
                  <h2 className="text-2xl font-black text-white leading-tight">Pick a time.</h2>
                  <p className="text-sm text-slate-400 mt-1">Select a date, then choose a slot.</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-slate-500 hover:text-slate-300 transition-colors text-xl leading-none mt-5"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Date strip */}
              <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
                {dates.map((date) => {
                  const isSelected = selectedDate?.toDateString() === date.toDateString()
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      className={`flex-shrink-0 flex flex-col items-center px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                          : 'border-white/8 bg-[#0A0F17] text-slate-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span className="font-semibold">{format(date, 'EEE')}</span>
                      <span className="text-[11px] mt-0.5 opacity-70">{format(date, 'MMM d')}</span>
                    </button>
                  )
                })}
              </div>

              {/* Time slots */}
              <div className="min-h-[120px]">
                {!selectedDate && (
                  <p className="text-sm text-slate-500 text-center py-8">Select a date above</p>
                )}
                {selectedDate && slotsLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                  </div>
                )}
                {selectedDate && slotsError && (
                  <p className="text-sm text-red-400 text-center py-8">{slotsError}</p>
                )}
                {selectedDate && !slotsLoading && !slotsError && slots.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-8">No slots available — try another date</p>
                )}
                {selectedDate && !slotsLoading && !slotsError && slots.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((slot) => {
                      const time = format(parseISO(slot), 'h:mm a')
                      const isSelected = selectedSlot === slot
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                            isSelected
                              ? 'border-cyan-400 bg-cyan-400/15 text-cyan-400'
                              : 'border-white/8 bg-[#0A0F17] text-slate-400 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {bookingError && (
                <p className="mt-4 text-sm text-red-400 text-center">{bookingError}</p>
              )}

              <button
                onClick={handleBook}
                disabled={!selectedSlot || bookingLoading}
                className="mt-6 w-full py-3.5 rounded-xl font-bold text-sm text-[#080C14] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #22D3EE, #0891B2)', boxShadow: selectedSlot ? '0 0 24px rgba(34,211,238,0.2)' : 'none' }}
              >
                {bookingLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#080C14]/40 border-t-[#080C14] rounded-full animate-spin" />
                    Booking…
                  </>
                ) : (
                  'Book My Call'
                )}
              </button>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 text-center"
            >
              {/* Checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                className="w-14 h-14 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto mb-5"
              >
                <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <h2 className="text-2xl font-black text-white mb-2">You're booked.</h2>
              <p className="text-sm text-slate-400 mb-6">
                A confirmation email is on its way to <span className="text-slate-200">{formData.email}</span>
              </p>

              {/* Details */}
              <div className="bg-[#0A0F17] border border-white/8 rounded-xl p-4 mb-5 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Date</span>
                  <span className="text-slate-200 font-medium">
                    {bookedSlot ? format(parseISO(bookedSlot), 'EEEE, MMM d') : ''}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Time</span>
                  <span className="text-slate-200 font-medium">
                    {bookedSlot ? format(parseISO(bookedSlot), 'h:mm a') : ''} IST
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Duration</span>
                  <span className="text-slate-200 font-medium">30 minutes</span>
                </div>
              </div>

              {/* Meet link */}
              <a
                href={meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3.5 rounded-xl font-bold text-sm text-[#080C14] mb-3 transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #22D3EE, #0891B2)', boxShadow: '0 0 24px rgba(34,211,238,0.2)' }}
              >
                Join Google Meet
              </a>

              <button
                onClick={downloadICS}
                className="w-full py-3 rounded-xl border border-white/10 text-sm text-slate-400 hover:border-white/20 hover:text-white transition-all mb-4"
              >
                Add to Calendar (.ics)
              </button>

              <button
                onClick={handleClose}
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  )
}

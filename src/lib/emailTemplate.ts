interface EmailData {
  name: string
  email: string
  company: string
  slot: string    // ISO datetime e.g. "2026-02-25T13:00:00+04:00"
  meetLink: string
}

function formatSlotForEmail(slot: string): { date: string; time: string } {
  const datePart = slot.substring(0, 10)
  const timePart = slot.substring(11, 16)

  const [y, m, d] = datePart.split('-').map(Number)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const dow = days[new Date(`${datePart}T12:00:00`).getDay()]

  const [hh, mm] = timePart.split(':').map(Number)
  const ampm = hh >= 12 ? 'PM' : 'AM'
  const h12 = hh > 12 ? hh - 12 : hh === 0 ? 12 : hh

  return {
    date: `${dow}, ${months[m - 1]} ${d}, ${y}`,
    time: `${h12}:${String(mm).padStart(2, '0')} ${ampm} GST`,
  }
}

export function buildConfirmationEmail(data: EmailData): string {
  const { date, time } = formatSlotForEmail(data.slot)
  const firstName = data.name.split(' ')[0]

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Call Confirmed — SynopsLabs</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #06090F; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
  @media only screen and (max-width: 600px) {
    .outer { padding: 0 !important; }
    .card { border-radius: 0 !important; }
    .hero-pad { padding: 40px 28px 32px !important; }
    .body-pad { padding: 28px !important; }
    .footer-pad { padding: 24px 28px !important; }
  }
</style>
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0" border="0" class="outer" style="background:#06090F; padding: 48px 24px;">
  <tr>
    <td align="center">
      <table width="560" cellpadding="0" cellspacing="0" border="0" class="card" style="max-width:560px; width:100%; background:#0B0F18; border-radius:12px; border:1px solid rgba(255,255,255,0.07); overflow:hidden;">

        <!-- TOP RULE -->
        <tr>
          <td style="height:1px; background:linear-gradient(90deg, transparent 0%, #22D3EE 40%, #0891B2 100%); font-size:0; line-height:0;">&nbsp;</td>
        </tr>

        <!-- HERO -->
        <tr>
          <td class="hero-pad" style="padding: 48px 44px 40px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-bottom: 36px;">
                  <span style="font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#22D3EE;">SYNOPSLABS</span>
                </td>
              </tr>
            </table>
            <p style="font-size:11px; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; color:#475569; margin-bottom:12px;">Call Confirmed</p>
            <h1 style="font-size:32px; font-weight:800; color:#F8FAFC; line-height:1.1; letter-spacing:-0.03em; margin-bottom:16px;">You're on the calendar,<br>${firstName}.</h1>
            <p style="font-size:15px; color:#64748B; line-height:1.6; max-width:380px;">We'll walk you through how our AI WhatsApp system works — no slides, no pitch. Just a direct conversation.</p>
          </td>
        </tr>

        <!-- DIVIDER -->
        <tr>
          <td style="padding: 0 44px;"><div style="height:1px; background:rgba(255,255,255,0.06); font-size:0; line-height:0;">&nbsp;</div></td>
        </tr>

        <!-- MEETING DETAILS -->
        <tr>
          <td class="body-pad" style="padding: 36px 44px;">
            <p style="font-size:10px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#334155; margin-bottom:20px;">Meeting Details</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding: 11px 0; border-bottom:1px solid rgba(255,255,255,0.05); width:45%;">
                  <span style="font-size:12px; color:#475569; font-weight:500;">Date</span>
                </td>
                <td style="padding: 11px 0; border-bottom:1px solid rgba(255,255,255,0.05); text-align:right;">
                  <span style="font-size:13px; color:#E2E8F0; font-weight:600;">${date}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 11px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                  <span style="font-size:12px; color:#475569; font-weight:500;">Time</span>
                </td>
                <td style="padding: 11px 0; border-bottom:1px solid rgba(255,255,255,0.05); text-align:right;">
                  <span style="font-size:13px; color:#E2E8F0; font-weight:600;">${time}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 11px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                  <span style="font-size:12px; color:#475569; font-weight:500;">Duration</span>
                </td>
                <td style="padding: 11px 0; border-bottom:1px solid rgba(255,255,255,0.05); text-align:right;">
                  <span style="font-size:13px; color:#E2E8F0; font-weight:600;">30 minutes</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 11px 0;">
                  <span style="font-size:12px; color:#475569; font-weight:500;">Format</span>
                </td>
                <td style="padding: 11px 0; text-align:right;">
                  <span style="font-size:13px; color:#E2E8F0; font-weight:600;">Google Meet</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- DIVIDER -->
        <tr>
          <td style="padding: 0 44px;"><div style="height:1px; background:rgba(255,255,255,0.06); font-size:0; line-height:0;">&nbsp;</div></td>
        </tr>

        <!-- WHAT TO EXPECT -->
        <tr>
          <td class="body-pad" style="padding: 36px 44px;">
            <p style="font-size:10px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#334155; margin-bottom:20px;">What to Expect</p>
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="padding: 8px 0; vertical-align:top; width:24px;">
                  <span style="font-size:11px; color:#22D3EE; font-weight:700; font-family:monospace;">01</span>
                </td>
                <td style="padding: 8px 0 8px 14px; vertical-align:top;">
                  <span style="font-size:13px; color:#94A3B8; line-height:1.6;">A live walkthrough of how we automate WhatsApp lead qualification end-to-end</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; vertical-align:top; width:24px;">
                  <span style="font-size:11px; color:#22D3EE; font-weight:700; font-family:monospace;">02</span>
                </td>
                <td style="padding: 8px 0 8px 14px; vertical-align:top;">
                  <span style="font-size:13px; color:#94A3B8; line-height:1.6;">Real examples from active deployments in the UAE market</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; vertical-align:top; width:24px;">
                  <span style="font-size:11px; color:#22D3EE; font-weight:700; font-family:monospace;">03</span>
                </td>
                <td style="padding: 8px 0 8px 14px; vertical-align:top;">
                  <span style="font-size:13px; color:#94A3B8; line-height:1.6;">Honest answers to your questions — no commitment required</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td class="footer-pad" style="padding: 28px 44px; border-top:1px solid rgba(255,255,255,0.06);">
            <p style="font-size:11px; color:#334155; line-height:1.7;">
              Questions? Reply to this email or write to
              <a href="mailto:sales@synopslabs.com" style="color:#22D3EE; text-decoration:none;">sales@synopslabs.com</a>
            </p>
            <p style="font-size:11px; color:#1E293B; margin-top:6px;">Automated confirmation · SynopsLabs · Dubai, UAE</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

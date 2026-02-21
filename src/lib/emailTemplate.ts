import { format, parseISO } from 'date-fns'

interface EmailData {
  name: string
  email: string
  company: string
  slot: string    // ISO datetime
  meetLink: string
}

export function buildConfirmationEmail(data: EmailData): string {
  const start = parseISO(data.slot)
  const dateStr = format(start, 'EEEE, MMMM d, yyyy')
  const timeStr = format(start, 'h:mm a') + ' IST'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your call is confirmed — SynopsLabs</title>
</head>
<body style="margin:0;padding:0;background:#080C14;font-family:system-ui,-apple-system,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#080C14;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Top accent bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#22D3EE,#0891B2);border-radius:3px 3px 0 0;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background:#080C14;padding:36px 40px 28px;border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0 0 24px;font-size:13px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#22D3EE;font-family:monospace;">SynopsLabs</p>
              <h1 style="margin:0;font-size:36px;font-weight:900;color:#F1F5F9;line-height:1.1;letter-spacing:-0.02em;">Your call is confirmed.</h1>
              <p style="margin:12px 0 0;font-size:16px;color:#94A3B8;line-height:1.6;">
                Hi ${data.name}, we're looking forward to speaking with you.
              </p>
            </td>
          </tr>

          <!-- Meeting details card -->
          <tr>
            <td style="background:#0F1623;padding:28px 40px;border:1px solid rgba(255,255,255,0.06);border-top:none;">
              <p style="margin:0 0 16px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#64748B;">Meeting Details</p>

              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <span style="font-size:13px;color:#64748B;">Date</span>
                  </td>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);text-align:right;">
                    <span style="font-size:13px;color:#E2E8F0;font-weight:500;">${dateStr}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <span style="font-size:13px;color:#64748B;">Time</span>
                  </td>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);text-align:right;">
                    <span style="font-size:13px;color:#E2E8F0;font-weight:500;">${timeStr}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <span style="font-size:13px;color:#64748B;">Duration</span>
                  </td>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);text-align:right;">
                    <span style="font-size:13px;color:#E2E8F0;font-weight:500;">30 minutes</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <span style="font-size:13px;color:#64748B;">Company</span>
                  </td>
                  <td style="padding:8px 0;text-align:right;">
                    <span style="font-size:13px;color:#E2E8F0;font-weight:500;">${data.company}</span>
                  </td>
                </tr>
              </table>

              <!-- Meet link button -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;">
                <tr>
                  <td align="center">
                    <a href="${data.meetLink}"
                      style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#22D3EE,#0891B2);border-radius:100px;font-size:15px;font-weight:700;color:#080C14;text-decoration:none;letter-spacing:-0.01em;">
                      Join Google Meet
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What to expect -->
          <tr>
            <td style="background:#080C14;padding:28px 40px;border:1px solid rgba(255,255,255,0.06);border-top:none;">
              <p style="margin:0 0 16px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#64748B;">What to Expect</p>
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:6px 0;vertical-align:top;padding-right:12px;">
                    <span style="color:#22D3EE;font-size:14px;">→</span>
                  </td>
                  <td style="padding:6px 0;">
                    <span style="font-size:14px;color:#94A3B8;line-height:1.5;">A walkthrough of how our AI WhatsApp system works for your business</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;padding-right:12px;">
                    <span style="color:#22D3EE;font-size:14px;">→</span>
                  </td>
                  <td style="padding:6px 0;">
                    <span style="font-size:14px;color:#94A3B8;line-height:1.5;">Live examples from real deployments in the UAE market</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;padding-right:12px;">
                    <span style="color:#22D3EE;font-size:14px;">→</span>
                  </td>
                  <td style="padding:6px 0;">
                    <span style="font-size:14px;color:#94A3B8;line-height:1.5;">No pitch deck, no commitment — just a direct conversation</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#080C14;padding:24px 40px;border:1px solid rgba(255,255,255,0.06);border-top:1px solid rgba(255,255,255,0.04);border-radius:0 0 8px 8px;">
              <p style="margin:0;font-size:12px;color:#475569;line-height:1.6;">
                Questions? Reply to this email or reach us at
                <a href="mailto:sales@synopslabs.com" style="color:#22D3EE;text-decoration:none;">sales@synopslabs.com</a>
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#334155;">
                This is an automated confirmation from SynopsLabs.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

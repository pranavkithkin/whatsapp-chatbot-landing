/**
 * One-time script to generate a Google OAuth2 refresh token.
 *
 * Prerequisites:
 *   1. Create a project in Google Cloud Console: https://console.cloud.google.com/
 *   2. Enable the Google Calendar API.
 *   3. Create OAuth 2.0 credentials (Desktop app type).
 *   4. Download the client secret JSON and note your Client ID + Client Secret.
 *
 * Usage:
 *   GOOGLE_CLIENT_ID=xxx GOOGLE_CLIENT_SECRET=yyy node scripts/get-google-token.js
 *
 * Then follow the printed URL, authorize, paste the code back, and copy the
 * refresh_token into your .env.local file.
 */

const { google } = require('googleapis')
const readline = require('readline')

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Error: Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET env vars before running.')
  process.exit(1)
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/calendar'],
  prompt: 'consent',
})

console.log('\n── Step 1 ────────────────────────────────────────────────')
console.log('Open this URL in your browser and authorize the app:\n')
console.log(authUrl)
console.log('\n── Step 2 ────────────────────────────────────────────────')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.question('Paste the authorization code here: ', async (code) => {
  rl.close()
  try {
    const { tokens } = await oauth2Client.getToken(code.trim())
    console.log('\n── Done! Add these to your .env.local ───────────────────')
    console.log(`GOOGLE_CLIENT_ID=${CLIENT_ID}`)
    console.log(`GOOGLE_CLIENT_SECRET=${CLIENT_SECRET}`)
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`)
    console.log('\nAlso set:')
    console.log('GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com')
    console.log('  (find it in Google Calendar → Settings → your calendar → Calendar ID)')
    console.log('\nRESEND_API_KEY=re_xxxxxxxxxxxx')
    console.log('  (get it from https://resend.com/api-keys)')
  } catch (err) {
    console.error('Failed to exchange code for tokens:', err.message)
  }
})

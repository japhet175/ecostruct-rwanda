import nodemailer from 'nodemailer'
import type { NextRequest } from 'next/server'

interface ContactPayload {
  name?: string
  email?: string
  phone?: string
  message?: string
  website?: string // honeypot field — must be empty
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  let body: ContactPayload
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const phone = (body.phone ?? '').trim()
  const message = (body.message ?? '').trim()
  const website = (body.website ?? '').trim()

  // Honeypot: bots fill this hidden field — silently accept but do nothing.
  if (website) {
    return Response.json({ ok: true })
  }

  if (name.length < 2) {
    return Response.json({ error: 'Please enter your name.' }, { status: 400 })
  }
  if (!EMAIL_REGEX.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (message.length < 5) {
    return Response.json({ error: 'Please enter a message.' }, { status: 400 })
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? '465')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.CONTACT_TO_EMAIL ?? user

  if (!host || !user || !pass) {
    console.error('[contact] SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS.')
    return Response.json(
      { error: 'The contact form is not configured yet. Please try again later.' },
      { status: 503 }
    )
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  const subject = `New message from ${name} — eco-sturct.com`
  const text = [
    'New message from the website',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : '',
    '',
    'Message:',
    message,
  ]
    .filter((line) => line !== '')
    .join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1f2937;">
      <h2 style="color: #1e3c2c; margin-bottom: 16px;">New message from the website</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 4px 0; font-weight: bold; width: 90px;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Email</td><td>${escapeHtml(email)}</td></tr>
        ${phone ? `<tr><td style="padding: 4px 0; font-weight: bold;">Phone</td><td>${escapeHtml(phone)}</td></tr>` : ''}
      </table>
      <p style="font-weight: bold; margin: 20px 0 8px;">Message</p>
      <p style="white-space: pre-line; background: #f9fafb; padding: 12px; border-radius: 6px;">${escapeHtml(message)}</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: user,
      to,
      replyTo: email,
      subject,
      text,
      html,
    })
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[contact] Failed to send email:', err)
    return Response.json(
      { error: 'Could not send your message. Please email us directly or try again later.' },
      { status: 500 }
    )
  }
}

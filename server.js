require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
app.use(express.json());

// Allow CORS for local development (so pages served from Live Server at :5500
// can POST to this endpoint). In production you may want to restrict this.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Simple rate limiter to reduce spam
const limiter = rateLimit({ windowMs: 60 * 1000, max: 10 }); // 10 requests / minute per IP
app.use('/send-contact', limiter);

// Create transporter from env vars
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify transporter early so failures are logged at startup
transporter.verify().then(() => {
  console.log('SMTP transporter verified');
}).catch((err) => {
  console.error('SMTP transporter verification failed:', err && err.message ? err.message : err);
});

// Optional: serve static site files when running server from repo root
app.use(express.static(path.join(__dirname, '.')));

// Validate required environment variables for sending mail
const requiredEnvs = ['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS','CONTACT_EMAIL'];
const missingEnvs = requiredEnvs.filter(k => !process.env[k]);
const smtpReady = missingEnvs.length === 0;
if (!smtpReady) {
  console.warn('Mail configuration incomplete. Missing env vars:', missingEnvs.join(', '));
}

app.post('/send-contact', async (req, res) => {
  try {
    const { name, email, reason, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Received contact submission from', email, 'reason=', reason || '');

    const mail = {
      from: process.env.SMTP_FROM || `Website <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Website contact: ${reason || 'General'}`,
      text: `Name: ${name}\nEmail: ${email}\nReason: ${reason || ''}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Reason:</strong> ${reason || ''}</p><hr><p>${message}</p>`
    };

    // Validate envs before attempting send
    if (!smtpReady) {
      return res.status(500).json({ error: 'SMTP not configured', missing: missingEnvs });
    }

    try {
      await transporter.sendMail(mail);
      return res.json({ ok: true });
    } catch (sendErr) {
      console.error('sendMail error', sendErr && sendErr.stack ? sendErr.stack : sendErr);
      const debug = process.env.DEBUG_CONTACT === 'true';
      if (debug) {
        return res.status(500).json({ error: sendErr && sendErr.message ? sendErr.message : 'Send failed', detail: sendErr && sendErr.stack ? sendErr.stack : null });
      }
      return res.status(500).json({ error: 'Failed to send message' });
    }
  } catch (err) {
    console.error('send-contact error', err && err.stack ? err.stack : err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Contact server listening on ${PORT}`));

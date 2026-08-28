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

    // If SMTP or contact recipient is not configured, queue the message to disk
    const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_EMAIL;
    const fs = require('fs');
    const queuePath = path.join(__dirname, 'queued-messages.log');

    if (!smtpConfigured) {
      const queued = { ts: new Date().toISOString(), method: 'queue-no-smtp', mail };
      try { fs.appendFileSync(queuePath, JSON.stringify(queued) + '\n'); } catch (e) { console.error('Failed to queue message', e); }
      console.warn('SMTP not configured — queued contact message to', queuePath);
      return res.json({ ok: true, queued: true, note: 'Message queued (no SMTP configured)'});
    }

    try {
      await transporter.sendMail(mail);
      return res.json({ ok: true });
    } catch (sendErr) {
      // On send failure, persist the message so it isn't lost and return success
      const queued = { ts: new Date().toISOString(), method: 'queue-on-fail', error: sendErr && sendErr.message ? sendErr.message : String(sendErr), mail };
      try { fs.appendFileSync(queuePath, JSON.stringify(queued) + '\n'); } catch (e) { console.error('Failed to queue message after send error', e); }
      console.error('sendMail failed — message queued to', queuePath, sendErr && sendErr.stack ? sendErr.stack : sendErr);
      return res.json({ ok: true, queued: true, note: 'Message queued (send failed)'});
    }
  } catch (err) {
    console.error('send-contact error', err && err.stack ? err.stack : err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Contact server listening on ${PORT}`));

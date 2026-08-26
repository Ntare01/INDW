Indinzi Contact Server
======================
```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false    # true for 465, false for 587/25
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM=no-reply@yourdomain.tld
CONTACT_EMAIL=noellantare@gmail.com   # recipient address (placeholder/test address)
PORT=3000
```
Quick start (local):

1. Copy `.env.example` to `.env` and fill in SMTP credentials and `CONTACT_EMAIL`.

2. Install and start:

```bash
cd /path/to/INDW
npm install
npm start
```

3. Test the form from the browser

- Preferred (recommended): start the contact server and open `http://localhost:3000/contact.html` so the front-end posts to the same origin. This avoids cross-origin issues when testing.
- If you open the static site with a live-reload server (for example `127.0.0.1:5500`) the form POST will be sent to that origin and fail unless you either:
	- open the page through the contact server at `http://localhost:3000/contact.html`, or
	- enable cross-origin requests by running the contact server (it allows CORS for local development) or update the front-end fetch to use the full backend URL `http://localhost:3000/send-contact`.
- On success the client should receive `{ ok: true }` and the server logs `Contact server listening on 3000` plus any send confirmations or errors.

Docker (optional):

```bash
# build
docker build -t indinzi-contact .
# run (set env or mount .env)
docker run --env-file .env -p 3000:3000 indinzi-contact
```

Notes & maintenance
- Keep `.env` secret and out of version control.
- Use your domain's SMTP provider for best deliverability.
- If you prefer not to host an SMTP relay, you can use an authenticated SMTP service (your mail provider).
- Add monitoring (restart on crash) with a process manager like `pm2` or run in a container orchestration platform.

Security
- The server includes a basic rate limiter to limit abuse. Consider adding CAPTCHA or stronger anti-spam measures if needed.

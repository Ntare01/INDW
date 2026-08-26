#!/usr/bin/env node
// Creates an Ethereal test account and writes a .env file for local testing.
// Usage: node scripts/create-ethereal.js

const fs = require('fs');
const util = require('util');
const nodemailer = require('nodemailer');

async function run() {
  try {
    const testAccount = await nodemailer.createTestAccount();
    const smtp = testAccount.smtp;

    const env = `SMTP_HOST=${smtp.host}
SMTP_PORT=${smtp.port}
SMTP_SECURE=${smtp.secure}
SMTP_USER=${testAccount.user}
SMTP_PASS=${testAccount.pass}
SMTP_FROM=no-reply@example.com
CONTACT_EMAIL=noellantare@gmail.com
PORT=3000
`;

    await util.promisify(fs.writeFile)('.env', env, { encoding: 'utf8' });
    console.log('Wrote .env with Ethereal test account.');
    console.log('Ethereal credentials:');
    console.log(JSON.stringify(testAccount, null, 2));
    console.log('Start server with: npm start');
    console.log('When sending mail, check the preview URL printed by Nodemailer in server logs.');
  } catch (err) {
    console.error('Failed to create Ethereal account:', err);
    process.exit(1);
  }
}

run();

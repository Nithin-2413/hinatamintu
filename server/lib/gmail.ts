import { google, gmail_v1 } from 'googleapis';
import fs from 'fs';
import path from 'path';

const GMAIL_USER = process.env.GMAIL_USER || 'thewrittenhug@gmail.com';
const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID || '';
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET || '';
const GMAIL_REDIRECT_URI_DEV = process.env.GMAIL_REDIRECT_URI_DEV || 'http://localhost:3000/google/auth/callback';
const GMAIL_REDIRECT_URI_PROD = process.env.GMAIL_REDIRECT_URI_PROD || '';

export function getOAuth2Client() {
  const redirectUri = process.env.NODE_ENV === 'production' && GMAIL_REDIRECT_URI_PROD
    ? GMAIL_REDIRECT_URI_PROD
    : GMAIL_REDIRECT_URI_DEV;

  const oauth2Client = new google.auth.OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    redirectUri
  );

  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  if (refreshToken) {
    oauth2Client.setCredentials({ refresh_token: refreshToken });
  }

  return oauth2Client;
}

export function generateAuthUrl() {
  const oauth2Client = getOAuth2Client();
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.modify',
    ],
  });
}

export async function exchangeCodeForTokens(code: string) {
  const oauth2Client = getOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  return tokens; // contains refresh_token on first consent
}

function buildRawEmail({
  fromName,
  fromEmail,
  to,
  cc,
  subject,
  html,
  threadId,
  inReplyToMessageId,
}: {
  fromName: string;
  fromEmail: string;
  to: string;
  cc?: string;
  subject: string;
  html: string;
  threadId?: string;
  inReplyToMessageId?: string;
}) {
  const headers: string[] = [];
  headers.push(`From: ${fromName} <${fromEmail}>`);
  headers.push(`To: ${to}`);
  if (cc) headers.push(`Cc: ${cc}`);
  headers.push('MIME-Version: 1.0');
  headers.push('Content-Type: text/html; charset=UTF-8');
  headers.push(`Subject: ${encodeURIComponent(subject)}`);
  if (inReplyToMessageId) {
    headers.push(`In-Reply-To: ${inReplyToMessageId}`);
    headers.push(`References: ${inReplyToMessageId}`);
  }

  const message = `${headers.join('\r\n')}\r\n\r\n${html}`;
  const base64EncodedEmail = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
  return base64EncodedEmail;
}

export async function sendHtmlEmail({
  to,
  cc,
  subject,
  html,
  threadId,
  inReplyToMessageId,
}: {
  to: string;
  cc?: string;
  subject: string;
  html: string;
  threadId?: string;
  inReplyToMessageId?: string;
}): Promise<{ id: string; threadId: string }>
{
  const auth = getOAuth2Client();
  const gmail = google.gmail({ version: 'v1', auth });

  const raw = buildRawEmail({
    fromName: process.env.GMAIL_FROM_NAME || 'CEO - The Written Hug',
    fromEmail: GMAIL_USER,
    to,
    cc,
    subject,
    html,
    threadId,
    inReplyToMessageId,
  });

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw,
      threadId: threadId,
    },
  });

  const id = res.data.id as string;
  const tId = res.data.threadId as string;
  return { id, threadId: tId };
}

export async function listThreadMessages(threadId: string): Promise<gmail_v1.Schema$Message[]> {
  const auth = getOAuth2Client();
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.threads.get({ userId: 'me', id: threadId });
  return res.data.messages || [];
}

export async function getMessage(messageId: string): Promise<gmail_v1.Schema$Message | undefined> {
  const auth = getOAuth2Client();
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.get({ userId: 'me', id: messageId, format: 'full' });
  return res.data;
}

export function getHeader(headers: gmail_v1.Schema$MessagePartHeader[] | undefined, name: string): string | undefined {
  const h = headers?.find(h => (h.name || '').toLowerCase() === name.toLowerCase());
  return h?.value || undefined;
}

export function extractPlainText(message: gmail_v1.Schema$Message): string {
  function walk(part?: gmail_v1.Schema$MessagePart): string {
    if (!part) return '';
    if (part.mimeType === 'text/plain' && part.body?.data) {
      return Buffer.from(part.body.data, 'base64').toString('utf-8');
    }
    if (part.mimeType === 'text/html' && part.body?.data) {
      return Buffer.from(part.body.data, 'base64').toString('utf-8');
    }
    if (part.parts) {
      for (const p of part.parts) {
        const s = walk(p);
        if (s) return s;
      }
    }
    return '';
  }
  return walk(message.payload);
}
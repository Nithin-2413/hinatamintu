import fetch from 'node-fetch';

const OUTLOOK_USER = process.env.OUTLOOK_USER || '';
const OUTLOOK_FROM_NAME = process.env.OUTLOOK_FROM_NAME || 'CEO - The Written Hug';
const OUTLOOK_CLIENT_ID = process.env.OUTLOOK_CLIENT_ID || '';
const OUTLOOK_CLIENT_SECRET = process.env.OUTLOOK_CLIENT_SECRET || '';
const OUTLOOK_REDIRECT_URI_DEV = process.env.OUTLOOK_REDIRECT_URI_DEV || 'http://localhost:3000/outlook/auth/callback';
const OUTLOOK_REDIRECT_URI_PROD = process.env.OUTLOOK_REDIRECT_URI_PROD || '';
const OUTLOOK_TENANT = process.env.OUTLOOK_TENANT || 'consumers'; // or 'common' / tenant id

function getRedirectUri() {
  return process.env.NODE_ENV === 'production' && OUTLOOK_REDIRECT_URI_PROD
    ? OUTLOOK_REDIRECT_URI_PROD
    : OUTLOOK_REDIRECT_URI_DEV;
}

const AUTH_BASE = `https://login.microsoftonline.com/${OUTLOOK_TENANT}/oauth2/v2.0`;
const GRAPH_BASE = 'https://graph.microsoft.com/v1.0';

export function generateOutlookAuthUrl() {
  const params = new URLSearchParams({
    client_id: OUTLOOK_CLIENT_ID,
    response_type: 'code',
    redirect_uri: getRedirectUri(),
    response_mode: 'query',
    scope: [
      'offline_access',
      'Mail.Send',
      'Mail.Read',
      'Mail.ReadWrite',
    ].join(' '),
    prompt: 'consent',
  });
  return `${AUTH_BASE}/authorize?${params.toString()}`;
}

export async function exchangeOutlookCodeForTokens(code: string) {
  const params = new URLSearchParams({
    client_id: OUTLOOK_CLIENT_ID,
    client_secret: OUTLOOK_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: getRedirectUri(),
  });
  const res = await fetch(`${AUTH_BASE}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`);
  return res.json();
}

async function getAccessToken(): Promise<string> {
  const refreshToken = process.env.OUTLOOK_REFRESH_TOKEN || '';
  if (!refreshToken) throw new Error('OUTLOOK_REFRESH_TOKEN missing');
  const params = new URLSearchParams({
    client_id: OUTLOOK_CLIENT_ID,
    client_secret: OUTLOOK_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    redirect_uri: getRedirectUri(),
    scope: [
      'offline_access',
      'Mail.Send',
      'Mail.Read',
      'Mail.ReadWrite',
    ].join(' '),
  });
  const res = await fetch(`${AUTH_BASE}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(`Refresh failed: ${res.status}`);
  const json = await res.json();
  return json.access_token as string;
}

export async function sendOutlookHtmlEmail({
  to,
  cc,
  subject,
  html,
}: {
  to: string;
  cc?: string;
  subject: string;
  html: string;
}): Promise<{ id: string; conversationId: string }>
{
  const token = await getAccessToken();
  const recipients = [{ emailAddress: { address: to } }];
  const ccRecipients = cc ? [{ emailAddress: { address: cc } }] : [];

  // Create draft message to get id + conversationId, then send
  const createRes = await fetch(`${GRAPH_BASE}/me/messages`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject,
      body: { contentType: 'HTML', content: html },
      toRecipients: recipients,
      ccRecipients: ccRecipients,
    }),
  });
  if (!createRes.ok) throw new Error(`Create draft failed: ${createRes.status}`);
  const draft = await createRes.json();
  const messageId = draft.id as string;
  const conversationId = draft.conversationId as string;

  const sendRes = await fetch(`${GRAPH_BASE}/me/messages/${messageId}/send`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!sendRes.ok) throw new Error(`Send failed: ${sendRes.status}`);

  return { id: messageId, conversationId };
}

export async function replyInConversation({
  conversationId,
  replyHtml,
}: {
  conversationId: string;
  replyHtml: string;
}): Promise<{ id: string; conversationId: string }>
{
  const token = await getAccessToken();
  // Find the newest message in the conversation
  const listRes = await fetch(`${GRAPH_BASE}/me/messages?$filter=conversationId eq '${conversationId}'&$orderby=lastModifiedDateTime desc&$top=1`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!listRes.ok) throw new Error(`List messages failed: ${listRes.status}`);
  const listJson = await listRes.json();
  const last = listJson.value?.[0];
  if (!last) throw new Error('No message found in conversation');

  // Create reply draft
  const createReplyRes = await fetch(`${GRAPH_BASE}/me/messages/${last.id}/createReply`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!createReplyRes.ok) throw new Error(`createReply failed: ${createReplyRes.status}`);
  const replyDraft = await createReplyRes.json();

  // Update body to HTML content
  const updateRes = await fetch(`${GRAPH_BASE}/me/messages/${replyDraft.id}`, {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ body: { contentType: 'HTML', content: replyHtml } }),
  });
  if (!updateRes.ok) throw new Error(`Update reply failed: ${updateRes.status}`);

  const sendRes = await fetch(`${GRAPH_BASE}/me/messages/${replyDraft.id}/send`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!sendRes.ok) throw new Error(`Send reply failed: ${sendRes.status}`);

  return { id: replyDraft.id as string, conversationId };
}

export async function listConversationMessages(conversationId: string) {
  const token = await getAccessToken();
  const res = await fetch(`${GRAPH_BASE}/me/messages?$filter=conversationId eq '${conversationId}'&$orderby=receivedDateTime asc`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`List messages failed: ${res.status}`);
  const json = await res.json();
  return json.value || [];
}

export function extractTextFromGraphMessage(message: any): string {
  const body = message?.body?.content || '';
  return body;
}
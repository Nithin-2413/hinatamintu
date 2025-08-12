import type { VercelRequest, VercelResponse } from '@vercel/node';
import { exchangeOutlookCodeForTokens } from '../server/lib/outlook';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const code = (req.query.code as string) || '';
    if (!code) return res.status(400).send('Missing code');
    const tokens = await exchangeOutlookCodeForTokens(code);
    console.log('Copy this refresh token to your env as OUTLOOK_REFRESH_TOKEN:', tokens.refresh_token);
    res.status(200).send('Authorization successful. Check server logs for refresh_token. Save it as OUTLOOK_REFRESH_TOKEN.');
  } catch (e:any) {
    console.error('Outlook OAuth callback error', e);
    res.status(500).send('OAuth error');
  }
}
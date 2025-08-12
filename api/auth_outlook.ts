import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateOutlookAuthUrl } from '../server/lib/outlook';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const url = generateOutlookAuthUrl();
  res.writeHead(302, { Location: url });
  res.end();
}
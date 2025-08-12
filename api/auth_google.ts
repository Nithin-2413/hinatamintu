import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateAuthUrl } from '../server/lib/gmail';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const url = generateAuthUrl();
  res.writeHead(302, { Location: url });
  res.end();
}
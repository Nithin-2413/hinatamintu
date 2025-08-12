import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { listThreadMessages, getHeader, extractPlainText } from '../server/lib/gmail';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const { data: hugs, error } = await supabaseAdmin
      .from('written_hug')
      .select('id, gmail_thread_id')
      .not('gmail_thread_id', 'is', null);

    if (error) throw error;

    const senderAddress = (process.env.GMAIL_USER || 'thewrittenhug@gmail.com').toLowerCase();

    for (const hug of hugs || []) {
      const messages = await listThreadMessages(hug.gmail_thread_id as string);
      for (const message of messages) {
        const messageId = message.id as string;
        const existing = await supabaseAdmin
          .from('hug_replies')
          .select('id')
          .eq('gmail_message_id', messageId)
          .maybeSingle();
        if ((existing.data && !Array.isArray(existing.data)) || (existing.data && Array.isArray(existing.data) && existing.data.length > 0)) {
          continue;
        }
        const headers = message.payload?.headers;
        const from = (getHeader(headers, 'From') || '').toLowerCase();
        const body = extractPlainText(message);
        const sender_type = from.includes(senderAddress) ? 'admin' : 'client';
        await supabaseAdmin
          .from('hug_replies')
          .insert([{
            hugid: hug.id,
            sender_type,
            sender_name: sender_type === 'admin' ? 'CEO - The Written Hug' : 'Client',
            message: body || '',
            gmail_thread_id: hug.gmail_thread_id,
            gmail_message_id: messageId,
            label_ids: message.labelIds || [],
          }]);
      }
    }

    res.json({ success: true, processed: (hugs || []).length });
  } catch (e:any) {
    console.error('pollGmail error', e);
    res.status(500).json({ success: false, message: e.message || 'poll error' });
  }
}
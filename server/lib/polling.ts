import { supabaseAdmin } from './supabase';
import { listThreadMessages, getHeader, extractPlainText } from './gmail';

export async function pollGmailAndSyncOnce(): Promise<{ processed: number }> {
  const { data: hugs, error } = await supabaseAdmin
    .from('written_hug')
    .select('id, gmail_thread_id')
    .not('gmail_thread_id', 'is', null);

  if (error) throw error;

  const senderAddress = (process.env.GMAIL_USER || 'thewrittenhug@gmail.com').toLowerCase();
  let processed = 0;

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
      processed += 1;
    }
  }

  return { processed };
}
import { supabaseAdmin } from './supabase';
import { listConversationMessages, extractTextFromGraphMessage } from './outlook';

export async function pollGmailAndSyncOnce(): Promise<{ processed: number }> {
  const { data: hugs, error } = await supabaseAdmin
    .from('written_hug')
    .select('id, gmail_thread_id')
    .not('gmail_thread_id', 'is', null);

  if (error) throw error;

  let processed = 0;

  for (const hug of hugs || []) {
    const messages = await listConversationMessages(hug.gmail_thread_id as string);
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
      const from = (message.from?.emailAddress?.address || '').toLowerCase();
      const body = extractTextFromGraphMessage(message);
      const sender_type = from.includes((process.env.OUTLOOK_USER || '').toLowerCase()) ? 'admin' : 'client';
      await supabaseAdmin
        .from('hug_replies')
        .insert([{
          hugid: hug.id,
          sender_type,
          sender_name: sender_type === 'admin' ? 'CEO - The Written Hug' : 'Client',
          message: body || '',
          gmail_thread_id: hug.gmail_thread_id,
          gmail_message_id: messageId,
          label_ids: message.categories || [],
        }]);
      processed += 1;
    }
  }

  return { processed };
}
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { replyInConversation } from '../server/lib/outlook';

const sendReplySchema = z.object({
  hugid: z.string().uuid(),
  message: z.string().min(1, "Message is required"),
  admin_name: z.string().min(1, "Admin name is required"),
});

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const validatedData = sendReplySchema.parse(req.body);

    const { data: hug, error: hugError } = await supabaseAdmin
      .from('written_hug')
      .select('id, gmail_thread_id')
      .eq('id', validatedData.hugid)
      .single();

    if (hugError) throw hugError;
    if (!hug) throw new Error('Hug not found');

    const sent = await replyInConversation({
      conversationId: (hug as any).gmail_thread_id,
      replyHtml: `<p>${validatedData.message}</p>`,
    });

    const { data: reply, error: replyError } = await supabaseAdmin
      .from('hug_replies')
      .insert([{
        hugid: validatedData.hugid,
        sender_type: 'admin',
        sender_name: 'CEO - The Written Hug',
        message: validatedData.message,
        gmail_thread_id: sent.conversationId,
        gmail_message_id: sent.id,
      }])
      .select()
      .single();

    if (replyError) throw replyError;

    await supabaseAdmin
      .from('written_hug')
      .update({ Status: 'Replied' })
      .eq('id', validatedData.hugid);

    res.json({ success: true, reply, emailSent: true });
  } catch (error) {
    console.error('Send reply error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Failed to send reply' });
  }
}
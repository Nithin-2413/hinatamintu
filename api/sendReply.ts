import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { sendHtmlEmail } from '../server/lib/gmail';

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
      .select('id, "Email Address", gmail_thread_id, Name')
      .eq('id', validatedData.hugid)
      .single();

    if (hugError) throw hugError;
    if (!hug) throw new Error('Hug not found');

    const toClient = await sendHtmlEmail({
      to: hug['Email Address'] as string,
      subject: "You've Got a Kabootar from CEO - The Written Hug",
      html: `<p>${validatedData.message}</p>`,
      threadId: (hug as any).gmail_thread_id || undefined,
    });

    const { data: reply, error: replyError } = await supabaseAdmin
      .from('hug_replies')
      .insert([{
        hugid: validatedData.hugid,
        sender_type: 'admin',
        sender_name: 'CEO - The Written Hug',
        message: validatedData.message,
        gmail_thread_id: toClient.threadId,
        gmail_message_id: toClient.id,
      }])
      .select()
      .single();

    if (replyError) throw replyError;

    if (!(hug as any).gmail_thread_id) {
      await supabaseAdmin
        .from('written_hug')
        .update({ gmail_thread_id: toClient.threadId, Status: 'Replied' })
        .eq('id', validatedData.hugid);
    } else {
      await supabaseAdmin
        .from('written_hug')
        .update({ Status: 'Replied' })
        .eq('id', validatedData.hugid);
    }

    res.json({ success: true, reply, emailSent: true });
  } catch (error) {
    console.error('Send reply error:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to send reply' 
    });
  }
}
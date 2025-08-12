import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import path from 'path';
import fs from 'fs';
import { sendOutlookHtmlEmail } from '../server/lib/outlook';

const submitHugSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  recipientName: z.string().min(1, "Recipient name is required"),
  serviceType: z.string().min(1, "Service type is required"),
  deliveryType: z.string().min(1, "Delivery type is required"),
  feelings: z.string().min(1, "Feelings are required"),
  story: z.string().min(1, "Story is required"),
  specificDetails: z.string().min(1, "Specific details are required"),
});

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

function loadTemplate(filename: string): string {
  const full = path.resolve(process.cwd(), 'templates', filename);
  return fs.readFileSync(full, 'utf-8');
}

function fill(template: string, variables: Record<string, string>): string {
  let html = template;
  for (const [key, value] of Object.entries(variables)) {
    html = html.replaceAll(`{{var:${key}}}`, value);
  }
  return html;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const validatedData = submitHugSchema.parse(req.body);

    const { data: hug, error } = await supabaseAdmin
      .from('written_hug')
      .insert([{
        'Name': validatedData.name,
        'Recipient\'s Name': validatedData.recipientName,
        'Email Address': validatedData.email,
        'Phone Number': parseInt(validatedData.phone),
        'Type of Message': validatedData.serviceType,
        'Message Details': `${validatedData.feelings}\n\n${validatedData.story}`,
        'Feelings': validatedData.feelings,
        'Story': validatedData.story,
        'Specific Details': validatedData.specificDetails,
        'Delivery Type': validatedData.deliveryType,
        'Status': 'New',
        'Date': new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;

    const clientTpl = loadTemplate('form_response_client.html');
    const adminTpl = loadTemplate('notification_admin.html');

    const clientHtml = fill(clientTpl, { client_name: validatedData.name });
    const adminHtml = fill(adminTpl, {
      name: validatedData.name,
      recipient_name: validatedData.recipientName,
      date: new Date().toISOString(),
      status: 'New',
      email: validatedData.email,
      phone: validatedData.phone,
      message_details: `${validatedData.feelings}\n\n${validatedData.story}`,
      submission_id: hug.id,
    });

    const toClient = await sendOutlookHtmlEmail({
      to: validatedData.email,
      cc: 'onaamikasadguru@gmail.com',
      subject: 'We received your Kabootar',
      html: clientHtml,
    });

    await sendOutlookHtmlEmail({
      to: 'onaamikasadguru@gmail.com',
      subject: `New Written Hug Submission from ${validatedData.name}`,
      html: adminHtml,
    });

    await supabaseAdmin
      .from('written_hug')
      .update({ gmail_thread_id: toClient.conversationId })
      .eq('id', hug.id);

    await supabaseAdmin
      .from('hug_replies')
      .insert([{
        hugid: hug.id,
        sender_type: 'admin',
        sender_name: 'CEO - The Written Hug',
        message: '🕊️ We received your Kabootar — our team will review it and get back to you shortly.',
        gmail_thread_id: toClient.conversationId,
        gmail_message_id: toClient.id,
      }]);

    res.json({ success: true, hug, emailSent: true });
  } catch (error) {
    console.error('Submit hug error:', error);
    res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to submit hug' });
  }
}
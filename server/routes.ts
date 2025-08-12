import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { supabaseAdmin } from "./lib/supabase";
import { z } from "zod";
import path from 'path';
import fs from 'fs';
import { generateAuthUrl, exchangeCodeForTokens, sendHtmlEmail } from './lib/gmail';

const submitHugSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  recipientName: z.string(),
  serviceType: z.string(),
  deliveryType: z.string(),
  feelings: z.string(),
  story: z.string(),
  specificDetails: z.string().optional(),
});

const sendReplySchema = z.object({
  hugid: z.string().uuid(),
  message: z.string(),
  admin_name: z.string(),
});

const adminLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

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

export async function registerRoutes(app: Express): Promise<Server> {
  // OAuth start
  app.get('/auth/google', async (_req, res) => {
    const url = generateAuthUrl();
    res.redirect(url);
  });

  // OAuth callback
  app.get('/google/auth/callback', async (req, res) => {
    try {
      const code = req.query.code as string;
      if (!code) return res.status(400).send('Missing code');
      const tokens = await exchangeCodeForTokens(code);
      console.log('Copy this refresh token to your env as GMAIL_REFRESH_TOKEN:', tokens.refresh_token);
      res.send('Authorization successful. Check server logs for refresh_token. Save it as GMAIL_REFRESH_TOKEN.');
    } catch (e:any) {
      console.error('OAuth callback error', e);
      res.status(500).send('OAuth error');
    }
  });

  // Submit hug form
  app.post("/api/submitHug", async (req, res) => {
    try {
      const validatedData = submitHugSchema.parse(req.body);
      const { data: hug, error } = await supabaseAdmin
        .from('written_hug')
        .insert([{
          'Name': validatedData.name,
          'Recipient\'s Name': validatedData.recipientName,
          'Status': 'New',
          'Email Address': validatedData.email,
          'Phone Number': parseFloat(validatedData.phone),
          'Type of Message': validatedData.serviceType,
          'Message Details': `${validatedData.feelings}\n\n${validatedData.story}`,
          'Feelings': validatedData.feelings,
          'Story': validatedData.story,
          'Specific Details': validatedData.specificDetails || '',
          'Delivery Type': validatedData.deliveryType,
        }])
        .select()
        .single();

      if (error) throw error;

      const clientTpl = loadTemplate('form_response_client.html');
      const adminTpl = loadTemplate('notification_admin.html');

      const clientHtml = fill(clientTpl, {
        client_name: validatedData.name,
      });

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

      // Send to client and capture thread
      const toClient = await sendHtmlEmail({
        to: validatedData.email,
        cc: 'onaamikasadguru@gmail.com',
        subject: 'We received your Kabootar',
        html: clientHtml,
      });

      // Send admin notification (separate)
      await sendHtmlEmail({
        to: 'onaamikasadguru@gmail.com',
        subject: `New Written Hug Submission from ${validatedData.name}`,
        html: adminHtml,
      });

      // Store thread on hug and initial reply row
      await supabaseAdmin
        .from('written_hug')
        .update({ gmail_thread_id: toClient.threadId })
        .eq('id', hug.id);

      await supabaseAdmin
        .from('hug_replies')
        .insert([{
          hugid: hug.id,
          sender_type: 'admin',
          sender_name: 'CEO - The Written Hug',
          message: '🕊️ We received your Kabootar — our team will review it and get back to you shortly.',
          gmail_thread_id: toClient.threadId,
          gmail_message_id: toClient.id,
        }]);

      res.json({ success: true, hug, emailSent: true });
    } catch (error) {
      console.error('Submit hug error:', error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to submit' 
      });
    }
  });

  // Get all hugs for admin
  app.get("/api/getHugs", async (_req, res) => {
    try {
      const { data: hugs, error } = await supabaseAdmin
        .from('written_hug')
        .select('*')
        .order('Date', { ascending: false });

      if (error) throw error;

      res.json({ success: true, hugs });
    } catch (error) {
      console.error('Get hugs error:', error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to fetch hugs' 
      });
    }
  });

  // Get conversation (hug + replies)
  app.get("/api/getConversation", async (req, res) => {
    try {
      const hugid = req.query.hugid as string;
      if (!hugid) {
        return res.status(400).json({ success: false, message: 'hugid required' });
      }

      const { data: hug, error: hugError } = await supabaseAdmin
        .from('written_hug')
        .select('*')
        .eq('id', hugid)
        .single();

      if (hugError) throw hugError;

      const { data: replies, error: repliesError } = await supabaseAdmin
        .from('hug_replies')
        .select('*')
        .eq('hugid', hugid)
        .order('created_at', { ascending: true });

      if (repliesError) throw repliesError;

      res.json({ success: true, hug, replies });
    } catch (error) {
      console.error('Get conversation error:', error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to fetch conversation' 
      });
    }
  });

  // Send reply
  app.post("/api/sendReply", async (req, res) => {
    try {
      const validatedData = sendReplySchema.parse(req.body);

      const { data: hug, error: hugError } = await supabaseAdmin
        .from('written_hug')
        .select('id, "Email Address", gmail_thread_id')
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

      await supabaseAdmin
        .from('hug_replies')
        .insert([{
          hugid: validatedData.hugid,
          sender_type: 'admin',
          sender_name: 'CEO - The Written Hug',
          message: validatedData.message,
          gmail_thread_id: toClient.threadId,
          gmail_message_id: toClient.id,
        }]);

      // Ensure thread id is set on hug
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

      res.json({ success: true });
    } catch (error) {
      console.error('Send reply error:', error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to send reply' 
      });
    }
  });

  // Admin login
  app.post("/api/adminLogin", async (req, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      if (username === "SonuHoney" && password === "Chipmunk@15#") {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (_error) {
      res.status(400).json({ 
        success: false, 
        message: "Invalid request" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

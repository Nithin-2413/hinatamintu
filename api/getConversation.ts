import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { hugid } = req.query;
    
    if (!hugid) {
      return res.status(400).json({ success: false, message: 'hugid required' });
    }

    // Get the hug
    const { data: hug, error: hugError } = await supabaseAdmin
      .from('written_hug')
      .select('*')
      .eq('id', hugid)
      .single();

    if (hugError) throw hugError;

    // Get replies
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
}
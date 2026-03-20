import { createClient } from '@supabase/supabase-js';

// ZV Supabase — used only for verifying the user's Google identity
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

// Kestris — where applications are stored
const KESTRIS_API_URL = process.env.KESTRIS_API_URL || 'https://kestris.netlify.app';
const KESTRIS_API_KEY = process.env.KESTRIS_API_KEY;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  if (!supabase) {
    return json({ error: 'Server not configured' }, 500);
  }

  if (!KESTRIS_API_KEY) {
    console.error('KESTRIS_API_KEY not configured');
    return json({ error: 'Server not configured' }, 500);
  }

  // ── Verify identity via ZV Supabase Auth ──────────────────────────────────

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return json({ error: 'Authentication required. Please sign in with Google.' }, 401);
  }

  const token = authHeader.slice(7);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return json({ error: 'Invalid or expired session. Please sign in again.' }, 401);
  }

  const name = user.user_metadata?.full_name || user.user_metadata?.name || '';
  const email = user.email || '';

  if (!name || !email) {
    return json({ error: 'Could not verify your identity. Please sign in again.' }, 401);
  }

  // ── Forward to Kestris ────────────────────────────────────────────────────

  try {
    const body = await req.json();

    // Inject verified identity into the payload
    body.name = name.trim();
    body.email = email.trim();
    body.user_id = user.id;

    const kestrisRes = await fetch(`${KESTRIS_API_URL}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': KESTRIS_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const kestrisBody = await kestrisRes.json();

    // Pass through Kestris response (validation errors, success, etc.)
    return json(kestrisBody, kestrisRes.status);
  } catch (err) {
    console.error('Join proxy error:', err);
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
};

// Shared helpers for Netlify functions: service-role Supabase client,
// Supabase JWT verification, JSON responses.
// Ported from openvector (feature/workflow-lms) netlify/functions/lib/auth.js.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Service role client — bypasses RLS, used for admin operations
const supabaseAdmin = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;

export { supabaseAdmin };

/**
 * Verify the Supabase JWT from the Authorization header.
 * Returns the authenticated user object.
 * Throws if token is missing or invalid.
 */
export async function verifyUser(req) {
  if (!supabaseAdmin) {
    throw new Error('Supabase not configured');
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing authorization token');
  }

  const token = authHeader.slice(7);
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    throw new Error('Invalid or expired token');
  }

  return user;
}

/**
 * Helper: return a JSON error response.
 */
export function errorResponse(message, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Helper: return a JSON success response.
 */
export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

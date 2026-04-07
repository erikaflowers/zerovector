import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const UserContext = createContext(null);

function mapUser(supabaseUser) {
  if (!supabaseUser) return null;
  return {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Learner',
    email: supabaseUser.email,
    avatar: supabaseUser.user_metadata?.avatar_url || null,
  };
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session ? mapUser(session.user) : null);
      setLoading(false);
    });

    // Listen for auth changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? mapUser(session.user) : null);
      setLoading(false);
    });

    // Clean up orphaned mock auth key from the old stub
    localStorage.removeItem('ovl-user');

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(() => {
    if (!supabase) return;
    // Google blocks OAuth in embedded/in-app browsers (LinkedIn, Instagram, Slack, etc.)
    const ua = navigator.userAgent || '';
    const isEmbedded = /FBAN|FBAV|Instagram|LinkedInApp|Slack|Twitter|MicroMessenger|Line\//i.test(ua);
    if (isEmbedded) {
      // Prompt user to open in their real browser
      const url = window.location.href;
      window.prompt(
        'Google sign-in doesn\u2019t work in this browser. Copy this URL and open it in Safari or Chrome:',
        url
      );
      return;
    }
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.href },
    });
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn: !!user, loading, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}

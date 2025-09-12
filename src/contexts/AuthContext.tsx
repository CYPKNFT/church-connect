import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: { name: string; church_id: string; }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Process any pending church registration after user logs in
  useEffect(() => {
    if (!user) return;
    const raw = localStorage.getItem('pending_church_registration');
    if (!raw) return;

    const process = async () => {
      try {
        const pending = JSON.parse(raw);
        // Avoid duplicate if church already exists for this admin
        const { data: existing } = await supabase
          .from('Churches')
          .select('id')
          .eq('admin_user_id', user.id)
          .limit(1)
          .maybeSingle();

        if (existing) {
          localStorage.removeItem('pending_church_registration');
          return;
        }

        const church = pending?.church || {};
        const admin = pending?.admin || {};

        const { data: created, error: churchError } = await supabase
          .from('Churches')
          .insert({
            name: church.name,
            address: church.address,
            address_line2: church.address_line2 ?? '',
            city: church.city,
            state: church.state,
            postal_code: church.postal_code,
            admin_user_id: user.id,
            admin_email: church.admin_email,
            member_count: church.member_count ?? 1
          })
          .select('id')
          .single();

        if (churchError) {
          console.error('Pending church creation error:', churchError);
          return;
        }

        // Update member profile details created by trigger (best-effort)
        if (created?.id) {
          const { error: memberUpdateError } = await supabase
            .from('members')
            .update({
              name: admin.name ?? null,
              email: admin.email ?? null,
              phone: admin.phone ?? null,
              bio: admin.bio ?? null
            })
            .eq('church_id', created.id)
            .eq('user_id', user.id);

          if (memberUpdateError) {
            console.warn('Member update warning:', memberUpdateError);
          }
        }

        localStorage.removeItem('pending_church_registration');
      } catch (e) {
        console.error('Failed processing pending church registration:', e);
      }
    };

    // Defer to avoid running inside auth callback
    setTimeout(process, 0);
  }, [user]);

  const signUp = async (email: string, password: string, userData: { name: string; church_id: string; }) => {
    const redirectUrl = `${window.location.origin}/email-verification`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: userData.name,
          church_id: userData.church_id
        }
      }
    });

    // Sign up successful; church/member creation handled post-login via pending registration
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}
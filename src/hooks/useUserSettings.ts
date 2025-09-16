import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useMembership } from '@/hooks/useMembership';
import { useToast } from '@/hooks/use-toast';

interface UserSettings {
  push_notifications: boolean;
  email_updates: boolean;
  dark_mode: boolean;
}

export function useUserSettings() {
  const { user } = useAuth();
  const { memberId } = useMembership();
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings>({
    push_notifications: true,
    email_updates: true,
    dark_mode: false,
  });
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState<Partial<UserSettings> | null>(null);
  // Sync pending changes when memberId becomes available
  useEffect(() => {
    if (memberId && pending) {
      (async () => {
        try {
          const updatedSettings = { ...settings, ...pending };
           await supabase
             .from('user_settings')
             .upsert(
               {
                 member_id: memberId,
                 ...updatedSettings,
                 updated_at: new Date().toISOString(),
               },
               { onConflict: 'member_id', ignoreDuplicates: false }
             );
          setPending(null);
          console.log('Synced pending user settings to database');
        } catch (e) {
          console.error('Error syncing pending settings:', e);
        }
      })();
    }
  }, [memberId, pending]);

  // Fetch settings when memberId is available
  useEffect(() => {
    if (memberId) {
      fetchSettings();
    }
  }, [memberId]);

  const fetchSettings = async () => {
    if (!memberId) return;

    try {
      const { data, error } = await (supabase as any)
        .from('user_settings')
        .select('push_notifications, email_updates, dark_mode')
        .eq('member_id', memberId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings(data as UserSettings);
      } else {
        // Create default settings if none exist
        await createDefaultSettings();
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
      toast({
        title: "Error",
        description: "Failed to load your settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createDefaultSettings = async () => {
    if (!memberId) return;

    try {
      const { error } = await (supabase as any)
        .from('user_settings')
        .insert({
          member_id: memberId,
          push_notifications: true,
          email_updates: true,
          dark_mode: false,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error creating default settings:', error);
    }
  };

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    // Optimistic UI update first
    setSettings(updatedSettings);

    if (!memberId) {
      setPending((prev) => ({ ...(prev || {}), ...newSettings }));
      return updatedSettings;
    }

    try {
      const { error } = await (supabase as any)
        .from('user_settings')
        .upsert(
          {
            member_id: memberId,
            ...updatedSettings,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'member_id', ignoreDuplicates: false }
        );

      if (error) throw error;

      toast({
        title: "Settings Updated",
        description: "Your preferences have been saved.",
      });

      return updatedSettings;
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to save your settings.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    settings,
    loading,
    updateSettings,
  };
}
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
  const [loading, setLoading] = useState(true);

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
    if (!memberId) return;

    try {
      const updatedSettings = { ...settings, ...newSettings };
      
      const { error } = await (supabase as any)
        .from('user_settings')
        .upsert({
          member_id: memberId,
          ...updatedSettings,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setSettings(updatedSettings);
      
      toast({
        title: "Settings Updated",
        description: "Your preferences have been saved successfully.",
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
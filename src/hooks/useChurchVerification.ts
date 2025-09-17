import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ChurchData {
  id: string;
  name: string;
  is_verified: boolean;
  admin_user_id: string;
}

export function useChurchVerification() {
  const { user } = useAuth();
  const [church, setChurch] = useState<ChurchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isChurchAdmin, setIsChurchAdmin] = useState(false);

  useEffect(() => {
    async function checkChurchVerification() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Check if user is an admin via members table role field
        const { data: memberData, error: memberError } = await supabase
          .from('members')
          .select('id, role, church_id, churches(id, name, is_verified, admin_user_id)')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (memberError && memberError.code !== 'PGRST116') {
          console.error('Error checking member admin status:', memberError);
          setLoading(false);
          return;
        }

        if (memberData && memberData.churches) {
          const churchData = memberData.churches as ChurchData;
          setChurch(churchData);
          setIsVerified(churchData.is_verified || false);
          setIsChurchAdmin(true);
        } else {
          // Fallback: check if user created a church (for backward compatibility)
          const { data: churchData, error } = await supabase
            .from('churches')
            .select('id, name, is_verified, admin_user_id')
            .eq('admin_user_id', user.id)
            .maybeSingle();

          if (error && error.code !== 'PGRST116') {
            console.error('Error checking church verification:', error);
            setLoading(false);
            return;
          }

          if (churchData) {
            setChurch(churchData);
            setIsVerified(churchData.is_verified || false);
            setIsChurchAdmin(true);
          }
        }
      } catch (error) {
        console.error('Error in church verification check:', error);
      } finally {
        setLoading(false);
      }
    }

    checkChurchVerification();
  }, [user]);

  return {
    church,
    isVerified,
    loading,
    isChurchAdmin
  };
}
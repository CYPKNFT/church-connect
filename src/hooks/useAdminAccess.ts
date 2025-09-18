import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useMembership } from './useMembership';

interface AdminAccessData {
  isAdmin: boolean;
  loading: boolean;
  church: {
    id: string;
    name: string;
  } | null;
}

export function useAdminAccess(): AdminAccessData {
  const { user } = useAuth();
  const { memberId, churchId, loading: membershipLoading } = useMembership();
  const [state, setState] = useState<AdminAccessData>({
    isAdmin: false,
    loading: true,
    church: null,
  });

  useEffect(() => {
    async function checkAdminAccess() {
      if (!user || !churchId) {
        console.log('[AdminAccess] Missing user or churchId:', { user, churchId });
        setState({ isAdmin: false, loading: false, church: null });
        return;
      }

      try {
        // Check admin access using churches table
        const { data: churchData, error: churchError } = await supabase
          .from('churches')
          .select('id, name, admin_user_id, admin_email')
          .eq('id', churchId)
          .single();

        console.log('[AdminAccess] user.id:', user.id, 'user.email:', user.email, 'churchId:', churchId, 'churchData:', churchData);

        if (churchError || !churchData) {
          console.log('[AdminAccess] Error or missing churchData:', churchError, churchData);
          setState({ isAdmin: false, loading: false, church: null });
          return;
        }

        // Check if current user is admin by user_id or email
        const isAdmin =
          churchData.admin_user_id === user.id ||
          (user.email && churchData.admin_email === user.email);

        console.log('[AdminAccess] isAdmin:', isAdmin);

        setState({
          isAdmin,
          loading: false,
          church: isAdmin ? { id: churchData.id, name: churchData.name } : null,
        });
      } catch (error) {
        console.error('Error in admin access check:', error);
        setState({ isAdmin: false, loading: false, church: null });
      }
    }

    if (!membershipLoading) {
      checkAdminAccess();
    }
  }, [user, churchId, membershipLoading]);

  return {
    ...state,
    loading: state.loading || membershipLoading,
  };
}
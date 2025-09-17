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
      if (!user || !memberId || !churchId) {
        setState({ isAdmin: false, loading: false, church: null });
        return;
      }

      try {
        // Check if user has admin role in members table
        const { data: memberData, error: memberError } = await supabase
          .from('members')
          .select('role')
          .eq('id', memberId)
          .eq('church_id', churchId)
          .maybeSingle();

        if (memberError) {
          console.error('Error checking member role:', memberError);
          setState({ isAdmin: false, loading: false, church: null });
          return;
        }

        const isAdmin = memberData?.role === 'admin';

        // Get church info if admin
        let church = null;
        if (isAdmin) {
          const { data: churchData, error: churchError } = await supabase
            .from('churches')
            .select('id, name')
            .eq('id', churchId)
            .maybeSingle();

          if (!churchError) {
            church = churchData;
          }
        }

        setState({
          isAdmin,
          loading: false,
          church,
        });
      } catch (error) {
        console.error('Error in admin access check:', error);
        setState({ isAdmin: false, loading: false, church: null });
      }
    }

    if (!membershipLoading) {
      checkAdminAccess();
    }
  }, [user, memberId, churchId, membershipLoading]);

  return {
    ...state,
    loading: state.loading || membershipLoading,
  };
}
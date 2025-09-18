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
      console.log('🔍 Admin Access Check:', { user: !!user, memberId, churchId, membershipLoading });
      
      if (!user || !memberId || !churchId) {
        console.log('❌ Missing required data:', { user: !!user, memberId, churchId });
        setState({ isAdmin: false, loading: false, church: null });
        return;
      }

      try {
        console.log('🔎 Checking member role for:', { memberId, churchId });
        
        // Check if user has admin role in members table
        const { data: memberData, error: memberError } = await supabase
          .from('members')
          .select('role')
          .eq('id', memberId)
          .eq('church_id', churchId)
          .maybeSingle();

        console.log('👤 Member data result:', { memberData, memberError });

        if (memberError) {
          console.error('Error checking member role:', memberError);
          setState({ isAdmin: false, loading: false, church: null });
          return;
        }

        const isAdmin = memberData?.role === 'admin';
        console.log('🔑 Admin check result:', { role: memberData?.role, isAdmin });

        // Get church info if admin
        let church = null;
        if (isAdmin) {
          const { data: churchData, error: churchError } = await supabase
            .from('churches')
            .select('id, name')
            .eq('id', churchId)
            .maybeSingle();

          console.log('🏛️ Church data result:', { churchData, churchError });

          if (!churchError) {
            church = churchData;
          }
        }

        console.log('✅ Final admin access result:', { isAdmin, church });
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
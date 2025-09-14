import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface MembershipData {
  memberId: string | null;
  memberName: string | null;
  churchId: string | null;
  churchName: string | null;
  loading: boolean;
}

// Fetches the current user's member record and associated church name
export function useMembership(): MembershipData {
  const { user } = useAuth();
  const [state, setState] = useState<MembershipData>({
    memberId: null,
    memberName: null,
    churchId: null,
    churchName: null,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!user) {
        if (isMounted) setState((s) => ({ ...s, loading: false }));
        return;
      }

      try {
        // Get this user's member record (approved or not – still identify them)
        const { data: member, error: memberErr } = await supabase
          .from("members")
          .select("id, name, church_id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (memberErr) {
          console.warn("useMembership: member fetch error", memberErr);
        }

        let churchName: string | null = null;
        if (member?.church_id) {
          const { data: church, error: churchErr } = await supabase
            .from("Churches")
            .select("id, name")
            .eq("id", member.church_id)
            .maybeSingle();
          if (churchErr) {
            console.warn("useMembership: church fetch error", churchErr);
          }
          churchName = church?.name ?? null;
        }

        if (isMounted) {
          setState({
            memberId: member?.id ?? null,
            memberName: member?.name ?? null,
            churchId: member?.church_id ?? null,
            churchName,
            loading: false,
          });
        }
      } catch (e) {
        console.error("useMembership: unexpected error", e);
        if (isMounted) setState((s) => ({ ...s, loading: false }));
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [user]);

  return state;
}

-- Harden is_church_admin by setting a fixed search_path and SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.is_church_admin(ch uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  select
    exists (select 1 from public.churches c where c.id = ch and c.admin_user_id = auth.uid())
    or exists (
      select 1
      from public.church_roles r
      join public.members m on m.id = r.member_id
      where r.church_id = ch and r.role in ('admin')
        and m.user_id = auth.uid()
    );
$$;
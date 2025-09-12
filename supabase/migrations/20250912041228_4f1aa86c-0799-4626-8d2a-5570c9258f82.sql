-- Optimize indexes for better selectivity
DROP INDEX IF EXISTS idx_churches_verified_id;
CREATE INDEX IF NOT EXISTS idx_churches_id_verified
  ON public."Churches"(id, is_verified);

CREATE INDEX IF NOT EXISTS idx_churches_admin_verified
  ON public."Churches"(admin_user_id, is_verified);

-- Split members into two targeted indexes
DROP INDEX IF EXISTS idx_members_church_user_role_approved;
CREATE INDEX IF NOT EXISTS idx_members_church_user_approved
  ON public.members(church_id, user_id, approved);

-- Fast path for admin role checks (partial index)
CREATE INDEX IF NOT EXISTS idx_members_admin_fast
  ON public.members(church_id, user_id)
  WHERE role = 'admin' AND approved IS TRUE;

-- Enhance RLS policy flexibility - allow creator to delete pre-verification
DROP POLICY IF EXISTS "churches delete admin only" ON public."Churches";
CREATE POLICY "churches delete (admin or creator)"
  ON public."Churches"
  FOR DELETE
  USING (is_church_admin(id) OR is_church_creator(id) OR is_platform_admin());

-- Strengthen data integrity - ensure every church has a creator
ALTER TABLE public."Churches"
  ALTER COLUMN admin_user_id SET NOT NULL;

-- Update functions with better style and security
CREATE OR REPLACE FUNCTION public.is_church_admin(ch uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public."Churches" c
    WHERE c.id = ch
      AND c.is_verified IS TRUE
      AND (
        c.admin_user_id = auth.uid()
        OR EXISTS (
          SELECT 1
          FROM public.members m
          WHERE m.church_id = ch
            AND m.user_id = auth.uid()
            AND m.role = 'admin'
            AND m.approved IS TRUE
        )
      )
  );
$$;

CREATE OR REPLACE FUNCTION public.is_church_member(ch uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.members m
    JOIN public."Churches" c ON c.id = m.church_id
    WHERE m.church_id = ch
      AND m.user_id = auth.uid()
      AND m.approved IS TRUE
      AND c.is_verified IS TRUE
  );
$$;

CREATE OR REPLACE FUNCTION public.is_church_creator(ch uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public."Churches" c
    WHERE c.id = ch AND c.admin_user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.is_platform_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT FALSE; -- Placeholder - implement with roles table or auth metadata
$$;

-- Secure function access pattern - set ownership and grants
ALTER FUNCTION public.is_church_admin(uuid) OWNER TO postgres;
ALTER FUNCTION public.is_church_member(uuid) OWNER TO postgres;
ALTER FUNCTION public.is_church_creator(uuid) OWNER TO postgres;
ALTER FUNCTION public.is_platform_admin() OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.is_church_admin(uuid) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.is_church_member(uuid) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.is_church_creator(uuid) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.is_platform_admin() TO authenticated, anon;
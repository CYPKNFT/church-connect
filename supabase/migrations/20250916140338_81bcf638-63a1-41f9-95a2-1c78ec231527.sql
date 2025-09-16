-- Fix functions that reference a non-existent "public."Churches" table by using the correct public.churches table
-- This resolves errors blocking member lookups and allows user_settings upserts to work

-- is_church_admin
CREATE OR REPLACE FUNCTION public.is_church_admin(ch uuid)
RETURNS boolean
LANGUAGE sql
STABLE
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

-- list_churches_public
CREATE OR REPLACE FUNCTION public.list_churches_public()
RETURNS TABLE(id uuid, name text, city text, state text, slug text, member_count smallint, is_verified boolean)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  select
    c.id, c.name, c.city, c.state, c.slug, c.member_count, c.is_verified
  from public.churches c;
$$;

-- list_churches_member
CREATE OR REPLACE FUNCTION public.list_churches_member()
RETURNS TABLE(id uuid, name text, city text, state text, slug text, member_count smallint, is_verified boolean)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  select id, name, city, state, slug, member_count, is_verified
  from public.churches;
$$;

-- is_church_creator
CREATE OR REPLACE FUNCTION public.is_church_creator(ch uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.churches c
    WHERE c.id = ch AND c.admin_user_id = auth.uid()
  );
$$;

-- member_directory
CREATE OR REPLACE FUNCTION public.member_directory(ch uuid)
RETURNS TABLE(id uuid, name text, email text, church_id uuid)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  -- Preconditions enforced in-query:
  -- 1) Caller must be an approved member of this church
  -- 2) Church must be verified
  -- 3) Only return approved members of this church
  SELECT m.id, m.name, m.email, m.church_id
  FROM public.members       AS m
  JOIN public.members       AS me ON me.user_id = auth.uid()
                                 AND me.church_id = m.church_id
                                 AND me.approved IS TRUE
  JOIN public.churches      AS c  ON c.id = m.church_id
  WHERE m.church_id = ch
    AND m.approved IS TRUE
    AND c.is_verified IS TRUE;
$$;

-- member_directory_for_my_churches
CREATE OR REPLACE FUNCTION public.member_directory_for_my_churches()
RETURNS TABLE(id uuid, name text, email text, church_id uuid)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT m.id, m.name, m.email, m.church_id
  FROM public.members    AS m
  JOIN public.members    AS me ON me.user_id = auth.uid()
                              AND me.church_id = m.church_id
                              AND me.approved IS TRUE
  JOIN public.churches   AS c  ON c.id = m.church_id
  WHERE m.approved IS TRUE
    AND c.is_verified IS TRUE;
$$;
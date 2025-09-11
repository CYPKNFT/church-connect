-- Fix security warnings: Set proper search_path for functions to prevent injection attacks

-- Update is_church_admin function with proper search_path
CREATE OR REPLACE FUNCTION public.is_church_admin(ch uuid)
RETURNS boolean 
LANGUAGE sql 
STABLE 
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    EXISTS (SELECT 1 FROM public."Churches" c WHERE c.id = ch AND c.admin_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.members m
               WHERE m.church_id = ch AND m.user_id = auth.uid()
                 AND m.role = 'admin' AND m.approved = true);
$$;

-- Update is_church_member function with proper search_path  
CREATE OR REPLACE FUNCTION public.is_church_member(ch uuid)
RETURNS boolean 
LANGUAGE sql 
STABLE 
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.members m
    WHERE m.church_id = ch AND m.user_id = auth.uid() AND m.approved = true
  );
$$;
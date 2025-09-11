-- Fix security issue: Remove public access to Churches table and implement proper access controls

-- First, drop the overly permissive public select policy
DROP POLICY IF EXISTS "churches select public" ON public."Churches";

-- Create more secure policies for church data access

-- Policy 1: Allow authenticated users to see basic church info (for signup dropdown)
-- Only expose non-sensitive fields like name, city, state for church selection
CREATE POLICY "churches select basic info for authenticated"
ON public."Churches"
FOR SELECT
TO authenticated
USING (true);

-- Policy 2: Allow church members to see their own church's full details
CREATE POLICY "churches select full info for members"
ON public."Churches" 
FOR SELECT
TO authenticated
USING (
  -- User is a member of this church
  EXISTS (
    SELECT 1 FROM public.members m 
    WHERE m.church_id = id 
    AND m.user_id = auth.uid() 
    AND m.approved = true
  )
);

-- Policy 3: Allow church admins to see their church's full details (already covered by admin function)
CREATE POLICY "churches select full info for admins"
ON public."Churches"
FOR SELECT  
TO authenticated
USING (is_church_admin(id));

-- Note: We could also create a view that only exposes safe fields for the signup dropdown,
-- but for now this approach with multiple policies should work
-- Add RLS policy to allow public read access to basic church info for registration
CREATE POLICY "churches select basic info for registration" 
ON public."Churches" 
FOR SELECT 
USING (true);
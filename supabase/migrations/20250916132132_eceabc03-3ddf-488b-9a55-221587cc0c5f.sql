-- Add RLS policies for user_settings table
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own settings
CREATE POLICY "Users can view their own settings" 
ON public.user_settings 
FOR SELECT 
USING (
  member_id IN (
    SELECT id FROM public.members WHERE user_id = auth.uid()
  )
);

-- Allow users to insert their own settings
CREATE POLICY "Users can insert their own settings" 
ON public.user_settings 
FOR INSERT 
WITH CHECK (
  member_id IN (
    SELECT id FROM public.members WHERE user_id = auth.uid()
  )
);

-- Allow users to update their own settings
CREATE POLICY "Users can update their own settings" 
ON public.user_settings 
FOR UPDATE 
USING (
  member_id IN (
    SELECT id FROM public.members WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  member_id IN (
    SELECT id FROM public.members WHERE user_id = auth.uid()
  )
);
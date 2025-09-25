-- Create storage bucket for item photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'item_photos', 
  'item_photos', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Create RLS policies for item photos bucket
CREATE POLICY "Anyone can view item photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'item_photos');

CREATE POLICY "Authenticated users can upload item photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'item_photos' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own item photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'item_photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own item photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'item_photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create table to store item photo metadata
CREATE TABLE public.item_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID NOT NULL,
  storage_path TEXT NOT NULL,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  sort_order SMALLINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  uploaded_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on item_photos table
ALTER TABLE public.item_photos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for item_photos table
CREATE POLICY "Anyone can view item photos metadata"
ON public.item_photos FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert item photo metadata"
ON public.item_photos FOR INSERT
WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update their own item photo metadata"
ON public.item_photos FOR UPDATE
USING (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete their own item photo metadata"
ON public.item_photos FOR DELETE
USING (auth.uid() = uploaded_by);
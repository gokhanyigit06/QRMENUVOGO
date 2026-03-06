-- ==============================================================================
-- STORAGE BUCKET & POLICIES SETUP
-- This script ensures the 'qrmenu1-images' bucket exists and is publicly accessible.
-- ==============================================================================

-- 1. Create Bucket if not exists (and ensure it is PUBLIC)
INSERT INTO storage.buckets (id, name, public)
VALUES ('qrmenu1-images', 'qrmenu1-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop existing policies to defined fresh ones (Avoid conflicts)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

-- 3. Define Policies

-- Allow ANYONE to view images (Public Read)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'qrmenu1-images' );

-- Allow AUTHENTICATED users to upload images
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'qrmenu1-images' );

-- Allow AUTHENTICATED users to update their images (or all images in bucket for now)
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'qrmenu1-images' );

-- Allow AUTHENTICATED users to delete images
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'qrmenu1-images' );

-- 4. Reload Schema (Good practice)
NOTIFY pgrst, 'reload schema';

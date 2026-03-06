-- Add theme_id to settings table
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS theme_id text DEFAULT 'default';
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS menu_layout text DEFAULT 'accordion';

-- Refresh PostgREST
NOTIFY pgrst, 'reload schema';

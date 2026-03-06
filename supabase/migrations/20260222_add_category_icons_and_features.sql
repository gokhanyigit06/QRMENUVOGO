-- Categories tablosuna eksik alanları ekliyoruz (ikon, vs.)
ALTER TABLE public.categories
    ADD COLUMN IF NOT EXISTS icon text,
    ADD COLUMN IF NOT EXISTS icon_color text DEFAULT '#ffffff',
    ADD COLUMN IF NOT EXISTS icon_size text DEFAULT 'medium',
    ADD COLUMN IF NOT EXISTS segment text DEFAULT 'food',
    ADD COLUMN IF NOT EXISTS visibility_start_time text,
    ADD COLUMN IF NOT EXISTS visibility_end_time text,
    ADD COLUMN IF NOT EXISTS visibility_days integer[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS station_name text DEFAULT 'Mutfak',
    ADD COLUMN IF NOT EXISTS name_en text,
    ADD COLUMN IF NOT EXISTS discount_rate integer;

-- Create analytics tables for hits and interactions
CREATE TABLE IF NOT EXISTS "public"."page_views" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "restaurant_id" uuid REFERENCES "public"."restaurants"(id) ON DELETE CASCADE,
    "created_at" timestamp with time zone DEFAULT now(),
    "user_agent" text,
    "device_type" text -- 'mobile', 'desktop', 'tablet'
);

CREATE TABLE IF NOT EXISTS "public"."product_views" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "restaurant_id" uuid REFERENCES "public"."restaurants"(id) ON DELETE CASCADE,
    "product_id" uuid REFERENCES "public"."products"(id) ON DELETE CASCADE,
    "created_at" timestamp with time zone DEFAULT now()
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_page_views_restaurant_id ON "public"."page_views"(restaurant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_product_views_product_id ON "public"."product_views"(product_id);

-- Enable RLS
ALTER TABLE "public"."page_views" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."product_views" ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone scanning QR counts as hit)
CREATE POLICY "Allow anonymous page view inserts" ON "public"."page_views" FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous product view inserts" ON "public"."product_views" FOR INSERT WITH CHECK (true);

-- Allow admins to read their own analytics
CREATE POLICY "Allow admins to read their own page views" ON "public"."page_views" FOR SELECT USING (true);
CREATE POLICY "Allow admins to read their own product views" ON "public"."product_views" FOR SELECT USING (true);

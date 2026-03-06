-- Add subscription logic and branch logic to restaurants table
ALTER TABLE "public"."restaurants" 
ADD COLUMN IF NOT EXISTS "plan_type" text DEFAULT 'BASIC',
ADD COLUMN IF NOT EXISTS "plan_expires_at" timestamp with time zone,
ADD COLUMN IF NOT EXISTS "parent_id" uuid REFERENCES "public"."restaurants"(id) ON DELETE CASCADE;

-- Default all existing restaurants to PLUS for now (Optional, usually you want BASIC, 
-- but since this is a transition we can assume they are VIP initially to test feature.)
-- UPDATE "public"."restaurants" SET "plan_type" = 'PLUS';

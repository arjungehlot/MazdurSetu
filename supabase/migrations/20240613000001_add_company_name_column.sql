-- Add company_name column to users table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'company_name') THEN
    ALTER TABLE users ADD COLUMN company_name TEXT;
  END IF;
END $$;
-- Add available column to users table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'available') THEN
    ALTER TABLE users ADD COLUMN available BOOLEAN DEFAULT true;
  END IF;
END $$;
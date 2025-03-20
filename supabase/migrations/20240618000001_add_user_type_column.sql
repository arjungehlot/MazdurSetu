-- Add user_type column to users table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'user_type') THEN
    ALTER TABLE users ADD COLUMN user_type TEXT;
  END IF;
END $$;

-- Create index on user_type column
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'users' AND indexname = 'idx_users_user_type') THEN
    CREATE INDEX idx_users_user_type ON users(user_type);
  END IF;
END $$;

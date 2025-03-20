-- Add worker-specific fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS skills TEXT[];
ALTER TABLE users ADD COLUMN IF NOT EXISTS rate TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS description TEXT;

-- Enable realtime for the users table
alter publication supabase_realtime add table users;
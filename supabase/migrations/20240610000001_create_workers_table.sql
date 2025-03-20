-- Create workers table
CREATE TABLE IF NOT EXISTS workers (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  category TEXT,
  skills TEXT[],
  rate TEXT,
  location TEXT,
  description TEXT,
  available BOOLEAN DEFAULT true,
  rating FLOAT DEFAULT 4.5,
  total_ratings INTEGER DEFAULT 0,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES workers(id) NOT NULL,
  employer_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT DEFAULT 'pending',
  date DATE NOT NULL,
  time TIME,
  duration INTEGER DEFAULT 1,
  location TEXT,
  notes TEXT,
  total_amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES workers(id) NOT NULL,
  employer_id UUID REFERENCES auth.users(id) NOT NULL,
  booking_id UUID REFERENCES bookings(id),
  rating INTEGER NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add realtime
alter publication supabase_realtime add table workers;
alter publication supabase_realtime add table bookings;
alter publication supabase_realtime add table reviews;

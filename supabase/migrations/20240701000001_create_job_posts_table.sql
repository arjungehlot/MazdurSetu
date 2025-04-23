-- Create job_posts table
CREATE TABLE IF NOT EXISTS job_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  rate TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_post_id UUID NOT NULL REFERENCES job_posts(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Job posts policies
CREATE POLICY "Employers can create job posts" ON job_posts
  FOR INSERT WITH CHECK (auth.uid() = employer_id);

CREATE POLICY "Employers can update their own job posts" ON job_posts
  FOR UPDATE USING (auth.uid() = employer_id);

CREATE POLICY "Anyone can view active job posts" ON job_posts
  FOR SELECT USING (status = 'active' OR auth.uid() = employer_id);

-- Applications policies
CREATE POLICY "Workers can create applications" ON applications
  FOR INSERT WITH CHECK (auth.uid() = worker_id);

CREATE POLICY "Workers can view their own applications" ON applications
  FOR SELECT USING (auth.uid() = worker_id);

CREATE POLICY "Employers can view applications for their job posts" ON applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM job_posts
      WHERE job_posts.id = applications.job_post_id
      AND job_posts.employer_id = auth.uid()
    )
  );

CREATE POLICY "Employers can update application status" ON applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM job_posts
      WHERE job_posts.id = applications.job_post_id
      AND job_posts.employer_id = auth.uid()
    )
  );
CREATE TABLE public.inscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id text NOT NULL,
  opportunity_title text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  region text,
  notify_email boolean NOT NULL DEFAULT true,
  status text NOT NULL DEFAULT 'recue',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inscriptions TO anon, authenticated;
GRANT ALL ON public.inscriptions TO service_role;
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a registration request"
ON public.inscriptions FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(full_name) BETWEEN 2 AND 120
  AND char_length(email) BETWEEN 5 AND 200
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(opportunity_id) <= 80
  AND status = 'recue'
);
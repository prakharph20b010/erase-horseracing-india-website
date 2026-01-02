-- Create horses table for individual horse memorials
create table if not exists public.horses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  image_url text,
  date_of_birth date,
  date_of_death date,
  cause_of_death text,
  story text not null,
  racetrack_id uuid references public.racetracks(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create racetracks table for the interactive map
create table if not exists public.racetracks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  state text not null,
  latitude numeric(10, 8),
  longitude numeric(11, 8),
  description text,
  total_deaths integer default 0,
  status text check (status in ('active', 'closed')) default 'active',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create blog_posts table for news and updates
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  image_url text,
  published boolean default false,
  published_at timestamp with time zone,
  author text default 'Erase Horseracing India',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create pledges table for advocacy supporters
create table if not exists public.pledges (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  city text,
  message text,
  created_at timestamp with time zone default now()
);

-- Create subscriptions table for newsletter signups
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed boolean default true,
  created_at timestamp with time zone default now()
);

-- Create reports table for incident reports
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_name text,
  reporter_email text not null,
  incident_type text check (incident_type in ('injury', 'death', 'abuse', 'other')) not null,
  racetrack_name text not null,
  incident_date date,
  description text not null,
  evidence_urls text[],
  status text check (status in ('pending', 'reviewing', 'verified', 'dismissed')) default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.horses enable row level security;
alter table public.racetracks enable row level security;
alter table public.blog_posts enable row level security;
alter table public.pledges enable row level security;
alter table public.subscriptions enable row level security;
alter table public.reports enable row level security;

-- Public read access for horses, racetracks, and published blog posts
create policy "horses_public_read"
  on public.horses for select
  using (true);

create policy "racetracks_public_read"
  on public.racetracks for select
  using (true);

create policy "blog_posts_public_read"
  on public.blog_posts for select
  using (published = true);

-- Allow public to submit pledges, subscriptions, and reports
create policy "pledges_public_insert"
  on public.pledges for insert
  with check (true);

create policy "subscriptions_public_insert"
  on public.subscriptions for insert
  with check (true);

create policy "reports_public_insert"
  on public.reports for insert
  with check (true);

-- Create indexes for better performance
create index idx_horses_slug on public.horses(slug);
create index idx_blog_posts_slug on public.blog_posts(slug);
create index idx_racetracks_state on public.racetracks(state);
create index idx_blog_posts_published on public.blog_posts(published, published_at desc);

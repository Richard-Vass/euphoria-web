-- ============================================
-- Euphoria Night Club — Admin Tables Migration
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- TABLE: events
-- ============================================
create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  date date not null,
  dj text,
  type text not null default 'DJ Night',
  description text,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Index for date sorting
create index if not exists idx_events_date on events(date desc);

-- RLS
alter table events enable row level security;

-- Public can read active events
create policy "Public can read active events"
  on events for select
  using (is_active = true);

-- Public can also insert/update/delete (admin uses anon key with PIN protection)
create policy "Public can manage events"
  on events for all
  using (true)
  with check (true);

-- ============================================
-- TABLE: gallery
-- ============================================
create table if not exists gallery (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  alt text,
  category text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Index for sort order
create index if not exists idx_gallery_sort on gallery(sort_order asc);

-- RLS
alter table gallery enable row level security;

-- Public can read gallery
create policy "Public can read gallery"
  on gallery for select
  using (true);

-- Public can manage gallery (admin uses anon key with PIN protection)
create policy "Public can manage gallery"
  on gallery for all
  using (true)
  with check (true);

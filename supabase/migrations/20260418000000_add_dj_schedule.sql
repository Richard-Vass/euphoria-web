-- Euphoria — DJ Schedule schéma
-- Vytvorené: 18.4.2026
-- NEAPLIKOVANÉ na live DB — len lokálny súbor, apply po reviewe.

create table if not exists public.dj_schedule (
  id uuid primary key default gen_random_uuid(),
  day text not null check (day in ('monday','tuesday','wednesday','thursday','friday','saturday','sunday')),
  dj_name text not null,
  genre text,
  start_time time not null,
  end_time time not null,
  is_resident boolean default false,
  -- Ak je hosť a platí len v rozsahu dátumov:
  active_from date,
  active_to date,
  image_url text,
  bio text,
  social_instagram text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_dj_schedule_day on public.dj_schedule(day);

drop trigger if exists trg_dj_schedule_updated_at on public.dj_schedule;
create trigger trg_dj_schedule_updated_at
  before update on public.dj_schedule
  for each row execute function public.set_updated_at();

-- RLS — public môže čítať, len admin môže upravovať
alter table public.dj_schedule enable row level security;

drop policy if exists "public_read_dj_schedule" on public.dj_schedule;
create policy "public_read_dj_schedule" on public.dj_schedule
  for select using (true);

-- Seed — 3 DJ rezidenti ako placeholder (upraviť v admine)
insert into public.dj_schedule (day, dj_name, genre, start_time, end_time, is_resident)
values
  ('friday', 'DJ Shadow', 'House / Deep', '22:00', '04:00', true),
  ('saturday', 'DJ Nova', 'Tech / Electro', '22:00', '06:00', true),
  ('saturday', 'DJ Elite', 'R&B / Urban', '00:00', '04:00', false)
on conflict do nothing;

-- Apply:
-- https://supabase.com/dashboard/project/szuarwlwkbcqfigqdaby/sql/new
-- alebo: npx supabase db push (po linku)

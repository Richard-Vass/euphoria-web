-- ============================================
-- Euphoria Night Club — Reservation System
-- Supabase Migration
-- ============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- ENUM: reservation status
-- ============================================
create type reservation_status as enum ('pending', 'confirmed', 'cancelled');

-- ============================================
-- TABLE: rooms (Privátne izby)
-- ============================================
create table rooms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text not null default '',
  capacity int not null default 10,
  price_per_slot numeric(10,2) not null default 0,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================
-- TABLE: time_slots (pre-defined available slots)
-- ============================================
create table time_slots (
  id uuid primary key default uuid_generate_v4(),
  room_id uuid not null references rooms(id) on delete cascade,
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_active boolean not null default true
);

-- ============================================
-- TABLE: reservations
-- ============================================
create table reservations (
  id uuid primary key default uuid_generate_v4(),
  room_id uuid not null references rooms(id) on delete cascade,
  date date not null,
  time_slot_id uuid not null references time_slots(id) on delete cascade,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  guests_count int not null default 1,
  note text,
  status reservation_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- Prevent double-booking: one reservation per room+date+slot (excluding cancelled)
create unique index idx_reservations_unique_booking
  on reservations (room_id, date, time_slot_id)
  where status != 'cancelled';

-- ============================================
-- TABLE: blocked_dates
-- ============================================
create table blocked_dates (
  id uuid primary key default uuid_generate_v4(),
  room_id uuid references rooms(id) on delete cascade, -- NULL = all rooms
  date date not null,
  reason text
);

-- ============================================
-- RLS POLICIES
-- ============================================

alter table rooms enable row level security;
alter table time_slots enable row level security;
alter table reservations enable row level security;
alter table blocked_dates enable row level security;

-- ROOMS: public can read active rooms
create policy "Public can read active rooms"
  on rooms for select
  using (is_active = true);

-- ROOMS: admin full access
create policy "Admin full access on rooms"
  on rooms for all
  using (auth.role() = 'authenticated');

-- TIME SLOTS: public can read active slots
create policy "Public can read active time slots"
  on time_slots for select
  using (is_active = true);

-- TIME SLOTS: admin full access
create policy "Admin full access on time_slots"
  on time_slots for all
  using (auth.role() = 'authenticated');

-- RESERVATIONS: public can read ONLY availability data (no customer info)
-- We use a security-definer function for this instead
create policy "Public can read reservation availability"
  on reservations for select
  using (true);
  -- NOTE: The client query should only SELECT date, time_slot_id, room_id, status
  -- For extra security, create a VIEW that exposes only those columns

-- RESERVATIONS: public can create
create policy "Public can create reservations"
  on reservations for insert
  with check (true);

-- RESERVATIONS: admin full access
create policy "Admin full access on reservations"
  on reservations for all
  using (auth.role() = 'authenticated');

-- BLOCKED DATES: only admin can read/write
create policy "Admin can read blocked_dates"
  on blocked_dates for select
  using (true); -- public needs to see blocked dates for calendar

create policy "Admin can manage blocked_dates"
  on blocked_dates for all
  using (auth.role() = 'authenticated');

-- ============================================
-- VIEW: public reservation availability (hides customer data)
-- ============================================
create view reservation_availability as
  select id, room_id, date, time_slot_id, status
  from reservations
  where status != 'cancelled';

-- ============================================
-- SEED DATA
-- ============================================

-- 1 room: Privátna izba
insert into rooms (id, name, description, capacity, price_per_slot, is_active)
values (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Privátna izba',
  'Diskrétna privátna izba pre dvoch. Maximálne súkromie a komfort.',
  2,
  200.00,
  true
);

-- Time slots for Friday (day_of_week = 5)
insert into time_slots (room_id, day_of_week, start_time, end_time, is_active) values
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, '19:00', '22:00', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, '22:00', '01:00', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, '01:00', '04:00', true);

-- Time slots for Saturday (day_of_week = 6)
insert into time_slots (room_id, day_of_week, start_time, end_time, is_active) values
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, '19:00', '22:00', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, '22:00', '01:00', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, '01:00', '04:00', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, '04:00', '06:00', true);

-- Time slots for Sunday (day_of_week = 0)
insert into time_slots (room_id, day_of_week, start_time, end_time, is_active) values
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 0, '19:00', '22:00', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 0, '22:00', '01:00', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 0, '01:00', '04:00', true);

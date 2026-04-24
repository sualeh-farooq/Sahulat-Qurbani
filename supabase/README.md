# Supabase — Sahulat Qurbani

Use the **Supabase Dashboard → SQL Editor** to run the statements below.  
This file contains **table creation** and **indexes** only. For triggers (order numbers), status history logging, RLS policies, and seed data, see [IMPLEMENTATION_BLUEPRINT.md](../IMPLEMENTATION_BLUEPRINT.md) or add a full migration later.

---

## Extensions (run once)

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

---

## 1. `admin_users`

```sql
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users (email);
```

---

## 2. `orders`

```sql
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,

  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  alternate_phone TEXT,
  address TEXT NOT NULL,
  area TEXT NOT NULL,

  payment_mode TEXT NOT NULL,
  qurbani_purpose TEXT NOT NULL,
  qurbani_day TEXT NOT NULL,
  maslak TEXT NOT NULL,
  meat_option TEXT NOT NULL,
  hide_donation_agreed BOOLEAN NOT NULL DEFAULT false,

  status TEXT NOT NULL DEFAULT 'pending',

  grand_total NUMERIC(10, 2) NOT NULL,
  amount_paid NUMERIC(10, 2) NOT NULL DEFAULT 0,
  payment_date TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  admin_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders (email);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON public.orders (phone);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders (order_number);
```

**Suggested `CHECK` constraints** (optional; align with your app enums):

```sql
ALTER TABLE public.orders
  ADD CONSTRAINT orders_payment_mode_check
    CHECK (payment_mode IN ('Online Transfer', 'Cash Payment'));

ALTER TABLE public.orders
  ADD CONSTRAINT orders_qurbani_purpose_check
    CHECK (qurbani_purpose IN ('For Myself', 'For Donation ( Waqf )'));

ALTER TABLE public.orders
  ADD CONSTRAINT orders_qurbani_day_check
    CHECK (qurbani_day IN ('Day 01', 'Day 02', 'Day 03'));

ALTER TABLE public.orders
  ADD CONSTRAINT orders_maslak_check
    CHECK (maslak IN ('Fiqah Hanfiya', 'Fiqah Jafriya'));

ALTER TABLE public.orders
  ADD CONSTRAINT orders_meat_option_check
    CHECK (meat_option IN ('Self Pickup', 'Delivery'));

ALTER TABLE public.orders
  ADD CONSTRAINT orders_status_check
    CHECK (status IN ('pending', 'confirmed', 'payment_received', 'in_progress', 'completed', 'cancelled'));
```

---

## 3. `order_items`

```sql
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders (id) ON DELETE CASCADE,

  item_type TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price_per_unit NUMERIC(10, 2) NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  names TEXT NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items (order_id);
```

**Optional item type check:**

```sql
ALTER TABLE public.order_items
  ADD CONSTRAINT order_items_item_type_check
    CHECK (item_type IN ('Camel', 'Cow Share', 'Full Cow', 'Cow Waqf Hissa'));
```

---

## 4. `order_status_history`

```sql
CREATE TABLE IF NOT EXISTS public.order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders (id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  changed_by TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON public.order_status_history (order_id);
```

---

## Environment (Next.js)

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only; never expose to the client)

For the admin mock session (until Supabase Auth is wired), set:

- `ADMIN_SESSION_SECRET` (long random string in production)

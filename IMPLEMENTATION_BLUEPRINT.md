# Sahulat-Qurbani Admin Panel Development Plan

## Project Overview

This plan outlines the development of a comprehensive admin panel for the Sahulat-Qurbani Next.js website. The system will transition from email-only order management to a full-featured database-backed admin dashboard using Supabase.

## Phase 1: Supabase Setup & Database Schema

### 1.1 Supabase Configuration

**Install Dependencies:**

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

**Environment Variables** (add to `.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 1.2 Database Schema & SQL Commands

Execute these SQL commands in Supabase SQL Editor:

**Table 1: `admin_users` (for authentication)**

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert mock admin user (password: admin123)
-- Note: In production, use proper password hashing
INSERT INTO admin_users (email, password_hash, name) 
VALUES ('admin@sahulat-qurbani.com', '$2a$10$mockhashedpassword', 'Admin User');

-- Index for faster queries
CREATE INDEX idx_admin_email ON admin_users(email);
```

**Table 2: `orders` (main orders table)**

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  
  -- Customer Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  alternate_phone TEXT,
  address TEXT NOT NULL,
  area TEXT NOT NULL,
  
  -- Order Details
  payment_mode TEXT NOT NULL CHECK (payment_mode IN ('Online Transfer', 'Cash Payment')),
  qurbani_purpose TEXT NOT NULL CHECK (qurbani_purpose IN ('For Myself', 'For Donation ( Waqf )')),
  qurbani_day TEXT NOT NULL CHECK (qurbani_day IN ('Day 01', 'Day 02', 'Day 03')),
  maslak TEXT NOT NULL CHECK (maslak IN ('Fiqah Hanfiya', 'Fiqah Jafriya')),
  meat_option TEXT NOT NULL CHECK (meat_option IN ('Self Pickup', 'Delivery')),
  hide_donation_agreed BOOLEAN DEFAULT false,
  
  -- Order Status & Tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'payment_received', 'in_progress', 'completed', 'cancelled')),
  
  -- Financial Information
  grand_total NUMERIC(10, 2) NOT NULL,
  amount_paid NUMERIC(10, 2) DEFAULT 0,
  payment_date TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Admin Notes
  admin_notes TEXT
);

-- Auto-generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'SQ-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE order_number_seq START 1;

CREATE TRIGGER set_order_number
BEFORE INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION generate_order_number();

-- Indexes for performance
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_phone ON orders(phone);
CREATE INDEX idx_orders_order_number ON orders(order_number);
```

**Table 3: `order_items` (line items for each order)**

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  
  -- Item Details
  item_type TEXT NOT NULL CHECK (item_type IN ('Camel', 'Cow Share', 'Full Cow', 'Cow Waqf Hissa')),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_per_unit NUMERIC(10, 2) NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  
  -- Names for Qurbani
  names TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for foreign key
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

**Table 4: `order_status_history` (track status changes)**

```sql
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  changed_by TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger to log status changes
CREATE OR REPLACE FUNCTION log_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO order_status_history (order_id, status, changed_by, notes)
    VALUES (NEW.id, NEW.status, 'admin', 'Status changed from ' || OLD.status || ' to ' || NEW.status);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_status_changes
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION log_status_change();

CREATE INDEX idx_status_history_order_id ON order_status_history(order_id);
```

**Enable Row Level Security (RLS):**

```sql
-- Enable RLS on all tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Admin can do everything
CREATE POLICY "Admin full access to orders" ON orders
  FOR ALL USING (true);

CREATE POLICY "Admin full access to order_items" ON order_items
  FOR ALL USING (true);

CREATE POLICY "Admin full access to status_history" ON order_status_history
  FOR ALL USING (true);

CREATE POLICY "Admin can read admin_users" ON admin_users
  FOR SELECT USING (true);
```

### 1.3 Pricing Constants (reference)

Based on the current form:
- Camel Hissa: Rs. 48,000
- Cow Share: Rs. 25,500
- Full Cow: Rs. 178,500
- Cow Waqf Hissa: Rs. 19,000
- Delivery Charge: Rs. 2,500 per hissa

---

## Phase 2: Authentication System

### 2.1 Create Supabase Client Utilities

**File:** `src/lib/supabase/client.js`
- Initialize Supabase client for client-side operations
- Export reusable client instance

**File:** `src/lib/supabase/server.js`
- Initialize Supabase client for server-side/API operations
- Use service role key for admin operations

### 2.2 Authentication API Routes

**File:** `src/pages/api/auth/login.js`
- Accept email & password
- **Mock authentication:** Check against hardcoded credentials initially
- Set secure HTTP-only cookie with JWT token
- Return success/error response

**File:** `src/pages/api/auth/logout.js`
- Clear authentication cookie
- Return success response

**File:** `src/pages/api/auth/verify.js`
- Verify authentication token from cookie
- Return user session data

### 2.3 Login Page UI

**File:** `src/pages/admin/login.jsx`

**Features:**
- Clean, centered login form with Sahulat-Qurbani branding
- Email and password fields
- "Remember me" checkbox (optional)
- Form validation with error messages
- Loading state during authentication
- Redirect to `/admin/dashboard` on success
- **Mobile responsive** with Bootstrap 5 grid
- Use existing Bootstrap + reactstrap styling for consistency

**Mock Credentials for Testing:**
- Email: `admin@sahulat-qurbani.com`
- Password: `admin123`

---

## Phase 3: Admin Dashboard Layout

### 3.1 Protected Route Wrapper

**File:** `src/components/admin/ProtectedRoute.jsx`
- Check authentication status on mount
- Redirect to `/admin/login` if not authenticated
- Show loading spinner during verification
- Wrap all admin pages with this component

### 3.2 Admin Layout Component

**File:** `src/components/admin/AdminLayout.jsx`

**Features:**
- **Responsive sidebar navigation:**
  - Dashboard (overview stats)
  - Orders (order list)
  - Logout button
- **Mobile hamburger menu** for sidebar toggle
- **Top header bar** with:
  - Site logo/title
  - Admin user name
  - Logout icon
- **Main content area** with proper spacing
- Use Bootstrap 5 classes for responsiveness
- Sticky sidebar on desktop, collapsible on mobile

**Sidebar Menu Items:**
1. Dashboard (icon: chart/stats)
2. Orders (icon: list/table)
3. Logout (icon: sign-out)

### 3.3 Dashboard Statistics Page

**File:** `src/pages/admin/dashboard.jsx`

**Layout (Mobile Responsive):**

**Top Statistics Cards (4 cards in a row on desktop, stack on mobile):**
- Total Orders (count)
- Pending Orders (count with badge)
- Completed Orders (count with badge)
- Total Income (formatted currency)

**Additional Metrics:**
- Payment Received Count
- Payment Pending Count
- Orders by Status (visual breakdown)

**Recent Orders Table:**
- Last 5-10 orders
- Columns: Order Number, Customer Name, Grand Total, Status, Date
- Link to view full order details

**Charts (optional, Phase 4 enhancement):**
- Orders by day chart
- Revenue trend

**API Integration:**
- Fetch stats from `/api/admin/stats` endpoint
- Mock data fallback if API fails

---

## Phase 4: Orders Management

### 4.1 Orders List Page

**File:** `src/pages/admin/orders/index.jsx`

**Features:**

**Filters & Search Bar:**
- Search by: Order Number, Customer Name, Email, Phone
- Filter by Status: All, Pending, Confirmed, Payment Received, In Progress, Completed, Cancelled
- Filter by Date Range (optional)
- Filter by Payment Mode, Qurbani Day, Area

**Data Table (Responsive):**
- **Columns:**
  - Order Number (clickable → view order)
  - Customer Name
  - Phone
  - Grand Total
  - Status (with color badge)
  - Order Date
  - Actions (View, Change Status buttons)

**Mobile View:**
- Table converts to card layout on small screens
- Each order as a collapsible card showing key info

**Pagination:**
- 20 orders per page
- Previous/Next buttons
- Page number display

**Bulk Actions (future enhancement):**
- Select multiple orders
- Bulk status update

**API Integration:**
- Fetch from `/api/admin/orders` with query params
- Mock data fallback

### 4.2 Order Detail/View Page

**File:** `src/pages/admin/orders/[id].jsx`

**Sections:**

**1. Order Header:**
- Order Number (large, prominent)
- Order Date
- Current Status with color badge
- Quick action buttons: Change Status, Download Receipt

**2. Customer Information Card:**
- Name, Email, Phone, Alternate Phone
- Address, Area
- Payment Mode
- Maslak, Meat Option, Qurbani Day, Qurbani Purpose

**3. Order Items Table:**
- Item Type, Quantity, Price per Unit, Names, Subtotal
- Show all line items

**4. Financial Summary:**
- Subtotal
- Delivery Charges (if applicable)
- Grand Total
- Amount Paid
- Balance Due

**5. Status History Timeline:**
- Visual timeline of status changes
- Date, Status, Changed By, Notes

**6. Admin Actions Section:**
- **Change Status Dropdown:**
  - Select new status
  - Add notes (textarea)
  - Save button
- **Mark Payment Received:**
  - Enter amount
  - Payment date picker
  - Save button
- **Admin Notes:**
  - Textarea for internal notes
  - Save button

**7. Download Receipt Button:**
- Generate PDF receipt
- Includes order details, customer info, items, totals, current status

**Mobile Responsive:**
- All cards stack vertically
- Tables convert to responsive format

**API Integration:**
- Fetch order: `GET /api/admin/orders/[id]`
- Update status: `POST /api/admin/orders/[id]/status`
- Update payment: `POST /api/admin/orders/[id]/payment`
- Mock data fallback

### 4.3 Receipt/Invoice Generation

**File:** `src/lib/generateReceipt.js`

**Approach:**
- Use `jsPDF` library for PDF generation
- Include Sahulat-Qurbani logo/branding
- Format order details professionally
- Include current order status
- Downloadable filename: `SQ-Receipt-[OrderNumber].pdf`

**Install:**
```bash
npm install jspdf jspdf-autotable
```

**Receipt Contents:**
- Header: Logo, Company Name, Contact Info
- Order Number, Date, Status
- Customer Details
- Itemized list of order items
- Financial summary
- Footer: Thank you message, terms

---

## Phase 5: API Routes with Mock Data Fallback

### 5.1 Orders API

**File:** `src/pages/api/admin/orders/index.js`

**GET Request:**
- Query params: `search`, `status`, `page`, `limit`
- Fetch orders from Supabase
- **Mock fallback:** Return array of sample orders if Supabase fails
- Return: `{ orders: [], total: 0, page: 1, totalPages: 1 }`

**POST Request (Add Order):**
- Accept order data from admin panel
- Validate all fields
- Insert into Supabase
- Send confirmation email
- **Mock fallback:** Return success with fake UUID

### 5.2 Single Order API

**File:** `src/pages/api/admin/orders/[id].js`

**GET Request:**
- Fetch order by ID with items and status history
- **Mock fallback:** Return sample order object

**PUT Request:**
- Update order details
- **Mock fallback:** Return success

### 5.3 Order Status API

**File:** `src/pages/api/admin/orders/[id]/status.js`

**POST Request:**
- Update order status
- Log to status history
- Optional: Send email notification to customer
- **Mock fallback:** Return success

### 5.4 Dashboard Stats API

**File:** `src/pages/api/admin/stats.js`

**GET Request:**
- Calculate:
  - Total orders count
  - Count by status
  - Total income (sum of grand_total where status = 'completed' or 'payment_received')
  - Recent orders
- **Mock fallback:** Return sample stats object

```javascript
// Mock stats example
{
  totalOrders: 156,
  pendingOrders: 23,
  confirmedOrders: 45,
  completedOrders: 78,
  cancelledOrders: 10,
  totalIncome: 4250000,
  paymentReceived: 3800000,
  paymentPending: 450000,
  ordersByStatus: { pending: 23, confirmed: 45, ... },
  recentOrders: [...]
}
```

### 5.5 Create Order API (from public form)

**File:** Update `src/pages/api/sendQurbani.js`

**Modifications:**
- **Primary:** Send email (existing functionality)
- **New:** Save order to Supabase database
  - Parse all form fields
  - Insert into `orders` table
  - Insert items into `order_items` table
  - Generate order number
- **Mock fallback:** If Supabase insert fails, still send email and return success
- Return order number to user

**Fallback Strategy:**
- Wrap Supabase operations in try-catch
- Log errors
- Ensure email still sends even if DB insert fails
- Don't block user from completing booking

---

## Phase 6: Frontend Integration & UI Components

### 6.1 Shared Components

**File:** `src/components/admin/StatusBadge.jsx`
- Display status with color coding
- Props: `status`
- Colors:
  - Pending: yellow/warning
  - Confirmed: blue/info
  - Payment Received: teal
  - In Progress: purple
  - Completed: green/success
  - Cancelled: red/danger

**File:** `src/components/admin/LoadingSpinner.jsx`
- Reusable loading indicator
- Use Bootstrap spinner

**File:** `src/components/admin/StatCard.jsx`
- Dashboard statistics card
- Props: `title`, `value`, `icon`, `color`
- Mobile responsive

**File:** `src/components/admin/OrdersTable.jsx`
- Reusable orders table
- Props: `orders`, `onViewOrder`, `onChangeStatus`
- Mobile responsive (converts to cards)

**File:** `src/components/admin/FilterBar.jsx`
- Search and filter controls
- Props: `onSearch`, `onFilterStatus`, etc.
- Mobile responsive

### 6.2 Styling Approach

- Use existing **Bootstrap 5** classes
- Leverage **reactstrap** components where applicable
- Create custom SCSS in `public/assets/scss/admin.scss` for admin-specific styles
- Import in admin pages
- Ensure mobile responsiveness at all breakpoints: xs, sm, md, lg, xl

### 6.3 Mock Data Files

**File:** `src/lib/mockData/orders.js`
- Export array of sample orders
- Include all fields matching DB schema
- Various statuses, dates, items

**File:** `src/lib/mockData/stats.js`
- Export sample statistics object

**Usage:**
- Import in API routes and components
- Use as fallback when API fails
- Enable development without Supabase setup

---

## Phase 7: Testing & Refinement

### 7.1 Testing Checklist

**Authentication:**
- [ ] Login with correct credentials works
- [ ] Login with incorrect credentials shows error
- [ ] Logout clears session and redirects
- [ ] Protected routes redirect unauthenticated users

**Dashboard:**
- [ ] Statistics load correctly (or show mock data)
- [ ] Recent orders display
- [ ] Cards are mobile responsive

**Orders Page:**
- [ ] Orders list loads with pagination
- [ ] Search filters work
- [ ] Status filters work
- [ ] View order redirects to detail page
- [ ] Mobile view shows card layout

**Order Detail Page:**
- [ ] Order details load completely
- [ ] Status change updates correctly
- [ ] Payment update works
- [ ] Admin notes save
- [ ] Receipt download generates PDF
- [ ] Mobile view is readable

**Public Form Integration:**
- [ ] Form submission creates order in DB
- [ ] Email still sends
- [ ] Fallback works if DB fails

**Mobile Responsiveness:**
- [ ] Test on mobile devices (< 768px width)
- [ ] Sidebar collapses properly
- [ ] Tables convert to cards
- [ ] All forms are usable on mobile

### 7.2 Error Handling

- Display user-friendly error messages
- Log errors to console for debugging
- Fallback to mock data gracefully
- Show toast notifications for success/error actions

---

## Phase 8: Deployment & Documentation

### 8.1 Environment Setup

**Production `.env.local`:**
```
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key
smtpuser=your_smtp_email
smtppass=your_smtp_password
yourEmail=admin@sahulat-qurbani.com
```

### 8.2 Documentation

Create `ADMIN_PANEL_README.md`:

**Sections:**
1. Admin Panel Overview
2. Login Credentials (for admin)
3. How to Access Dashboard
4. Managing Orders
5. Changing Order Status
6. Downloading Receipts
7. Troubleshooting
8. Database Schema Reference

### 8.3 Future Enhancements (Post-MVP)

- Email notifications to customers on status change
- SMS notifications integration
- Advanced analytics dashboard with charts
- Export orders to Excel/CSV
- Multi-admin support with roles
- Customer portal (order tracking by order number)
- Supabase realtime subscriptions for live updates
- Payment gateway integration
- Inventory management for animals

---

## Implementation Order Summary

1. **Phase 1:** Set up Supabase, create tables, run SQL
2. **Phase 2:** Build login page and auth APIs (with mock)
3. **Phase 3:** Create admin layout, dashboard with stats
4. **Phase 4:** Build orders list and detail pages
5. **Phase 5:** Implement all API routes with mock fallbacks
6. **Phase 6:** Polish UI, ensure mobile responsiveness
7. **Phase 7:** Test thoroughly on desktop and mobile
8. **Phase 8:** Deploy and document

---

## File Structure Overview

```
d:\Sahulat-Qurbani\
├── src\
│   ├── pages\
│   │   ├── admin\
│   │   │   ├── login.jsx (Phase 2)
│   │   │   ├── dashboard.jsx (Phase 3)
│   │   │   └── orders\
│   │   │       ├── index.jsx (Phase 4)
│   │   │       └── [id].jsx (Phase 4)
│   │   └── api\
│   │       ├── auth\
│   │       │   ├── login.js (Phase 2)
│   │       │   ├── logout.js (Phase 2)
│   │       │   └── verify.js (Phase 2)
│   │       └── admin\
│   │           ├── stats.js (Phase 5)
│   │           └── orders\
│   │               ├── index.js (Phase 5)
│   │               └── [id]\
│   │                   ├── index.js (Phase 5)
│   │                   └── status.js (Phase 5)
│   ├── components\
│   │   └── admin\
│   │       ├── ProtectedRoute.jsx (Phase 3)
│   │       ├── AdminLayout.jsx (Phase 3)
│   │       ├── StatusBadge.jsx (Phase 6)
│   │       ├── LoadingSpinner.jsx (Phase 6)
│   │       ├── StatCard.jsx (Phase 6)
│   │       ├── OrdersTable.jsx (Phase 6)
│   │       └── FilterBar.jsx (Phase 6)
│   └── lib\
│       ├── supabase\
│       │   ├── client.js (Phase 2)
│       │   └── server.js (Phase 2)
│       ├── mockData\
│       │   ├── orders.js (Phase 6)
│       │   └── stats.js (Phase 6)
│       └── generateReceipt.js (Phase 4)
├── public\
│   └── assets\
│       └── scss\
│           └── admin.scss (Phase 6)
└── ADMIN_PANEL_README.md (Phase 8)
```

---

## Key Technologies

- **Frontend:** Next.js 13, React 18, Bootstrap 5, reactstrap
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Custom JWT with HTTP-only cookies (mock initially)
- **PDF Generation:** jsPDF, jspdf-autotable
- **Email:** Nodemailer (existing)
- **State Management:** React useState/useEffect
- **Styling:** SCSS, Bootstrap 5

---

## Notes

- All admin routes will be under `/admin/*`
- Public-facing website remains unchanged
- Existing form at `src/contact/qurbani.jsx` will be updated to save to database
- Mock data ensures development can continue even without Supabase setup
- Mobile responsiveness is prioritized throughout

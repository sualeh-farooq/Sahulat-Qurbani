# Sahulat-Qurbani Admin Panel - Vibe Coding Checklist

Complete breakdown of all tasks organized by phase with detailed checklists for efficient implementation.

---

## 📋 PHASE 1: Supabase Setup & Database Schema

### Task 1.1: Initial Supabase Project Setup
- [ ] Create new Supabase project at https://supabase.com
- [ ] Copy project URL and API keys
- [ ] Install Supabase dependencies
  ```bash
  npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
  ```
- [ ] Create `.env.local` file in project root
- [ ] Add environment variables:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  ```
- [ ] Add `.env.local` to `.gitignore` (if not already)

### Task 1.2: Create Database Tables
- [ ] Open Supabase SQL Editor
- [ ] Execute SQL for `admin_users` table
  - [ ] Create table with all fields
  - [ ] Add index on email
  - [ ] Insert mock admin user
- [ ] Execute SQL for `orders` table
  - [ ] Create table with all fields and constraints
  - [ ] Create order number sequence
  - [ ] Create order number generation function
  - [ ] Create trigger for auto-generating order numbers
  - [ ] Add all indexes (status, created_at, email, phone, order_number)
- [ ] Execute SQL for `order_items` table
  - [ ] Create table with foreign key to orders
  - [ ] Add index on order_id
- [ ] Execute SQL for `order_status_history` table
  - [ ] Create table with foreign key to orders
  - [ ] Create status change logging function
  - [ ] Create trigger for tracking status changes
  - [ ] Add index on order_id

### Task 1.3: Configure Row Level Security
- [ ] Enable RLS on `orders` table
- [ ] Enable RLS on `order_items` table
- [ ] Enable RLS on `order_status_history` table
- [ ] Enable RLS on `admin_users` table
- [ ] Create policy "Admin full access to orders"
- [ ] Create policy "Admin full access to order_items"
- [ ] Create policy "Admin full access to status_history"
- [ ] Create policy "Admin can read admin_users"

### Task 1.4: Verify Database Setup
- [ ] Test database tables exist in Supabase dashboard
- [ ] Verify all indexes are created
- [ ] Verify triggers are active
- [ ] Test inserting a sample order manually
- [ ] Verify order number auto-generation works

---

## 🔐 PHASE 2: Authentication System

### Task 2.1: Create Supabase Client Utilities
- [ ] Create folder `src/lib/supabase/`
- [ ] Create `src/lib/supabase/client.js`
  - [ ] Import createClient from @supabase/supabase-js
  - [ ] Initialize client with public keys
  - [ ] Export supabase client instance
- [ ] Create `src/lib/supabase/server.js`
  - [ ] Import createClient
  - [ ] Initialize client with service role key
  - [ ] Export server supabase instance
- [ ] Test imports work correctly

### Task 2.2: Build Authentication API Routes
- [ ] Create folder `src/pages/api/auth/`
- [ ] Create `src/pages/api/auth/login.js`
  - [ ] Accept POST request with email and password
  - [ ] Implement mock authentication check (hardcoded credentials)
    - Email: `admin@sahulat-qurbani.com`
    - Password: `admin123`
  - [ ] Generate simple JWT token (or mock token)
  - [ ] Set HTTP-only cookie with token
  - [ ] Return success response with user data
  - [ ] Return error for invalid credentials
- [ ] Create `src/pages/api/auth/logout.js`
  - [ ] Accept POST request
  - [ ] Clear authentication cookie
  - [ ] Return success response
- [ ] Create `src/pages/api/auth/verify.js`
  - [ ] Accept GET request
  - [ ] Read authentication cookie
  - [ ] Verify token validity
  - [ ] Return user session data or error
- [ ] Test all API routes with Postman or similar tool

### Task 2.3: Build Login Page UI
- [ ] Create folder `src/pages/admin/`
- [ ] Create `src/pages/admin/login.jsx`
  - [ ] Import necessary React hooks (useState)
  - [ ] Import reactstrap components (Form, FormGroup, Input, Button, Alert)
  - [ ] Create component with state for email, password, error, loading
  - [ ] Design centered login form
    - [ ] Add Sahulat-Qurbani logo/branding
    - [ ] Email input field with validation
    - [ ] Password input field with validation
    - [ ] Optional "Remember me" checkbox
    - [ ] Submit button with loading state
  - [ ] Implement handleSubmit function
    - [ ] Validate inputs
    - [ ] Call `/api/auth/login` API
    - [ ] Handle success (redirect to /admin/dashboard)
    - [ ] Handle errors (show error message)
  - [ ] Add responsive styling with Bootstrap classes
  - [ ] Test on mobile and desktop views
- [ ] Test login flow with correct credentials
- [ ] Test login flow with incorrect credentials
- [ ] Verify redirect to dashboard works

---

## 🎨 PHASE 3: Admin Dashboard Layout

### Task 3.1: Create Protected Route Wrapper
- [ ] Create folder `src/components/admin/`
- [ ] Create `src/components/admin/ProtectedRoute.jsx`
  - [ ] Import React hooks (useState, useEffect)
  - [ ] Import Next.js router
  - [ ] Check authentication on component mount
    - [ ] Call `/api/auth/verify` endpoint
    - [ ] If authenticated, render children
    - [ ] If not authenticated, redirect to `/admin/login`
  - [ ] Show loading spinner during verification
  - [ ] Add error handling
- [ ] Test protecting a dummy page

### Task 3.2: Build Admin Layout Component
- [ ] Create `src/components/admin/AdminLayout.jsx`
  - [ ] Import useState for sidebar toggle
  - [ ] Import reactstrap components
  - [ ] Create state for sidebar visibility (mobile)
  - [ ] Build top header bar
    - [ ] Add site logo/title (left)
    - [ ] Add admin user name (right)
    - [ ] Add hamburger menu button (mobile only)
    - [ ] Add logout icon/button
  - [ ] Build sidebar navigation
    - [ ] Add Dashboard menu item with icon
    - [ ] Add Orders menu item with icon
    - [ ] Add Logout button
    - [ ] Highlight active route
  - [ ] Implement responsive behavior
    - [ ] Desktop: Sidebar always visible, fixed
    - [ ] Mobile: Sidebar hidden by default, toggle with hamburger
  - [ ] Create main content area with proper padding
  - [ ] Wrap children in layout structure
- [ ] Create `public/assets/scss/admin.scss` for custom admin styles
  - [ ] Add sidebar styles
  - [ ] Add header styles
  - [ ] Add mobile responsive overrides
  - [ ] Add utility classes
- [ ] Import admin.scss in layout component
- [ ] Test layout on desktop (> 768px)
- [ ] Test layout on mobile (< 768px)
- [ ] Test sidebar toggle on mobile

### Task 3.3: Build Dashboard Statistics Page
- [ ] Create `src/pages/admin/dashboard.jsx`
  - [ ] Import ProtectedRoute and AdminLayout
  - [ ] Import useState and useEffect
  - [ ] Create state for stats data and loading
  - [ ] Wrap page with ProtectedRoute and AdminLayout
  - [ ] Build top statistics cards section
    - [ ] Create 4-column grid (Bootstrap row/col)
    - [ ] Add "Total Orders" card
    - [ ] Add "Pending Orders" card
    - [ ] Add "Completed Orders" card
    - [ ] Add "Total Income" card
    - [ ] Make cards stack on mobile
  - [ ] Build additional metrics section
    - [ ] Payment Received count
    - [ ] Payment Pending count
    - [ ] Orders by Status breakdown
  - [ ] Build recent orders table
    - [ ] Table headers: Order Number, Customer, Total, Status, Date
    - [ ] Show last 5-10 orders
    - [ ] Make order number clickable (link to detail page)
    - [ ] Add status badge
  - [ ] Implement data fetching
    - [ ] Fetch stats from `/api/admin/stats`
    - [ ] Handle loading state
    - [ ] Handle errors with mock data fallback
  - [ ] Add responsive styling
  - [ ] Test on mobile and desktop

---

## 📦 PHASE 4: Orders Management

### Task 4.1: Build Orders List Page
- [ ] Create folder `src/pages/admin/orders/`
- [ ] Create `src/pages/admin/orders/index.jsx`
  - [ ] Import necessary components and hooks
  - [ ] Wrap with ProtectedRoute and AdminLayout
  - [ ] Create state for orders, filters, loading, pagination
  - [ ] Build filters and search bar section
    - [ ] Search input (order number, name, email, phone)
    - [ ] Status filter dropdown
    - [ ] Date range filter (optional)
    - [ ] Payment mode filter
    - [ ] Area filter
    - [ ] Apply/Clear filter buttons
  - [ ] Build data table
    - [ ] Table headers: Order #, Name, Phone, Total, Status, Date, Actions
    - [ ] Map orders data to table rows
    - [ ] Make order number clickable
    - [ ] Add status badge component
    - [ ] Add "View" and "Change Status" action buttons
  - [ ] Build mobile card view
    - [ ] Detect screen size
    - [ ] Show cards instead of table on mobile
    - [ ] Include key info in each card
  - [ ] Build pagination controls
    - [ ] Previous button
    - [ ] Page numbers
    - [ ] Next button
    - [ ] Show total pages
  - [ ] Implement data fetching
    - [ ] Fetch from `/api/admin/orders` with query params
    - [ ] Handle loading state
    - [ ] Handle errors with mock data fallback
  - [ ] Implement search functionality
  - [ ] Implement filter functionality
  - [ ] Test pagination
  - [ ] Test on mobile and desktop

### Task 4.2: Build Order Detail/View Page
- [ ] Create `src/pages/admin/orders/[id].jsx`
  - [ ] Import dynamic route from Next.js
  - [ ] Wrap with ProtectedRoute and AdminLayout
  - [ ] Create state for order data, loading, editing status
  - [ ] Build order header section
    - [ ] Large order number display
    - [ ] Order date
    - [ ] Status badge
    - [ ] "Download Receipt" button
  - [ ] Build customer information card
    - [ ] Name, Email, Phone, Alternate Phone
    - [ ] Address, Area
    - [ ] Payment Mode, Maslak, Meat Option
    - [ ] Qurbani Day, Qurbani Purpose
  - [ ] Build order items table
    - [ ] Headers: Item Type, Quantity, Price/Unit, Names, Subtotal
    - [ ] Map order items to rows
  - [ ] Build financial summary card
    - [ ] Subtotal
    - [ ] Delivery charges
    - [ ] Grand total
    - [ ] Amount paid
    - [ ] Balance due
  - [ ] Build status history timeline
    - [ ] Show all status changes
    - [ ] Display date, status, changed by, notes
    - [ ] Visual timeline design
  - [ ] Build admin actions section
    - [ ] Change status dropdown with notes and save button
    - [ ] Mark payment received form (amount, date, save)
    - [ ] Admin notes textarea with save button
  - [ ] Implement data fetching
    - [ ] Fetch order details from `/api/admin/orders/[id]`
    - [ ] Handle loading state
    - [ ] Handle errors with mock data fallback
  - [ ] Implement status update functionality
  - [ ] Implement payment update functionality
  - [ ] Implement admin notes save functionality
  - [ ] Connect download receipt button to PDF generation
  - [ ] Add responsive styling
  - [ ] Test all actions
  - [ ] Test on mobile and desktop

### Task 4.3: Build Receipt/Invoice PDF Generation
- [ ] Install PDF libraries
  ```bash
  npm install jspdf jspdf-autotable
  ```
- [ ] Create `src/lib/generateReceipt.js`
  - [ ] Import jsPDF and autoTable
  - [ ] Create generateReceipt function accepting order data
  - [ ] Initialize PDF document
  - [ ] Add header section
    - [ ] Company logo (if available)
    - [ ] Company name: "Sahulat-Qurbani"
    - [ ] Contact information
  - [ ] Add order information section
    - [ ] Order number, date, status
  - [ ] Add customer details section
    - [ ] Name, email, phone, address, area
  - [ ] Add itemized order table
    - [ ] Use autoTable for clean table format
    - [ ] Columns: Item, Quantity, Price, Names, Subtotal
  - [ ] Add financial summary
    - [ ] Subtotal, delivery charges, grand total
    - [ ] Amount paid, balance due
  - [ ] Add footer
    - [ ] Thank you message
    - [ ] Terms and conditions (optional)
  - [ ] Set filename: `SQ-Receipt-[OrderNumber].pdf`
  - [ ] Implement download functionality
- [ ] Test PDF generation with sample order data
- [ ] Verify PDF formatting on different screen sizes

---

## 🔌 PHASE 5: API Routes with Mock Data Fallback

### Task 5.1: Create Mock Data Files
- [ ] Create folder `src/lib/mockData/`
- [ ] Create `src/lib/mockData/orders.js`
  - [ ] Export array of 20+ sample orders
  - [ ] Include all fields matching database schema
  - [ ] Use various statuses, dates, customers
  - [ ] Include realistic data
- [ ] Create `src/lib/mockData/stats.js`
  - [ ] Export sample statistics object
  - [ ] Include all metrics needed for dashboard
  - [ ] Use realistic numbers

### Task 5.2: Build Orders List API
- [ ] Create folder `src/pages/api/admin/orders/`
- [ ] Create `src/pages/api/admin/orders/index.js`
  - [ ] Handle GET request
    - [ ] Accept query params: search, status, page, limit
    - [ ] Try to fetch from Supabase with filters
    - [ ] Apply search across order_number, name, email, phone
    - [ ] Apply status filter if provided
    - [ ] Implement pagination
    - [ ] Calculate total pages
    - [ ] On error, fallback to mock data with same filters
    - [ ] Return: `{ orders: [], total: 0, page: 1, totalPages: 1 }`
  - [ ] Handle POST request (add order)
    - [ ] Validate all required fields
    - [ ] Try to insert into Supabase orders table
    - [ ] Insert order items
    - [ ] Send confirmation email
    - [ ] On error, fallback to mock success response
    - [ ] Return created order with ID
- [ ] Test GET with various query params
- [ ] Test POST with valid order data
- [ ] Test error handling and mock fallback

### Task 5.3: Build Single Order API
- [ ] Create folder `src/pages/api/admin/orders/[id]/`
- [ ] Create `src/pages/api/admin/orders/[id]/index.js`
  - [ ] Handle GET request
    - [ ] Extract order ID from params
    - [ ] Try to fetch order from Supabase
    - [ ] Include order items (JOIN)
    - [ ] Include status history
    - [ ] On error, fallback to mock order data
    - [ ] Return order object
  - [ ] Handle PUT request (update order)
    - [ ] Extract order ID and update data
    - [ ] Validate fields
    - [ ] Try to update in Supabase
    - [ ] On error, fallback to mock success
    - [ ] Return updated order
- [ ] Test GET with valid and invalid IDs
- [ ] Test PUT with update data
- [ ] Test mock fallback

### Task 5.4: Build Order Status Update API
- [ ] Create `src/pages/api/admin/orders/[id]/status.js`
  - [ ] Handle POST request
    - [ ] Extract order ID, new status, and notes
    - [ ] Validate status value
    - [ ] Try to update order status in Supabase
    - [ ] Log status change (triggers automatically via DB trigger)
    - [ ] Optional: Send email notification to customer
    - [ ] On error, fallback to mock success
    - [ ] Return updated order
- [ ] Test status updates with various statuses
- [ ] Test mock fallback
- [ ] Test email notification (if implemented)

### Task 5.5: Build Order Payment Update API
- [ ] Create `src/pages/api/admin/orders/[id]/payment.js`
  - [ ] Handle POST request
    - [ ] Extract order ID, amount paid, payment date
    - [ ] Validate amount
    - [ ] Try to update order in Supabase
    - [ ] Update amount_paid and payment_date fields
    - [ ] On error, fallback to mock success
    - [ ] Return updated order
- [ ] Test payment updates
- [ ] Test mock fallback

### Task 5.6: Build Dashboard Stats API
- [ ] Create `src/pages/api/admin/stats.js`
  - [ ] Handle GET request
    - [ ] Try to fetch stats from Supabase
      - [ ] Total orders count
      - [ ] Count by each status
      - [ ] Total income (sum grand_total where status = 'completed' or 'payment_received')
      - [ ] Payment received sum
      - [ ] Payment pending sum
      - [ ] Recent orders (last 10)
    - [ ] On error, fallback to mock stats data
    - [ ] Return stats object
- [ ] Test stats calculation
- [ ] Test mock fallback

### Task 5.7: Update Public Form API
- [ ] Open `src/pages/api/sendQurbani.js`
- [ ] Add Supabase import
- [ ] After email validation, before sending email:
  - [ ] Wrap in try-catch block
  - [ ] Prepare order data object
  - [ ] Insert order into Supabase `orders` table
  - [ ] Get inserted order ID
  - [ ] Prepare order items array
  - [ ] Insert each item into `order_items` table
  - [ ] Log success
  - [ ] On error, log error but continue (don't block email)
- [ ] Keep existing email sending functionality
- [ ] Return order number in response (if available)
- [ ] Test form submission creates order in DB
- [ ] Test email still sends if DB insert fails
- [ ] Test complete flow from public form to dashboard

---

## 🎨 PHASE 6: Frontend Integration & UI Components

### Task 6.1: Create Shared Admin Components
- [ ] Create `src/components/admin/StatusBadge.jsx`
  - [ ] Accept `status` prop
  - [ ] Return Badge component with appropriate color
    - Pending: warning (yellow)
    - Confirmed: info (blue)
    - Payment Received: teal
    - In Progress: purple
    - Completed: success (green)
    - Cancelled: danger (red)
  - [ ] Use reactstrap Badge or Bootstrap classes
- [ ] Create `src/components/admin/LoadingSpinner.jsx`
  - [ ] Create centered loading spinner
  - [ ] Use Bootstrap Spinner component
  - [ ] Accept optional `size` and `message` props
- [ ] Create `src/components/admin/StatCard.jsx`
  - [ ] Accept props: title, value, icon, color
  - [ ] Create card component
  - [ ] Display icon, title, and value
  - [ ] Apply color theme
  - [ ] Make mobile responsive
- [ ] Create `src/components/admin/OrdersTable.jsx`
  - [ ] Accept props: orders, onViewOrder, onChangeStatus
  - [ ] Render responsive table
  - [ ] On desktop: show full table
  - [ ] On mobile: convert to card layout
  - [ ] Include status badge
  - [ ] Add action buttons
- [ ] Create `src/components/admin/FilterBar.jsx`
  - [ ] Accept props: onSearch, onFilterStatus, onFilterDate, etc.
  - [ ] Build search input
  - [ ] Build filter dropdowns
  - [ ] Build apply/clear buttons
  - [ ] Make mobile responsive (stack vertically)
- [ ] Test all components individually
- [ ] Test components on mobile and desktop

### Task 6.2: Style Admin Panel
- [ ] Open/Update `public/assets/scss/admin.scss`
- [ ] Add custom admin panel styles
  - [ ] Sidebar styles (width, colors, hover effects)
  - [ ] Header bar styles
  - [ ] Card styles for stats
  - [ ] Table styles
  - [ ] Button custom styles
  - [ ] Badge color variants
  - [ ] Form input styles
  - [ ] Modal styles
- [ ] Add mobile responsive overrides
  - [ ] Sidebar collapse styles
  - [ ] Card stacking
  - [ ] Table to card conversion styles
  - [ ] Font size adjustments
- [ ] Add utility classes
  - [ ] Spacing utilities
  - [ ] Text utilities
  - [ ] Color utilities
- [ ] Import admin.scss in AdminLayout
- [ ] Test styles across all admin pages
- [ ] Verify mobile responsiveness

### Task 6.3: Integrate Components into Pages
- [ ] Update `src/pages/admin/dashboard.jsx`
  - [ ] Replace inline stat cards with StatCard component
  - [ ] Add LoadingSpinner during data fetch
  - [ ] Add StatusBadge in recent orders table
- [ ] Update `src/pages/admin/orders/index.jsx`
  - [ ] Replace inline table with OrdersTable component
  - [ ] Replace inline filters with FilterBar component
  - [ ] Add LoadingSpinner during data fetch
- [ ] Update `src/pages/admin/orders/[id].jsx`
  - [ ] Use StatusBadge for order status
  - [ ] Add LoadingSpinner during data fetch
  - [ ] Use consistent card styling
- [ ] Test all pages after component integration
- [ ] Verify no regressions

---

## 🧪 PHASE 7: Testing & Refinement

### Task 7.1: Authentication Testing
- [ ] Test login with correct credentials
  - [ ] Verify redirect to dashboard
  - [ ] Verify cookie is set
- [ ] Test login with incorrect credentials
  - [ ] Verify error message displays
  - [ ] Verify no redirect occurs
- [ ] Test logout functionality
  - [ ] Verify redirect to login page
  - [ ] Verify cookie is cleared
  - [ ] Verify cannot access protected pages after logout
- [ ] Test protected routes
  - [ ] Try accessing /admin/dashboard without login
  - [ ] Verify redirect to login page
  - [ ] After login, verify can access protected pages
- [ ] Test session persistence
  - [ ] Login, close tab, reopen
  - [ ] Verify still logged in (if remember me enabled)

### Task 7.2: Dashboard Testing
- [ ] Test dashboard statistics loading
  - [ ] Verify stats display correctly
  - [ ] Test with real data (if available)
  - [ ] Test with mock data fallback
- [ ] Test recent orders table
  - [ ] Verify orders display
  - [ ] Test clicking order number (links to detail)
- [ ] Test responsive design
  - [ ] Desktop (>1200px): 4 cards in row
  - [ ] Tablet (768-1200px): 2 cards in row
  - [ ] Mobile (<768px): 1 card stacked
- [ ] Test loading states
- [ ] Test error states

### Task 7.3: Orders List Page Testing
- [ ] Test orders list loading
  - [ ] Verify all orders display
  - [ ] Verify table columns are correct
- [ ] Test search functionality
  - [ ] Search by order number
  - [ ] Search by customer name
  - [ ] Search by email
  - [ ] Search by phone
- [ ] Test status filter
  - [ ] Filter by each status
  - [ ] Test "All" status
- [ ] Test pagination
  - [ ] Navigate through pages
  - [ ] Verify correct page numbers
  - [ ] Test first and last page
- [ ] Test "View Order" button
  - [ ] Verify redirect to detail page
- [ ] Test responsive design
  - [ ] Desktop: Full table view
  - [ ] Mobile: Card layout
- [ ] Test with no orders (empty state)

### Task 7.4: Order Detail Page Testing
- [ ] Test order details loading
  - [ ] Verify all order information displays
  - [ ] Verify customer information is correct
  - [ ] Verify order items table is correct
  - [ ] Verify financial summary is accurate
- [ ] Test status change functionality
  - [ ] Change status to each available status
  - [ ] Add notes and verify they save
  - [ ] Verify status updates in database (if connected)
- [ ] Test payment update functionality
  - [ ] Enter payment amount
  - [ ] Select payment date
  - [ ] Verify updates save
- [ ] Test admin notes
  - [ ] Add notes
  - [ ] Verify notes save
- [ ] Test receipt download
  - [ ] Click download button
  - [ ] Verify PDF generates
  - [ ] Open PDF and verify content
  - [ ] Check formatting and layout
- [ ] Test responsive design
  - [ ] Desktop: Side-by-side cards
  - [ ] Mobile: Stacked cards
- [ ] Test with different order types
  - [ ] Order with Camel only
  - [ ] Order with multiple items
  - [ ] Order with Waqf Hissa

### Task 7.5: Public Form Integration Testing
- [ ] Test order submission from public form
  - [ ] Fill out complete form
  - [ ] Submit order
  - [ ] Verify email is sent
  - [ ] Verify order appears in admin dashboard
  - [ ] Verify order details are correct
- [ ] Test form with Supabase connected
  - [ ] Submit order
  - [ ] Check orders table in Supabase
  - [ ] Verify order_items are inserted
- [ ] Test form with Supabase disconnected (mock fallback)
  - [ ] Disconnect Supabase or use invalid credentials
  - [ ] Submit order
  - [ ] Verify email still sends
  - [ ] Verify user still gets success message
- [ ] Test various order combinations
  - [ ] Different animals
  - [ ] Different quantities
  - [ ] With/without delivery

### Task 7.6: Mobile Responsiveness Testing
- [ ] Test on real mobile devices (if possible)
  - [ ] iPhone (iOS Safari)
  - [ ] Android (Chrome)
- [ ] Test on browser mobile emulation
  - [ ] Chrome DevTools device toolbar
  - [ ] Test multiple screen sizes: 375px, 414px, 768px
- [ ] Test admin login page on mobile
  - [ ] Verify form is usable
  - [ ] Verify buttons are tappable
- [ ] Test admin dashboard on mobile
  - [ ] Verify cards stack vertically
  - [ ] Verify stats are readable
- [ ] Test orders list on mobile
  - [ ] Verify card layout displays
  - [ ] Verify filters are usable
  - [ ] Verify actions are tappable
- [ ] Test order detail page on mobile
  - [ ] Verify all sections are readable
  - [ ] Verify forms are usable
  - [ ] Verify buttons work
- [ ] Test sidebar navigation on mobile
  - [ ] Verify hamburger menu appears
  - [ ] Test sidebar toggle
  - [ ] Verify menu items are tappable

### Task 7.7: Error Handling & Edge Cases
- [ ] Test error messages display correctly
- [ ] Test invalid API responses
- [ ] Test network failures (disconnect internet)
- [ ] Test with empty data
- [ ] Test with malformed data
- [ ] Test with very long text inputs
- [ ] Test with special characters in inputs
- [ ] Test concurrent actions
- [ ] Test browser back/forward buttons
- [ ] Test page refresh during actions

### Task 7.8: Performance Testing
- [ ] Test page load times
- [ ] Test with large number of orders (50+)
- [ ] Test pagination performance
- [ ] Test search performance
- [ ] Test PDF generation speed
- [ ] Optimize slow areas if needed

---

## 🚀 PHASE 8: Deployment & Documentation

### Task 8.1: Environment Configuration
- [ ] Create production `.env.local` file
  - [ ] Add production Supabase URL
  - [ ] Add production Supabase keys
  - [ ] Add production SMTP credentials
  - [ ] Add admin email
- [ ] Verify all environment variables are set
- [ ] Test with production environment locally
- [ ] Add `.env.local` to `.gitignore`
- [ ] Document required environment variables

### Task 8.2: Pre-Deployment Checklist
- [ ] Remove console.logs from production code
- [ ] Remove test/mock users (or document them)
- [ ] Update mock credentials to secure values
- [ ] Verify all error handling is in place
- [ ] Verify all loading states work
- [ ] Run `npm run build` to check for build errors
- [ ] Fix any build warnings
- [ ] Test production build locally (`npm run start`)

### Task 8.3: Create Admin Documentation
- [ ] Create `ADMIN_PANEL_README.md` in project root
- [ ] Add "Admin Panel Overview" section
  - [ ] Describe purpose of admin panel
  - [ ] List main features
- [ ] Add "Login Credentials" section
  - [ ] Document default admin credentials
  - [ ] Explain how to change password (future)
- [ ] Add "How to Access Dashboard" section
  - [ ] URL to access admin panel
  - [ ] Login instructions
- [ ] Add "Managing Orders" section
  - [ ] How to view orders list
  - [ ] How to search and filter
  - [ ] How to view order details
- [ ] Add "Changing Order Status" section
  - [ ] Step-by-step instructions
  - [ ] Explain each status meaning
- [ ] Add "Downloading Receipts" section
  - [ ] How to download receipt for an order
- [ ] Add "Dashboard Statistics" section
  - [ ] Explain each metric
- [ ] Add "Troubleshooting" section
  - [ ] Common issues and solutions
  - [ ] Who to contact for help
- [ ] Add "Database Schema Reference" section
  - [ ] Document tables and fields
  - [ ] Include SQL schema for reference

### Task 8.4: Deployment
- [ ] Choose hosting platform (Vercel, Netlify, etc.)
- [ ] Create account and connect Git repository
- [ ] Configure environment variables in hosting platform
- [ ] Configure build settings
  - Build command: `npm run build`
  - Output directory: `.next`
- [ ] Deploy application
- [ ] Test deployed application
  - [ ] Test admin login
  - [ ] Test dashboard
  - [ ] Test orders management
  - [ ] Test public form submission
- [ ] Configure custom domain (if applicable)
- [ ] Set up SSL certificate

### Task 8.5: Post-Deployment Verification
- [ ] Verify all pages load correctly
- [ ] Test admin authentication flow
- [ ] Test creating an order from public form
- [ ] Verify order appears in admin panel
- [ ] Test email notifications
- [ ] Test receipt download
- [ ] Test on mobile devices
- [ ] Monitor for errors in logs
- [ ] Set up error monitoring (optional: Sentry, LogRocket)

### Task 8.6: Handoff & Training
- [ ] Provide admin credentials to client
- [ ] Walk through admin panel features
- [ ] Demonstrate how to manage orders
- [ ] Demonstrate how to change order status
- [ ] Show how to download receipts
- [ ] Provide ADMIN_PANEL_README.md documentation
- [ ] Answer any questions
- [ ] Set up support channel for issues

---

## 🎯 Future Enhancements (Post-MVP)

### Optional Tasks for Later Phases
- [ ] Email notifications to customers on status change
- [ ] SMS notifications integration (Twilio, etc.)
- [ ] Advanced analytics dashboard with charts (Chart.js, Recharts)
- [ ] Export orders to Excel/CSV
- [ ] Multi-admin support with roles and permissions
- [ ] Customer portal (order tracking by order number)
- [ ] Supabase realtime subscriptions for live dashboard updates
- [ ] Payment gateway integration (Stripe, PayPal, local gateways)
- [ ] Inventory management for animals
- [ ] Automated email reminders for pending payments
- [ ] WhatsApp notifications integration
- [ ] Order history and analytics reports
- [ ] Customer management CRM features

---

## 📊 Progress Tracking

### Phase Completion Status
- [ ] Phase 1: Supabase Setup (0/4 tasks)
- [ ] Phase 2: Authentication (0/3 tasks)
- [ ] Phase 3: Admin Layout (0/3 tasks)
- [ ] Phase 4: Orders Management (0/3 tasks)
- [ ] Phase 5: API Routes (0/7 tasks)
- [ ] Phase 6: UI Components (0/3 tasks)
- [ ] Phase 7: Testing (0/8 tasks)
- [ ] Phase 8: Deployment (0/6 tasks)

### Overall Progress: 0% Complete

**Total Tasks:** 37 main tasks with 250+ subtasks

---

## 🔄 Quick Reference: File Creation Order

1. Environment setup and dependencies
2. `src/lib/supabase/client.js`
3. `src/lib/supabase/server.js`
4. `src/pages/api/auth/login.js`
5. `src/pages/api/auth/logout.js`
6. `src/pages/api/auth/verify.js`
7. `src/pages/admin/login.jsx`
8. `src/components/admin/ProtectedRoute.jsx`
9. `src/components/admin/AdminLayout.jsx`
10. `public/assets/scss/admin.scss`
11. `src/pages/admin/dashboard.jsx`
12. `src/lib/mockData/stats.js`
13. `src/lib/mockData/orders.js`
14. `src/pages/api/admin/stats.js`
15. `src/components/admin/StatusBadge.jsx`
16. `src/components/admin/LoadingSpinner.jsx`
17. `src/components/admin/StatCard.jsx`
18. `src/pages/admin/orders/index.jsx`
19. `src/components/admin/FilterBar.jsx`
20. `src/components/admin/OrdersTable.jsx`
21. `src/pages/api/admin/orders/index.js`
22. `src/pages/admin/orders/[id].jsx`
23. `src/pages/api/admin/orders/[id]/index.js`
24. `src/pages/api/admin/orders/[id]/status.js`
25. `src/pages/api/admin/orders/[id]/payment.js`
26. `src/lib/generateReceipt.js`
27. Update `src/pages/api/sendQurbani.js`
28. `ADMIN_PANEL_README.md`

---

**Note:** Check off each task as you complete it. Use Cursor's built-in Git features to commit after each major milestone. Good luck with your vibe coding session!

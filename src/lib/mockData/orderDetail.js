import { mockOrdersList } from "@/lib/mockData/orders";

/** Full booking shape aligned with public Qurbani form + DB-style fields */
const richTemplate = {
  alternate_phone: "03009988776",
  address: "B-12, Block 5, near Masjid-e-Nabawi Street",
  qurbani_purpose: "For Myself",
  qurbani_day: "Day 02",
  maslak: "Fiqah Hanfiya",
  meat_option: "Delivery",
  hide_donation_agreed: true,
  amount_paid: 0,
  payment_date: null,
  admin_notes: "Customer prefers morning delivery call.",
  updated_at: new Date().toISOString(),
  camel: true,
  camel_quantity: 1,
  camel_names: "Ahmed Khan\nMuhammad Ali",
  camel_total: 50500,
  cow_share: true,
  cow_share_quantity: 1,
  share_cow_names: "Fatima Bibi",
  share_cow_total: 28000,
  full_cow: false,
  cow_full_quantity: null,
  full_cow_names: "",
  full_cow_total: 0,
  waqf_hissa: false,
  waqf_quantity: null,
  waqf_names: "",
  waqf_total: 0,
  items: [
    {
      item_type: "Camel",
      quantity: 1,
      names: "Ahmed Khan\nMuhammad Ali",
      price_per_unit: 48000,
      subtotal: 50500,
    },
    {
      item_type: "Cow Share",
      quantity: 1,
      names: "Fatima Bibi",
      price_per_unit: 25500,
      subtotal: 28000,
    },
  ],
};

function historyForStatus(status) {
  const now = Date.now();
  const steps = [
    { status: "pending", changed_by: "system", notes: "Booking received", offset: 5 },
    { status: "confirmed", changed_by: "admin", notes: "Phone verified", offset: 4 },
    {
      status: "payment_received",
      changed_by: "admin",
      notes: "Transfer slip received on WhatsApp",
      offset: 3,
    },
    { status: "in_progress", changed_by: "admin", notes: "Slaughter slot assigned", offset: 2 },
    { status: "completed", changed_by: "admin", notes: "Delivered / picked up", offset: 1 },
  ];
  const order = [
    "pending",
    "confirmed",
    "payment_received",
    "in_progress",
    "completed",
    "cancelled",
  ];
  const idx = order.indexOf(status);
  if (idx < 0) return [];
  if (status === "cancelled") {
    return [
      {
        status: "pending",
        changed_by: "system",
        notes: "Booking received",
        created_at: new Date(now - 86400000 * 2).toISOString(),
      },
      {
        status: "cancelled",
        changed_by: "admin",
        notes: "Cancelled per customer request",
        created_at: new Date(now - 86400000).toISOString(),
      },
    ];
  }
  return steps.slice(0, idx + 1).map((s, i) => ({
    status: s.status,
    changed_by: s.changed_by,
    notes: s.notes,
    created_at: new Date(now - 86400000 * s.offset - i * 3600000).toISOString(),
  }));
}

/**
 * Returns full order payload for admin detail API, or null if id unknown.
 */
export function getMockOrderDetail(id) {
  const row = mockOrdersList.find((o) => o.id === id);
  if (!row) return null;

  const grand = Number(row.grand_total);
  const paid =
    row.status === "payment_received" || row.status === "in_progress" || row.status === "completed"
      ? grand
      : row.status === "cancelled"
        ? 0
        : Math.min(20000, grand);

  return {
    id: row.id,
    order_number: row.order_number,
    status: row.status,
    created_at: row.created_at,
    updated_at: richTemplate.updated_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    alternate_phone: id.endsWith("102") ? "" : richTemplate.alternate_phone,
    address: richTemplate.address,
    area: row.area,
    payment_mode: row.payment_mode,
    qurbani_purpose: id.endsWith("102") ? "For Donation ( Waqf )" : richTemplate.qurbani_purpose,
    qurbani_day: richTemplate.qurbani_day,
    maslak: id.endsWith("103") ? "Fiqah Jafriya" : richTemplate.maslak,
    meat_option: id.endsWith("104") ? "Self Pickup" : richTemplate.meat_option,
    hide_donation_agreed: !id.endsWith("106"),
    grand_total: grand,
    amount_paid: paid,
    payment_date:
      paid > 0 && row.status !== "cancelled" ? new Date(Date.now() - 86400000).toISOString() : null,
    admin_notes: id.endsWith("105") ? "" : richTemplate.admin_notes,
    camel: !id.endsWith("106"),
    camel_quantity: id.endsWith("106") ? null : 1,
    camel_names: id.endsWith("106") ? "" : richTemplate.camel_names,
    camel_total: id.endsWith("106") ? 0 : Math.round(grand * 0.55),
    cow_share: !id.endsWith("105") && !id.endsWith("106"),
    cow_share_quantity: id.endsWith("105") || id.endsWith("106") ? null : 1,
    share_cow_names: id.endsWith("105") || id.endsWith("106") ? "" : "Fatima Bibi",
    share_cow_total: id.endsWith("105") || id.endsWith("106") ? 0 : Math.round(grand * 0.3),
    full_cow: id.endsWith("102"),
    cow_full_quantity: id.endsWith("102") ? 1 : null,
    full_cow_names: id.endsWith("102") ? "Ali family (7 names)" : "",
    full_cow_total: id.endsWith("102") ? grand : 0,
    waqf_hissa: id.endsWith("102"),
    waqf_quantity: id.endsWith("102") ? 2 : null,
    waqf_names: id.endsWith("102") ? "Waqf A\nWaqf B" : "",
    waqf_total: id.endsWith("102") ? 38000 : 0,
    items: buildItemsForRow(id, grand),
    status_history: historyForStatus(row.status),
  };
}

function buildItemsForRow(id, grand) {
  if (id.endsWith("102")) {
    return [
      {
        item_type: "Full Cow",
        quantity: 1,
        names: "Ali family (7 names)",
        price_per_unit: 178500,
        subtotal: 178500,
      },
      {
        item_type: "Cow Waqf Hissa",
        quantity: 2,
        names: "Waqf A\nWaqf B",
        price_per_unit: 19000,
        subtotal: 38000,
      },
    ];
  }
  if (id.endsWith("106")) {
    return [
      {
        item_type: "Cow Waqf Hissa",
        quantity: 1,
        names: "Sara Malik",
        price_per_unit: 19000,
        subtotal: grand,
      },
    ];
  }
  const a = Math.round(grand * 0.58);
  const b = grand - a;
  return [
    {
      item_type: "Camel",
      quantity: 1,
      names: richTemplate.camel_names,
      price_per_unit: 48000,
      subtotal: a,
    },
    {
      item_type: "Cow Share",
      quantity: 1,
      names: richTemplate.share_cow_names,
      price_per_unit: 25500,
      subtotal: b,
    },
  ];
}

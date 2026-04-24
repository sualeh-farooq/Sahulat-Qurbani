import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { mockOrdersList } from "@/lib/mockData/orders";

function filterMock({ search, status, page, limit }) {
  let rows = [...mockOrdersList];
  if (status && status !== "all") {
    rows = rows.filter((r) => r.status === status);
  }
  if (search && String(search).trim()) {
    const q = String(search).trim().toLowerCase();
    rows = rows.filter(
      (r) =>
        (r.order_number && r.order_number.toLowerCase().includes(q)) ||
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.email && r.email.toLowerCase().includes(q)) ||
        (r.phone && r.phone.includes(q))
    );
  }
  const total = rows.length;
  const start = (page - 1) * limit;
  const paged = rows.slice(start, start + limit);
  return { orders: paged, total, page, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const search = (req.query.search || "").trim();
  const status = (req.query.status || "all").trim();
  const page = Math.max(1, parseInt(req.query.page || "1", 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || "20", 10) || 20));

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    const out = filterMock({ search, status, page, limit });
    return res.status(200).json({ ok: true, source: "mock", ...out });
  }

  try {
    let q = supabase
      .from("orders")
      .select(
        "id, order_number, name, email, phone, grand_total, status, created_at, area, payment_mode",
        { count: "exact" }
      )
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      q = q.eq("status", status);
    }
    if (search) {
      const safe = String(search).replace(/,/g, "").trim();
      const pattern = `%${safe}%`;
      q = q.or(
        `order_number.ilike.${pattern},name.ilike.${pattern},email.ilike.${pattern},phone.ilike.${pattern}`
      );
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await q.range(from, to);
    if (error) throw error;

    const total = count || 0;
    return res.status(200).json({
      ok: true,
      source: "supabase",
      orders: data || [],
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (e) {
    console.error("[admin/orders]", e);
    const out = filterMock({ search, status, page, limit });
    return res.status(200).json({ ok: true, source: "mock_fallback", ...out });
  }
}

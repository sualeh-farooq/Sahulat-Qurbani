import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { getMockOrderDetail } from "@/lib/mockData/orderDetail";

function deriveFlagsFromItems(items) {
  const by = (type) => items.find((i) => i.item_type === type);
  const camel = by("Camel");
  const cowShare = by("Cow Share");
  const fullCow = by("Full Cow");
  const waqf = by("Cow Waqf Hissa");
  return {
    camel: !!camel,
    camel_quantity: camel?.quantity ?? null,
    camel_names: camel?.names ?? "",
    camel_total: camel ? Number(camel.subtotal) : 0,
    cow_share: !!cowShare,
    cow_share_quantity: cowShare?.quantity ?? null,
    share_cow_names: cowShare?.names ?? "",
    share_cow_total: cowShare ? Number(cowShare.subtotal) : 0,
    full_cow: !!fullCow,
    cow_full_quantity: fullCow?.quantity ?? null,
    full_cow_names: fullCow?.names ?? "",
    full_cow_total: fullCow ? Number(fullCow.subtotal) : 0,
    waqf_hissa: !!waqf,
    waqf_quantity: waqf?.quantity ?? null,
    waqf_names: waqf?.names ?? "",
    waqf_total: waqf ? Number(waqf.subtotal) : 0,
  };
}

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!id || typeof id !== "string") {
    return res.status(400).json({ ok: false, error: "Missing order id" });
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    const mock = getMockOrderDetail(id);
    if (!mock) return res.status(404).json({ ok: false, error: "Order not found" });
    return res.status(200).json({ ok: true, source: "mock", order: mock });
  }

  try {
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (orderErr) throw orderErr;
    if (!order) {
      const mock = getMockOrderDetail(id);
      if (!mock) return res.status(404).json({ ok: false, error: "Order not found" });
      return res.status(200).json({ ok: true, source: "mock_fallback", order: mock });
    }

    const { data: items, error: itemsErr } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", id)
      .order("created_at", { ascending: true });

    if (itemsErr) throw itemsErr;

    const { data: statusHistory, error: histErr } = await supabase
      .from("order_status_history")
      .select("*")
      .eq("order_id", id)
      .order("created_at", { ascending: true });

    if (histErr) throw histErr;

    const normalizedItems = (items || []).map((row) => ({
      item_type: row.item_type,
      quantity: row.quantity,
      names: row.names,
      price_per_unit: Number(row.price_per_unit),
      subtotal: Number(row.subtotal),
    }));

    const derived = deriveFlagsFromItems(normalizedItems);

    return res.status(200).json({
      ok: true,
      source: "supabase",
      order: {
        ...order,
        phone: order.phone,
        ...derived,
        items: normalizedItems,
        status_history: statusHistory || [],
      },
    });
  } catch (e) {
    console.error("[admin/orders/[id]]", e);
    const mock = getMockOrderDetail(id);
    if (!mock) return res.status(404).json({ ok: false, error: "Order not found" });
    return res.status(200).json({ ok: true, source: "mock_fallback", order: mock });
  }
}

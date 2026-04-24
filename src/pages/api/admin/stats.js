import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { mockStats } from "@/lib/mockData/stats";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return res.status(200).json({ ok: true, source: "mock", ...mockStats });
  }

  try {
    const { count: totalOrders, error: totalErr } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });
    if (totalErr) throw totalErr;

    const statuses = [
      "pending",
      "confirmed",
      "payment_received",
      "in_progress",
      "completed",
      "cancelled",
    ];
    const counts = {};
    for (const s of statuses) {
      const { count, error } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", s);
      if (error) throw error;
      counts[s] = count || 0;
    }

    const { data: paidRows, error: paidErr } = await supabase
      .from("orders")
      .select("grand_total")
      .in("status", ["payment_received", "completed"]);
    if (paidErr) throw paidErr;

    const totalIncome = (paidRows || []).reduce(
      (sum, row) => sum + Number(row.grand_total || 0),
      0
    );

    const { data: recent, error: recentErr } = await supabase
      .from("orders")
      .select("id, order_number, name, grand_total, status, created_at")
      .order("created_at", { ascending: false })
      .limit(10);
    if (recentErr) throw recentErr;

    return res.status(200).json({
      ok: true,
      source: "supabase",
      totalOrders: totalOrders || 0,
      pendingOrders: counts.pending || 0,
      confirmedOrders: counts.confirmed || 0,
      paymentReceivedOrders: counts.payment_received || 0,
      inProgressOrders: counts.in_progress || 0,
      completedOrders: counts.completed || 0,
      cancelledOrders: counts.cancelled || 0,
      totalIncome,
      paymentReceivedAmount: totalIncome,
      paymentPendingAmount: 0,
      recentOrders: recent || [],
    });
  } catch (e) {
    console.error("[admin/stats]", e);
    return res.status(200).json({ ok: true, source: "mock_fallback", ...mockStats });
  }
}

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import StatusBadge from "@/components/admin/StatusBadge";

function formatPkr(n) {
  const num = Number(n || 0);
  return `Rs. ${num.toLocaleString("en-PK")}`;
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/stats", { credentials: "include" });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load stats");
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ProtectedRoute>
      <AdminLayout title="Dashboard">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {!data && !error ? (
          <div className="text-muted">Loading dashboard…</div>
        ) : null}
        {data ? (
          <>
            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="admin-stat-card bg-white p-3 h-100">
                  <div className="text-muted small">Total orders</div>
                  <div className="fs-3 fw-bold">{data.totalOrders}</div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="admin-stat-card bg-white p-3 h-100">
                  <div className="text-muted small">Pending</div>
                  <div className="fs-3 fw-bold text-warning">{data.pendingOrders}</div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="admin-stat-card bg-white p-3 h-100">
                  <div className="text-muted small">Completed</div>
                  <div className="fs-3 fw-bold text-success">{data.completedOrders}</div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="admin-stat-card bg-white p-3 h-100">
                  <div className="text-muted small">Total income (paid statuses)</div>
                  <div className="fs-4 fw-bold">{formatPkr(data.totalIncome)}</div>
                </div>
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <div className="admin-stat-card bg-white p-3 h-100">
                  <div className="text-muted small">Payment received (count)</div>
                  <div className="fs-4 fw-bold">{data.paymentReceivedOrders}</div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="admin-stat-card bg-white p-3 h-100">
                  <div className="text-muted small">Confirmed</div>
                  <div className="fs-4 fw-bold">{data.confirmedOrders}</div>
                </div>
              </div>
            </div>

            <div className="admin-stat-card bg-white p-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="fw-semibold">Recent orders</div>
                <Link href="/admin/orders" className="small">
                  View all
                </Link>
              </div>
              <div className="table-responsive d-none d-md-block">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {(data.recentOrders || []).map((o) => (
                      <tr key={o.id}>
                        <td className="text-nowrap">{o.order_number}</td>
                        <td>{o.name}</td>
                        <td>{formatPkr(o.grand_total)}</td>
                        <td>
                          <StatusBadge status={o.status} />
                        </td>
                        <td className="text-end">
                          <Link className="btn btn-sm btn-outline-primary" href={`/admin/orders/${o.id}`}>
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-md-none">
                {(data.recentOrders || []).map((o) => (
                  <div key={o.id} className="order-card-mobile bg-light p-3 mb-2">
                    <div className="d-flex justify-content-between gap-2">
                      <div className="fw-semibold">{o.order_number}</div>
                      <StatusBadge status={o.status} />
                    </div>
                    <div className="small text-muted">{o.name}</div>
                    <div className="fw-semibold mt-1">{formatPkr(o.grand_total)}</div>
                    <Link className="btn btn-sm btn-primary mt-2 w-100" href={`/admin/orders/${o.id}`}>
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </AdminLayout>
    </ProtectedRoute>
  );
}

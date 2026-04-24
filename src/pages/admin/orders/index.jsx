import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import StatusBadge from "@/components/admin/StatusBadge";
import { Button, FormGroup, Input, Label } from "reactstrap";

function formatPkr(n) {
  const num = Number(n || 0);
  return `Rs. ${num.toLocaleString("en-PK")}`;
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

export default function AdminOrdersIndex() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState("");

  const query = useMemo(
    () =>
      new URLSearchParams({
        search: search.trim(),
        status,
        page: String(page),
        limit: "20",
      }).toString(),
    [search, status, page]
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/admin/orders?${query}`, { credentials: "include" });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load orders");
        if (!cancelled) setPayload(json);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [query]);

  const applyFilters = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const orders = payload?.orders || [];

  return (
    <ProtectedRoute>
      <AdminLayout title="Orders">
        <form className="admin-stat-card bg-white p-3 mb-3" onSubmit={applyFilters}>
          <div className="row g-3 align-items-end">
            <div className="col-12 col-md-6 col-lg-4">
              <FormGroup className="mb-0">
                <Label for="order-search">Search</Label>
                <Input
                  id="order-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Order #, name, email, phone"
                />
              </FormGroup>
            </div>
            <div className="col-12 col-md-4 col-lg-3">
              <FormGroup className="mb-0">
                <Label for="order-status">Status</Label>
                <Input
                  id="order-status"
                  type="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="payment_received">Payment received</option>
                  <option value="in_progress">In progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </Input>
              </FormGroup>
            </div>
            <div className="col-12 col-md-2 col-lg-2 d-flex gap-2">
              <Button color="primary" type="submit">
                Apply
              </Button>
              <Button
                color="secondary"
                outline
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatus("all");
                  setPage(1);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>

        {error ? <div className="alert alert-danger">{error}</div> : null}
        {loading ? <div className="text-muted">Loading orders…</div> : null}

        {!loading && payload ? (
          <>
            <div className="small text-muted mb-2">
              Showing {orders.length} of {payload.total} (source: {payload.source || "unknown"})
            </div>

            <div className="table-responsive d-none d-md-block admin-stat-card bg-white">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Area</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="text-nowrap fw-semibold">{o.order_number}</td>
                      <td>{o.name}</td>
                      <td className="text-nowrap">{o.phone}</td>
                      <td className="text-truncate" style={{ maxWidth: 160 }}>
                        {o.area}
                      </td>
                      <td className="text-nowrap">{formatPkr(o.grand_total)}</td>
                      <td>
                        <StatusBadge status={o.status} />
                      </td>
                      <td className="text-nowrap small">{formatDate(o.created_at)}</td>
                      <td className="text-end text-nowrap">
                        <Link href={`/admin/orders/${o.id}`} className="btn btn-sm btn-outline-primary">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-md-none">
              {orders.map((o) => (
                <div key={o.id} className="order-card-mobile bg-white p-3 mb-2">
                  <div className="d-flex justify-content-between gap-2">
                    <div className="fw-semibold">{o.order_number}</div>
                    <StatusBadge status={o.status} />
                  </div>
                  <div className="small text-muted">{o.name}</div>
                  <div className="small">{o.phone}</div>
                  <div className="small text-muted">{o.area}</div>
                  <div className="fw-semibold mt-2">{formatPkr(o.grand_total)}</div>
                  <div className="small text-muted mt-1">{formatDate(o.created_at)}</div>
                  <Link href={`/admin/orders/${o.id}`} className="btn btn-sm btn-primary mt-2 w-100">
                    View order
                  </Link>
                </div>
              ))}
            </div>

            <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-2 mt-3">
              <div className="small text-muted">
                Page {payload.page} / {payload.totalPages}
              </div>
              <div className="d-flex gap-2">
                <Button
                  color="secondary"
                  outline
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  color="secondary"
                  outline
                  size="sm"
                  disabled={page >= (payload.totalPages || 1)}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </AdminLayout>
    </ProtectedRoute>
  );
}

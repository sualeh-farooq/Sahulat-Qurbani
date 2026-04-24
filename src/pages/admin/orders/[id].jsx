import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaCalendarAlt,
  FaCreditCard,
  FaEnvelope,
  FaHashtag,
  FaLeaf,
  FaMapMarkerAlt,
  FaMosque,
  FaPhone,
  FaPrint,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import { Button, Spinner } from "reactstrap";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import StatusBadge from "@/components/admin/StatusBadge";

function formatPkr(n) {
  const num = Number(n || 0);
  return `Rs. ${num.toLocaleString("en-PK")}`;
}

function formatDateTime(iso) {
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

function yn(v) {
  if (v === true || v === "true") return "Yes";
  if (v === false || v === "false") return "No";
  return "—";
}

function DetailCard({ title, icon, children }) {
  return (
    <div className="order-detail-card p-3 p-md-4">
      <div className="order-detail-card__title d-flex align-items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Dl({ rows }) {
  return (
    <dl className="order-dl mb-0">
      {rows.map(([label, value], idx) => (
        <React.Fragment key={`${label}-${idx}`}>
          <dt>{label}</dt>
          <dd>{value ?? "—"}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

function SelectionBlock({ title, selected, quantity, names, subtotal }) {
  if (!selected) return null;
  return (
    <div className="border rounded-3 p-3 mb-2 bg-light">
      <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap">
        <div className="fw-semibold text-success">{title}</div>
        {subtotal != null ? <div className="fw-bold">{formatPkr(subtotal)}</div> : null}
      </div>
      <div className="small text-muted mt-1">Quantity: {quantity ?? "—"}</div>
      {names ? (
        <div className="names-pre mt-2 text-body">{names}</div>
      ) : (
        <div className="small text-muted mt-2">No names provided</div>
      )}
    </div>
  );
}

export default function AdminOrderDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady || !id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/admin/orders/${id}`, { credentials: "include" });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load order");
        if (!cancelled) {
          setOrder(json.order);
          setSource(json.source || "");
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, id]);

  const meatNote = useMemo(() => {
    if (!order) return null;
    if (order.meat_option === "Delivery") {
      return "Packaging & delivery (Rs. 2,500 per hissa) was included in line totals where applicable.";
    }
    return "Customer selected self pickup.";
  }, [order]);

  if (!router.isReady || !id) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Order">
          <div className="d-flex justify-content-center py-5">
            <Spinner color="primary" />
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout title={order ? `Order ${order.order_number}` : "Order detail"}>
        <div id="order-print-root">
          {error ? (
            <div className="alert alert-danger d-flex align-items-center justify-content-between flex-wrap gap-2">
              <span>{error}</span>
              <Link href="/admin/orders" className="btn btn-sm btn-outline-dark">
                Back to orders
              </Link>
            </div>
          ) : null}

          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner color="primary" />
            </div>
          ) : null}

          {!loading && order ? (
            <>
              <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-start justify-content-between gap-3 mb-3 no-print">
                <Link href="/admin/orders" className="btn btn-outline-secondary btn-sm align-self-start">
                  ← Orders list
                </Link>
                <Button color="outline-dark" size="sm" className="align-self-stretch align-self-md-end" onClick={() => window.print()}>
                  <FaPrint className="me-2" />
                  Print summary
                </Button>
              </div>

              <div className="order-detail-hero mb-4">
                <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
                  <div>
                    <div className="text-white-75 small d-flex align-items-center gap-2 mb-1">
                      <FaHashtag />
                      Booking reference
                    </div>
                    <h1 className="h4 mb-2 fw-bold">{order.order_number}</h1>
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <StatusBadge status={order.status} />
                      {source ? (
                        <span className="badge bg-light text-dark bg-opacity-25">Data: {source}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="text-white-75 small">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <FaCalendarAlt />
                      Submitted
                    </div>
                    <div className="fw-semibold text-white">{formatDateTime(order.created_at)}</div>
                    {order.updated_at ? (
                      <>
                        <div className="d-flex align-items-center gap-2 mt-2 mb-1">
                          <FaCalendarAlt />
                          Last updated
                        </div>
                        <div className="fw-semibold text-white">{formatDateTime(order.updated_at)}</div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="order-chip">
                  <FaCreditCard /> {order.payment_mode}
                </span>
                <span className="order-chip">
                  <FaMosque /> {order.qurbani_day}
                </span>
                <span className="order-chip">{order.maslak}</span>
                <span className="order-chip">
                  <FaTruck /> {order.meat_option}
                </span>
                <span className="order-chip">{order.qurbani_purpose}</span>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-12 col-xl-6">
                  <DetailCard title="Contact" icon={<FaUser className="text-success" />}>
                    <Dl
                      rows={[
                        ["Full name", order.name],
                        [
                          "Email",
                          <span key="em" className="d-inline-flex align-items-center gap-2">
                            <FaEnvelope className="text-muted" aria-hidden />
                            <a href={`mailto:${order.email}`} className="link-success text-break">
                              {order.email}
                            </a>
                          </span>,
                        ],
                        [
                          "Primary phone",
                          <span key="ph" className="d-inline-flex align-items-center gap-2">
                            <FaPhone className="text-muted" aria-hidden />
                            <a href={`tel:${order.phone}`} className="link-body text-decoration-none">
                              {order.phone}
                            </a>
                          </span>,
                        ],
                        ["Alternate phone", order.alternate_phone || "—"],
                      ]}
                    />
                  </DetailCard>
                </div>
                <div className="col-12 col-xl-6">
                  <DetailCard title="Address & area" icon={<FaMapMarkerAlt className="text-success" />}>
                    <Dl
                      rows={[
                        ["Address", order.address],
                        ["Delivery / pickup area", order.area],
                        ["Meat option", order.meat_option],
                        ["Note", meatNote],
                      ]}
                    />
                  </DetailCard>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-12 col-lg-7">
                  <DetailCard title="Qurbani preferences" icon={<FaMosque className="text-success" />}>
                    <Dl
                      rows={[
                        ["Purpose", order.qurbani_purpose],
                        ["Qurbani day", order.qurbani_day],
                        ["Maslak (Fiqah)", order.maslak],
                        ["Payment method", order.payment_mode],
                        ["Meat collection", order.meat_option],
                      ]}
                    />
                  </DetailCard>
                </div>
                <div className="col-12 col-lg-5">
                  <DetailCard title="Animal hides donation" icon={<FaLeaf className="text-success" />}>
                    <p className="mb-2 small text-muted">
                      Same agreement as on the public booking form: donate animal skin to an Islamic institution.
                    </p>
                    <div className="fs-5 fw-semibold">{yn(order.hide_donation_agreed)}</div>
                  </DetailCard>
                </div>
              </div>

              <div className="order-detail-card p-3 p-md-4 mb-3">
                <div className="order-detail-card__title mb-3">Qurbani selections & names</div>
                <SelectionBlock
                  title="Camel Hissa (Rs. 48,000 base)"
                  selected={order.camel}
                  quantity={order.camel_quantity}
                  names={order.camel_names}
                  subtotal={order.camel_total}
                />
                <SelectionBlock
                  title="Cow Share (Rs. 25,500 base)"
                  selected={order.cow_share}
                  quantity={order.cow_share_quantity}
                  names={order.share_cow_names}
                  subtotal={order.share_cow_total}
                />
                <SelectionBlock
                  title="Full Cow (Rs. 178,500 base)"
                  selected={order.full_cow}
                  quantity={order.cow_full_quantity}
                  names={order.full_cow_names}
                  subtotal={order.full_cow_total}
                />
                <SelectionBlock
                  title="Cow Waqf Hissa (Rs. 19,000 base)"
                  selected={order.waqf_hissa}
                  quantity={order.waqf_quantity}
                  names={order.waqf_names}
                  subtotal={order.waqf_total}
                />
                {!order.camel && !order.cow_share && !order.full_cow && !order.waqf_hissa ? (
                  <p className="text-muted mb-0 small">No selection flags on record — see line items below.</p>
                ) : null}
              </div>

              <div className="order-detail-card p-3 p-md-4 mb-3">
                <div className="order-detail-card__title mb-3">Line items (stored breakdown)</div>
                {(order.items || []).length === 0 ? (
                  <p className="text-muted small mb-0">No line items on this order.</p>
                ) : (
                  <>
                    <div className="table-responsive d-none d-md-block">
                      <table className="table table-hover align-middle order-items-table mb-0">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Names</th>
                            <th className="text-end">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(order.items || []).map((it, idx) => (
                            <tr key={`${it.item_type}-${idx}`}>
                              <td className="fw-semibold">{it.item_type}</td>
                              <td>{it.quantity}</td>
                              <td className="text-nowrap">{formatPkr(it.price_per_unit)}</td>
                              <td className="names-pre" style={{ maxWidth: 280 }}>
                                {it.names}
                              </td>
                              <td className="text-end fw-semibold">{formatPkr(it.subtotal)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-md-none">
                      {(order.items || []).map((it, idx) => (
                        <div key={`${it.item_type}-m-${idx}`} className="order-item-mobile p-3 mb-2">
                          <div className="d-flex justify-content-between gap-2">
                            <div className="fw-semibold">{it.item_type}</div>
                            <div className="fw-bold">{formatPkr(it.subtotal)}</div>
                          </div>
                          <div className="small text-muted">
                            Qty {it.quantity} · {formatPkr(it.price_per_unit)} / unit
                          </div>
                          <div className="names-pre mt-2">{it.names}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="row g-3 mb-3">
                <div className="col-12 col-lg-5">
                  <div className="order-detail-card p-3 p-md-4 h-100">
                    <div className="order-detail-card__title mb-3">Payment summary</div>
                    <Dl
                      rows={[
                        ["Grand total", formatPkr(order.grand_total)],
                        ["Amount received", formatPkr(order.amount_paid)],
                        [
                          "Balance",
                          formatPkr(Number(order.grand_total || 0) - Number(order.amount_paid || 0)),
                        ],
                        ["Payment recorded on", formatDateTime(order.payment_date)],
                      ]}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-7">
                  <div className="order-detail-card p-3 p-md-4 h-100">
                    <div className="order-detail-card__title mb-3">Internal notes</div>
                    {order.admin_notes ? (
                      <p className="mb-0 names-pre">{order.admin_notes}</p>
                    ) : (
                      <p className="text-muted small mb-0">No admin notes for this booking.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="order-detail-card p-3 p-md-4 mb-4">
                <div className="order-detail-card__title mb-3">Status history</div>
                {(order.status_history || []).length === 0 ? (
                  <p className="text-muted small mb-0">No history rows yet.</p>
                ) : (
                  <div className="order-timeline">
                    {(order.status_history || []).map((h, idx) => (
                      <div key={h.id || `${h.status}-${h.created_at}-${idx}`} className="order-timeline__item">
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                          <StatusBadge status={h.status} />
                          <span className="small text-muted">{formatDateTime(h.created_at)}</span>
                        </div>
                        <div className="small text-muted">
                          {h.changed_by ? <>By {h.changed_by}</> : null}
                          {h.notes ? (
                            <>
                              {h.changed_by ? " · " : null}
                              {h.notes}
                            </>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

import React from "react";

const map = {
  pending: { className: "bg-warning text-dark", label: "Pending" },
  confirmed: { className: "bg-info text-dark", label: "Confirmed" },
  payment_received: { className: "bg-primary", label: "Payment received" },
  in_progress: { className: "bg-secondary", label: "In progress" },
  completed: { className: "bg-success", label: "Completed" },
  cancelled: { className: "bg-danger", label: "Cancelled" },
};

export default function StatusBadge({ status }) {
  const key = status || "pending";
  const cfg = map[key] || { className: "bg-light text-dark", label: key };
  return <span className={`badge ${cfg.className}`}>{cfg.label}</span>;
}

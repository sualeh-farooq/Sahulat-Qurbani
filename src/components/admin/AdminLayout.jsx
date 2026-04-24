import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "reactstrap";

export default function AdminLayout({ title, children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const path = router.pathname || "";

  const navLink = (href, label) => {
    const active = path === href;
    return (
      <Link
        href={href}
        className={`d-block py-2 px-3 rounded text-decoration-none ${
          active ? "bg-white text-dark fw-semibold" : "text-white-50"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        {label}
      </Link>
    );
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.replace("/admin/login");
  };

  return (
    <div className="admin-root">
      <div
        className={`admin-sidebar-backdrop d-lg-none ${sidebarOpen ? "is-open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <div className="d-flex">
        <aside
          className={`admin-sidebar bg-dark text-white p-3 d-flex flex-column ${
            sidebarOpen ? "is-open" : ""
          }`}
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="fw-bold fs-5">Sahulat Qurbani</div>
            <button
              type="button"
              className="btn-close btn-close-white d-lg-none"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          <nav className="d-flex flex-column gap-1 flex-grow-1">
            {navLink("/admin/dashboard", "Dashboard")}
            {navLink("/admin/orders", "Orders")}
          </nav>
          <Button color="light" outline size="sm" className="mt-3" onClick={logout}>
            Log out
          </Button>
        </aside>

        <div className="admin-main flex-grow-1">
          <header className="bg-white border-bottom py-3 px-3 px-lg-4 d-flex align-items-center gap-3">
            <Button
              color="dark"
              outline
              size="sm"
              className="d-lg-none"
              type="button"
              onClick={() => setSidebarOpen(true)}
            >
              Menu
            </Button>
            <div className="fw-semibold fs-5 flex-grow-1">{title || "Admin"}</div>
          </header>
          <main className="p-3 p-lg-4">{children}</main>
        </div>
      </div>
    </div>
  );
}

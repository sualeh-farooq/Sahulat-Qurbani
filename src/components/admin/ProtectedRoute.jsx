import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "reactstrap";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [state, setState] = useState({ loading: true, ok: false });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/verify", { credentials: "include" });
        if (!res.ok) throw new Error("unauthorized");
        if (!cancelled) setState({ loading: false, ok: true });
      } catch {
        if (!cancelled) {
          setState({ loading: false, ok: false });
          router.replace("/admin/login");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (state.loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 admin-root">
        <div className="text-center">
          <Spinner color="primary" className="mb-3" />
          <div className="text-muted small">Checking session…</div>
        </div>
      </div>
    );
  }

  if (!state.ok) return null;
  return <>{children}</>;
}

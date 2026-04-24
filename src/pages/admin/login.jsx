import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/verify", { credentials: "include" });
        if (res.ok && !cancelled) {
          await router.replace("/admin/dashboard");
        }
      } catch {
        /* stay on login */
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      await router.replace("/admin/dashboard");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="admin-root d-flex align-items-center justify-content-center min-vh-100">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="admin-root d-flex align-items-center justify-content-center min-vh-100 px-3">
      <div className="admin-login-card bg-white p-4 p-md-5">
        <div className="text-center mb-4">
          <div className="fw-bold fs-4">Sahulat Qurbani</div>
          <div className="text-muted small">Admin sign in</div>
        </div>
        {error ? <Alert color="danger">{error}</Alert> : null}
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label for="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </FormGroup>
          <FormGroup>
            <Label for="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </FormGroup>
          <Button color="primary" className="mt-2 w-100" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </Form>
        <div className="text-muted small mt-3 text-center">
          Mock account: admin@sahulat-qurbani.com / admin123
        </div>
      </div>
    </div>
  );
}

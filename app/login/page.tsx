"use client";

import { FormEvent, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: "40px auto" }}>
      <h1>Entrar no Portal</h1>
      <p className="muted">
        Use seu e-mail para receber um link de acesso seguro.
      </p>

      {sent ? (
        <div className="badge" style={{ marginTop: 16 }}>
          Link enviado. Verifique seu e-mail.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginTop: 20 }}>
          <label>
            <span className="muted">E-mail</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="seuemail@exemplo.com"
              style={{
                width: "100%",
                marginTop: 6,
                padding: 12,
                borderRadius: 10,
                border: "1px solid #253751",
                background: "#0b1728",
                color: "#eef4fb"
              }}
            />
          </label>

          {error && <div className="pill">{error}</div>}

          <button className="btn primary" type="submit">
            Enviar link de acesso
          </button>
        </form>
      )}
    </div>
  );
}

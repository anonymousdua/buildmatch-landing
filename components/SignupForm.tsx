"use client";

import { useState, type FormEvent } from "react";
import type { Role } from "@/lib/content";

const FALLBACK = "Something went wrong. Please try again.";

export default function SignupForm({ role, cta }: { role: Role; cta: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), role, company: form.get("company") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || FALLBACK);
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : FALLBACK);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="thanks" role="status">
        <h4>Thanks, you&apos;re in.</h4>
        <p>Your free guide is ready. We&apos;ve also sent the link to your inbox.</p>
        <a className="btn primary" href="/guide">Open the free guide</a>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <label htmlFor={`email-${role}`}>Work email</label>
      <input id={`email-${role}`} name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@company.com" />
      <div className="hp" aria-hidden="true">
        <label htmlFor={`company-${role}`}>Company</label>
        <input id={`company-${role}`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn accent" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : cta}
      </button>
      {error && <p className="err" role="alert">{error}</p>}
      <p className="small">Free. No card needed.</p>
    </form>
  );
}

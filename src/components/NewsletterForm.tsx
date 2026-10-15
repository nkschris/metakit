"use client";

import { FormEvent, useState } from "react";

/**
 * Newsletter signup UI.
 * TODO: Plug in Resend (or equivalent) — POST email to your API route / Resend audience.
 * For now this is a client-side placeholder that does not send email.
 */
export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    // TODO(Resend): replace with fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
    console.info("[newsletter placeholder] would subscribe:", email);
    setStatus("ok");
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        compact
          ? "flex w-full max-w-md flex-col gap-2 sm:flex-row"
          : "mx-auto flex w-full max-w-lg flex-col gap-3 sm:flex-row"
      }
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setStatus("idle");
        }}
        placeholder="you@builder.dev"
        className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
      >
        Subscribe
      </button>
      {status === "ok" && (
        <p className="w-full text-sm text-indigo-300 sm:col-span-2">
          You&apos;re on the list (demo — Resend not wired yet).
        </p>
      )}
      {status === "error" && (
        <p className="w-full text-sm text-red-400">Enter a valid email.</p>
      )}
    </form>
  );
}

"use client";

import { useState, FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-6 text-sm text-signal">
        Inscrit. Le prochain outil arrive par email.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex max-w-md gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ton@email.com"
        className="flex-1 rounded-md border border-paper/20 bg-transparent px-4 py-2 text-sm placeholder:text-paper/40 focus:border-signal focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-signal px-5 py-2 text-sm font-medium text-ink transition hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "..." : "S'inscrire"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400">Erreur, réessaie.</p>
      )}
    </form>
  );
}

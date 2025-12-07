"use client";

import { useState } from "react";

export default function DeveloperNewProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<null | string>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);

    try {
      const r = await fetch("/api/developer/products/new", {
        method: "POST",
        body: JSON.stringify({ name, description }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await r.json();

      if (data.ok) {
        setStatus("Product created");
        setName("");
        setDescription("");
      } else {
        setStatus("Failed to create product");
      }
    } catch {
      setStatus("Error contacting server");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">New Product</h1>

      <form onSubmit={submit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="border p-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="border p-2 w-full rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {busy ? "Saving..." : "Create Product"}
        </button>
      </form>

      {status && <p className="text-muted-foreground">{status}</p>}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function NewLicencePage() {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/licence/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, product })
      });

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch {
      setResult("Error generating licence");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Generate WFSL Licence</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label>Customer</label>
          <input
            type="text"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Product</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            background: "#0060FF",
            colour: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          {loading ? "Generating..." : "Create Licence"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Licence Output</h2>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "20px",
              whiteSpace: "pre-wrap",
              borderRadius: "6px",
              overflowX: "auto"
            }}
          >
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}

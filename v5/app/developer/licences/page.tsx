"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Licence {
  id: string;
  product: string;
  customer: string;
  durationYears: number;
  issued: number;
}

export default function LicencesPage() {
  const [licences, setLicences] = useState<Licence[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/developer/licences");
      const data = await res.json();
      setLicences(data.licences || []);
    }
    load();
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Licences</h1>

      <Link href="/developer/licences/new">Create New Licence</Link>

      <div style={{ marginTop: "30px" }}>
        {licences.length === 0 && <p>No licences created yet.</p>}

        <ul>
          {licences.map((l) => (
            <li key={l.id} style={{ marginBottom: "10px" }}>
              <strong>{l.customer}</strong>  
              <div>Product: {l.product}</div>
              <div>Duration: {l.durationYears} years</div>
              <div>Issued: {new Date(l.issued).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
}

export default function NewLicencePage() {
  const [customer, setCustomer] = useState("");
  const [durationYears, setDurationYears] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/developer/products");
      const data = await res.json();
      setProducts(data.products || []);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/developer/licences/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer, productId, durationYears })
    });

    if (res.ok) {
      router.push("/developer/licences");
    } else {
      alert("Error creating licence");
    }
  }

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Create New Licence</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label>Customer Name</label>
          <input
            type="text"
            required
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Product</label>
          <select
            required
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          >
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Duration (years)</label>
          <input
            type="number"
            min="1"
            max="9"
            value={durationYears}
            onChange={(e) => setDurationYears(Number(e.target.value))}
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
          Create Licence
        </button>
      </form>
    </div>
  );
}

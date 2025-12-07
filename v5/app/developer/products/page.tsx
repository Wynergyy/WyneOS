"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description?: string;
}

export default function DeveloperProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr(null);

      try {
        const r = await fetch("/api/developer/products");
        const data = await r.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setErr("Invalid response");
        }
      } catch {
        setErr("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>

      {loading && <p>Loading...</p>}
      {err && <p className="text-red-500">{err}</p>}

      <div className="space-y-4">
        {products.length === 0 && !loading && (
          <p className="text-muted-foreground">No products found.</p>
        )}

        {products.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded shadow-sm bg-white space-y-1"
          >
            <h2 className="text-lg font-semibold">{p.name}</h2>
            {p.description && (
              <p className="text-sm text-muted-foreground">{p.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface ProductRecord {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
}

export default function DeveloperProductsPage() {
  const [items, setItems] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const r = await fetch("/api/developer/products");
        const data = await r.json();

        if (active && Array.isArray(data.products)) {
          setItems(data.products);
        }
      } catch {
        if (active) setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Developer Products</h1>
        <p className="mt-4 text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Developer Products</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">No products found.</p>
      ) : (
        <div className="space-y-4">
          {items.map((p) => (
            <div
              key={p.id}
              className="border p-4 rounded-md bg-card shadow-sm space-y-1"
            >
              <p className="font-semibold">{p.name}</p>
              {p.description && <p>{p.description}</p>}
              <p className="text-sm text-muted-foreground">
                Created {new Date(p.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

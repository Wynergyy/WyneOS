"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  created: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/developer/products");
      const data = await res.json();
      setProducts(data.products || []);
    }
    load();
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Products</h1>

      <Link href="/developer/products/new">Create New Product</Link>

      <div style={{ marginTop: "30px" }}>
        {products.length === 0 && <p>No products created yet.</p>}

        <ul>
          {products.map((p) => (
            <li key={p.id} style={{ marginBottom: "10px" }}>
              <strong>{p.name}</strong>  
              <div style={{ opacity: 0.7 }}>
                ID: {p.id}  
              </div>
              <div style={{ fontSize: "14px" }}>
                Created: {new Date(p.created).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

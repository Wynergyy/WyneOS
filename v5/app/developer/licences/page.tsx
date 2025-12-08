"use client";

import { useEffect, useState } from "react";

interface LicenceRecord {
  id: string;
  product: string;
  createdAt: number;
  metadata?: Record<string, unknown>;
}

export default function DeveloperLicencesPage() {
  const [items, setItems] = useState<LicenceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const r = await fetch("/api/developer/licences");
        const data = await r.json();

        if (mounted && Array.isArray(data.licences)) {
          setItems(data.licences);
        }
      } catch {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Developer Licences</h1>
        <p className="mt-4 text-muted-foreground">Loading licences...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Developer Licences</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">No licences found.</p>
      ) : (
        <div className="space-y-4">
          {items.map((lic) => (
            <div
              key={lic.id}
              className="border p-4 rounded-md bg-card shadow-sm"
            >
              <p className="font-semibold">ID: {lic.id}</p>
              <p>Product: {lic.product}</p>
              <p>Created: {new Date(lic.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

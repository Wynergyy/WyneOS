"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function SyncPanel() {
  const [loading, setLoading] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function runSync() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/sync", { method: "GET", cache: "no-store" });
      if (!res.ok) throw new Error("Sync API returned an error.");

      const data = await res.json();
      setSyncResult(data);
    } catch (err: any) {
      setError("Failed to run sync cycle.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">WFSL Sync Engine</h1>
      <Separator />

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Run Sync Cycle</h2>

        <Button onClick={runSync} disabled={loading}>
          {loading ? "Running..." : "Run Sync Now"}
        </Button>

        {error && <p className="text-red-600">{error}</p>}

        {syncResult && (
          <div className="space-y-2 text-sm">
            <p>Sync ID: <span className="font-mono">{syncResult.syncId}</span></p>
            <p>Packet Hash: <span className="font-mono">{syncResult.packetHash}</span></p>
            <p>Packet Size: {syncResult.packetSize} bytes</p>
            <p>Telemetry Events: {syncResult.telemetryCount}</p>
            <p>Generated At: {syncResult.generatedAt}</p>
            <p>Stored At: <span className="font-mono">{syncResult.file}</span></p>
          </div>
        )}
      </Card>

      {syncResult && (
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Raw Sync Packet JSON</h2>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
{JSON.stringify(syncResult, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}

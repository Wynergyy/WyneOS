"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TelemetryMatrix() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/telemetry", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load telemetry data.");
      setData(await res.json());
      setError(null);
    } catch (err: any) {
      setError("Failed to load telemetry queue.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Telemetry Matrix</h1>
      <Separator />

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Queue Overview</h2>

        {loading && <p>Loading telemetry queue...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {data && (
          <div className="space-y-2">
            <p className="text-sm">Events in queue: {data.count}</p>
            <p className="text-sm font-mono">Queue Hash: {data.queueHash}</p>
          </div>
        )}
      </Card>

      {data?.queue && data.queue.length > 0 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Telemetry Events</h2>

          <div className="space-y-4">
            {data.queue.map((event: any, index: number) => (
              <Card key={index} className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">
                    {event.t} – {event.id}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {event.ts}
                  </p>
                </div>

                <p className="text-xs">
                  Module: <span className="font-mono">{event.m}</span>
                </p>

                <p className="text-xs">
                  Version: <span className="font-mono">{event.v}</span>
                </p>

                <p className="text-xs">
                  Payload Hash: <span className="font-mono">{event.h}</span>
                </p>

                <p className="text-xs">
                  Queue Item Hash: <span className="font-mono">{event.qh}</span>
                </p>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* Raw JSON data block */}
      {data && (
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Raw Telemetry JSON</h2>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
{JSON.stringify(data, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}

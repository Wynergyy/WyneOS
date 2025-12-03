"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import IntegrityStatus from "@/components/integrity/IntegrityStatus";
import IntegrityTimeline from "@/components/integrity/IntegrityTimeline";
import { useIntegrityRefresh } from "@/hooks/useIntegrityRefresh";

export default function IntegrityDashboard() {
  const { data, loading, error } = useIntegrityRefresh(5000);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">WFSL Integrity Engine</h1>
      <Separator />

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">System Integrity Overview</h2>

        {loading && <p>Loading integrity results...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {data && <IntegrityStatus data={data} />}
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Raw Snapshot Data</h2>

        <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
{JSON.stringify(data, null, 2)}
        </pre>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Integrity Event Timeline</h2>

        {data?.history ? (
          <IntegrityTimeline history={data.history} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Timeline unavailable.
          </p>
        )}
      </Card>
    </div>
  );
}

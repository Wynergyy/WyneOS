"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SyncAssemblePanel() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function assemble() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/sync/assemble", {
        method: "GET",
        cache: "no-store"
      });

      if (!res.ok) throw new Error("Sync Assembly failed.");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Failed to assemble sync package.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">WFSL Sync Assembly</h1>
      <Separator />

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Assemble Outbound Sync Package</h2>

        <Button onClick={assemble} disabled={loading}>
          {loading ? "Assembling..." : "Assemble Sync Package"}
        </Button>

        {error && <p className="text-red-600">{error}</p>}

        {result && (
          <div className="space-y-2 text-sm">
            <p>Packet Hash: <span className="font-mono">{result.packetHash}</span></p>
            <p>Packet Size: {result.packetSize} bytes</p>
            <p>Encryption: {result.encryptionEnabled ? "Enabled" : "Disabled"}</p>
            <p>Signing: {result.signingEnabled ? "Enabled" : "Disabled"}</p>
            <p>Generated At: {result.timestamp}</p>

            <p>Raw Packet File:</p>
            <p className="font-mono text-xs">{result.rawFile}</p>

            {result.encryptedFile && (
              <>
                <p>Encrypted Packet File:</p>
                <p className="font-mono text-xs">{result.encryptedFile}</p>
              </>
            )}

            {result.signatureFile && (
              <>
                <p>Signature File:</p>
                <p className="font-mono text-xs">{result.signatureFile}</p>
              </>
            )}
          </div>
        )}
      </Card>

      {result && (
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Raw JSON Output</h2>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
{JSON.stringify(result, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}

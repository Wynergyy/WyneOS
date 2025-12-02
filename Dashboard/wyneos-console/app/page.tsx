export default function Home() {
  return (
    <main className="min-h-screen p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">WyneOS Console</h1>

      <p className="text-gray-300 mb-10">
        Unified operational overview of all WyneOS components. This dashboard
        reports live system health, governance status, integrity checks,
        telemetry flow, scheduled task execution, and heartbeat performance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SGI */}
        <div className="border border-gray-700 p-6 rounded-xl bg-black/40 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">SGI Engine</h2>
          <p className="text-gray-400">
            Core infrastructure. Ensures system integrity, self-healing, and operational consistency.
          </p>
        </div>

        {/* Guardian */}
        <div className="border border-gray-700 p-6 rounded-xl bg-black/40 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">Guardian</h2>
          <p className="text-gray-400">
            Monitors WyneOS structure, validates required files, and repairs missing components.
          </p>
        </div>

        {/* Integrity */}
        <div className="border border-gray-700 p-6 rounded-xl bg-black/40 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">Integrity Engine</h2>
          <p className="text-gray-400">
            Tracks hash values, detects tampering, and validates the state baseline.
          </p>
        </div>

        {/* Telemetry */}
        <div className="border border-gray-700 p-6 rounded-xl bg-black/40 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">Telemetry Pipeline</h2>
          <p className="text-gray-400">
            Collects and processes system logs, events, alerts, and SGI signals.
          </p>
        </div>

        {/* Heartbeat */}
        <div className="border border-gray-700 p-6 rounded-xl bg-black/40 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">Heartbeat Monitor</h2>
          <p className="text-gray-400">
            Records operational heartbeat entries every few minutes.
          </p>
        </div>

        {/* Policy */}
        <div className="border border-gray-700 p-6 rounded-xl bg-black/40 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">Policy Engine</h2>
          <p className="text-gray-400">
            Applies governance rules, validates system policy, and enforces compliance.
          </p>
        </div>

        {/* Logs */}
        <div className="border border-gray-700 p-6 rounded-xl bg-black/40 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">System Logs</h2>
          <p className="text-gray-400">
            Consolidated view of SGI, Guardian, Integrity, Policy, Telemetry, and Heartbeat logs.
          </p>
        </div>

        {/* Upgrade */}
        <div className="border border-gray-700 p-6 rounded-xl bg-black/40 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">Upgrade Engine</h2>
          <p className="text-gray-400">
            Scheduled WyneOS update process running every 2 hours.
          </p>
        </div>

      </div>
    </main>
  );
}

import Link from "next/link";

export default function PolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">WyneOS Console</h1>

      <h2 className="text-2xl font-semibold mb-4">WyneOS Policy Engine</h2>
      <p className="mb-8 text-gray-300">
        The Policy Engine enforces operational rules across WyneOS, SGI, Guardian,
        Integrity, Telemetry and Heartbeat systems. This dashboard will visualise
        policy compliance, violations, pending rules and enforcement outcomes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-700 bg-gray-900 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Policy Compliance</h3>
          <p className="text-gray-400">Percentage of systems currently passing all enforcement checks.</p>
        </div>

        <div className="border border-gray-700 bg-gray-900 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Active Policies</h3>
          <p className="text-gray-400">Total number of active rules applied across WyneOS subsystems.</p>
        </div>

        <div className="border border-gray-700 bg-gray-900 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Violations</h3>
          <p className="text-gray-400">Count of current or recent policy failures requiring review.</p>
        </div>

        <div className="border border-gray-700 bg-gray-900 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Rule Engine</h3>
          <p className="text-gray-400">Placeholder for future dynamic rule compilation and execution logs.</p>
        </div>
      </div>

      <div className="mt-16">
        <Link href="/" className="text-gray-400 hover:text-white">
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}

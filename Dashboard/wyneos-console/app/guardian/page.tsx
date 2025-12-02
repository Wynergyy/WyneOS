export default function GuardianPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Guardian Watch Engine</h2>

      <p className="text-neutral-400">
        Guardian monitors WyneOS resilience, detects anomalies,
        validates task execution, and enforces threat-response actions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Watchdog Status</h3>
          <p className="text-neutral-400 text-sm">
            Awaiting live signal from SGI Guardian scheduled task.
          </p>
        </div>

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Alert Summary</h3>
          <p className="text-neutral-400 text-sm">
            In future this will stream alerts from WyneOS alert engine.
          </p>
        </div>

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Recent Events</h3>
          <p className="text-neutral-400 text-sm">
            Pulls Guardian-level events from Event Catalogue.
          </p>
        </div>

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">State Validation</h3>
          <p className="text-neutral-400 text-sm">
            Verifies that auto-repair engines are running on schedule.
          </p>
        </div>

      </div>
    </div>
  );
}

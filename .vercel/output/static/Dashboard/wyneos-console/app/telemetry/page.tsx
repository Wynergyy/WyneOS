export default function TelemetryPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">WyneOS Telemetry</h2>

      <p className="text-neutral-400">
        The Telemetry Engine collects signals from SGI, Guardian, Integrity, Policy,
        and Heartbeat services. This dashboard will visualise system health, trends,
        and real-time operational data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Event Stream Status</h3>
          <p className="text-neutral-400 text-sm">
            Indicates whether telemetry logs are flowing correctly.
          </p>
        </div>

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Log Volume</h3>
          <p className="text-neutral-400 text-sm">
            Total number of logs processed by WyneOS in the last 24 hours.
          </p>
        </div>

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Component Signals</h3>
          <p className="text-neutral-400 text-sm">
            Visual indicator of signal strength from SGI, Guardian, Integrity,
            Policy and Heartbeat components.
          </p>
        </div>

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Anomaly Detection</h3>
          <p className="text-neutral-400 text-sm">
            Placeholder for future machine rule validation and anomaly alerts.
          </p>
        </div>

      </div>
    </div>
  );
}

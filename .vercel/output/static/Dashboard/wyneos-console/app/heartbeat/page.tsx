export default function HeartbeatPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">WyneOS Heartbeat</h2>

      <p className="text-neutral-400">
        The Heartbeat Engine confirms WyneOS system liveness, scheduled task
        continuity, and runtime health across the SGI, Guardian, Integrity,
        Telemetry and Policy layers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Last Pulse</h3>
          <p className="text-neutral-400 text-sm">
            Displays timestamp of the most recent heartbeat signal.
          </p>
        </div>

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Engine Status</h3>
          <p className="text-neutral-400 text-sm">
            Shows whether the heartbeat scheduled task is running.
          </p>
        </div>

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Service Reachability</h3>
          <p className="text-neutral-400 text-sm">
            Confirms if SGI, Guardian and Integrity components are reachable.
          </p>
        </div>

        <div className="p-4 border border-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Runtime Stability</h3>
          <p className="text-neutral-400 text-sm">
            Future integration will analyse heartbeat variation across cycles.
          </p>
        </div>

      </div>
    </div>
  );
}

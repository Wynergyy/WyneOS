"use client";

import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-900 h-screen p-6 border-r border-neutral-800">
      <h2 className="text-xl font-bold mb-6">WyneOS Admin</h2>

      <nav className="flex flex-col space-y-3">
        <Link href="/admin/dashboard" className="hover:text-blue-400">
          Dashboard
        </Link>

        <Link href="/admin/apps" className="hover:text-blue-400">
          Apps
        </Link>

        <Link href="/admin/kernel" className="hover:text-blue-400">
          Kernel
        </Link>

        <Link href="/admin/telemetry" className="hover:text-blue-400">
          Telemetry
        </Link>

        <Link href="/admin/security" className="hover:text-blue-400">
          Security Grid
        </Link>

        <Link href="/admin/governance" className="hover:text-blue-400">
          Governance
        </Link>
      </nav>
    </aside>
  );
}

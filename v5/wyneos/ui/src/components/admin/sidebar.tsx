import Link from "next/link";
import { NAV_ITEMS } from "./nav-items";

export function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6">
      <h2 className="text-xl font-bold mb-6">WyneOS Admin</h2>
      <nav className="space-y-3">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded hover:bg-neutral-800 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

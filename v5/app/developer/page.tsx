"use client";

import Link from "next/link";

export default function DeveloperHome() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>WFSL Developer Licensing Platform</h1>
      <p style={{ marginTop: "10px" }}>
        Manage products, licences, API keys, and audit logs from one dashboard.
      </p>

      <div style={{ marginTop: "40px" }}>
        <ul style={{ lineHeight: "2.2", fontSize: "18px" }}>
          <li>
            <Link href="/developer/products">Manage Products</Link>
          </li>
          <li>
            <Link href="/developer/licences">Manage Licences</Link>
          </li>
          <li>
            <Link href="/developer/logs">View Audit Logs</Link>
          </li>
          <li>
            <Link href="/developer/settings">Developer Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

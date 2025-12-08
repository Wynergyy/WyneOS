import "./globals.css";

export const metadata = {
  title: "WyneOS Console",
  description: "Unified system console for SGI, Guardian, Integrity, Telemetry, Heartbeat and Policy engines",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100">
        <header className="p-4 border-b border-neutral-800">
          <h1 className="text-2xl font-bold tracking-wide">WyneOS Console</h1>
        </header>

        <main className="p-6">
          {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WyneOS Runtime v5",
  description: "Phase 6 WyneOS control surface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-neutral-100">
        {children}
      </body>
    </html>
  );
}

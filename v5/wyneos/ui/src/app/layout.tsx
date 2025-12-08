import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WyneOS UI",
  description: "Unified Interface for WyneOS Operational Controls"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

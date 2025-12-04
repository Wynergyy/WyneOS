import "./globals.css";

export const metadata = {
  title: "WyneOS",
  description: "A long-horizon digital framework for resilient, ethical, human-centred systems."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
          <h1 style={{ margin: 0, fontSize: "26px" }}>WyneOS</h1>
          <p style={{ margin: 0, color: "#666" }}>Foundations for a Century-Scale Future</p>
        </header>

        <main style={{ padding: "20px" }}>{children}</main>

        <footer style={{ padding: "20px", borderTop: "1px solid #ddd", marginTop: "40px", textAlign: "center", color: "#777" }}>
          © {new Date().getFullYear()} WyneOS. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

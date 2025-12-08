export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: "20px", minHeight: "100vh", background: "#111", color: "white" }}>
      <h1 style={{ marginBottom: "20px" }}>WyneOS Admin Suite</h1>
      {children}
    </div>
  );
}

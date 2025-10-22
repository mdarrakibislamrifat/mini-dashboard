export default function DashboardPage() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 rounded-xl border bg-card shadow-sm">
        <p className="text-sm text-muted-foreground">Total Products</p>
        <h2 className="text-2xl font-bold mt-1">120</h2>
      </div>
      <div className="p-4 rounded-xl border bg-card shadow-sm">
        <p className="text-sm text-muted-foreground">Total Orders</p>
        <h2 className="text-2xl font-bold mt-1">45</h2>
      </div>
    </div>
  );
}

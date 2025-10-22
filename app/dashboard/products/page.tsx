import { ProductsTable } from "@/components/products/products-table";

export default function ProductsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <p className="mt-2 text-muted-foreground">
          Manage and view all your products
        </p>
      </div>
      <ProductsTable />
    </div>
  );
}

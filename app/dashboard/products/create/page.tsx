import { ProductForm } from "@/components/product-form";

export default function CreateProductPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
        <p className="text-muted-foreground mt-2">
          Add a new product to your inventory
        </p>
      </div>
      <ProductForm />
    </div>
  );
}

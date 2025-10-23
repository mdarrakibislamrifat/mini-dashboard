"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ProductsTable } from "@/components/products/products-table";

export default function ProductsPage() {
  const queryClient = useQueryClient();

  // Fetch all products
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("/api/products");
      return res.data.data;
    },
    refetchOnMount: "always",
  });

  // Mutation for deleting a product
  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/products/${id}`),
    onSuccess: () => {
      // Refetch products after successful deletion
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // Handler for delete button
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <ProductsTable
      data={data}
      onDelete={handleDelete}
    />
  );
}

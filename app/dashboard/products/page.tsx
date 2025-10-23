"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductsTable } from "@/components/products/products-table";

export default function ProductsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("/api/products");
      return res.data.data;
    },
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return <ProductsTable data={data} />;
}

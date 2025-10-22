"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockIndicator } from "./indicators/stock-indicator";
import { StatusBadge } from "./indicators/status-badge";
import { ActionMenu } from "./action-menu";

export interface ProductData {
  _id: string;
  id?: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
  active: boolean;
}

export const columns: ColumnDef<ProductData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        SKU
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"));
      return <div className="font-medium">${price.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <StockIndicator stock={row.getValue("stock")} />,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const active = row.original.active;
      return <StatusBadge status={active ? "active" : "inactive"} />;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-xs truncate text-sm text-muted-foreground">
          {description || "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionMenu product={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];

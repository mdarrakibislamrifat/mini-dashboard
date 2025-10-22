"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockIndicator } from "./indicators/stock-indicator";
import { StatusBadge } from "./indicators/status-badge";
import { SatisfactionRating } from "./indicators/satisfaction-rating";
import { DeliveryProgress } from "./indicators/delivery-progress";
import { SalesSparkline } from "./indicators/sales-sparkline";
import { ActionMenu } from "./action-menu";

export interface ProductData {
  id: string;
  name: string;
  category: string;
  stock: number;
  status: "active" | "inactive";
  satisfaction: number;
  deliveryProgress: number;
  salesData: number[];
  price: number;
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "satisfaction",
    header: "Satisfaction",
    cell: ({ row }) => (
      <SatisfactionRating rating={row.getValue("satisfaction")} />
    ),
  },
  {
    accessorKey: "deliveryProgress",
    header: "Delivery",
    cell: ({ row }) => (
      <DeliveryProgress progress={row.getValue("deliveryProgress")} />
    ),
  },
  {
    accessorKey: "salesData",
    header: "Sales (7d)",
    cell: ({ row }) => <SalesSparkline data={row.getValue("salesData")} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionMenu product={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];

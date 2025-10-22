"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { ProductData } from "./columns";

interface TableFiltersProps {
  table: Table<ProductData>;
}

export function TableFilters({ table }: TableFiltersProps) {
  const categories = ["Electronics", "Accessories", "Office"];
  const statuses = ["active", "inactive"];

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Category <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              onCheckedChange={(checked) => {
                if (checked) {
                  const currentFilter = table
                    .getColumn("category")
                    ?.getFilterValue() as string[];
                  table
                    .getColumn("category")
                    ?.setFilterValue([...(currentFilter || []), category]);
                } else {
                  const currentFilter = table
                    .getColumn("category")
                    ?.getFilterValue() as string[];
                  table
                    .getColumn("category")
                    ?.setFilterValue(
                      currentFilter?.filter((c) => c !== category)
                    );
                }
              }}
            >
              {category}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Status <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {statuses.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              onCheckedChange={(checked) => {
                if (checked) {
                  const currentFilter = table
                    .getColumn("status")
                    ?.getFilterValue() as string[];
                  table
                    .getColumn("status")
                    ?.setFilterValue([...(currentFilter || []), status]);
                } else {
                  const currentFilter = table
                    .getColumn("status")
                    ?.getFilterValue() as string[];
                  table
                    .getColumn("status")
                    ?.setFilterValue(
                      currentFilter?.filter((s) => s !== status)
                    );
                }
              }}
            >
              {status === "active" ? "Active" : "Inactive"}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

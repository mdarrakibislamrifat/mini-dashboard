// components/layout/orders/order-actions.tsx
"use client"

import { Order } from "@/lib/models/order"
import { MoreHorizontal, Edit, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface OrderActionsProps {
    order: Order
}

export function OrderActions({ order }: OrderActionsProps) {
    // Mock handler functions
    const handleEdit = () => {
        alert(`Editing order ${order.id}`)
        // In a real app: redirect to edit page or open a modal
    }
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete order ${order.id}?`)) {
            alert(`Deleting order ${order.id}`)
            // In a real app: call API to delete and refresh data
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-red-500">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
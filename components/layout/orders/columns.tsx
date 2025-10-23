// components/layout/orders/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown, Smile, Meh, Frown } from "lucide-react";
import { Order, PaymentStatus, Feedback } from "@/lib/models/order";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { OrderActions } from "./order-actions";


const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

// Helper function for Status Badge color
const getPaymentBadgeStyle = (status: PaymentStatus) => {
    switch (status) {
        case 'Paid': return 'bg-green-500 hover:bg-green-500/80';
        case 'Pending': return 'bg-yellow-500 hover:bg-yellow-500/80';
        case 'Failed': return 'bg-red-500 hover:bg-red-500/80';
    }
};

// Helper function for Feedback Icon
const FeedbackIcon = ({ feedback }: { feedback: Feedback }) => {
    const size = 16;
    switch (feedback) {
        case 'happy': return <Smile className="text-green-500" size={size} />;
        case 'neutral': return <Meh className="text-yellow-500" size={size} />;
        case 'unhappy': return <Frown className="text-red-500" size={size} />;
    }
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <Link href={`/dashboard/orders/${row.original.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                {row.original.id}
            </Link>
        ),
    },

    // 2. Client Name (Avatar + Name)
    {
        accessorKey: "clientName",
        header: "Client Name",
        cell: ({ row }) => (
            <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-slate-200">
                        {getInitials(row.original.clientName)}
                    </AvatarFallback>
                </Avatar>
                <span>{row.original.clientName}</span>
            </div>
        ),
    },

    // 3. Payment Status (Colored badge)
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        cell: ({ row }) => (
            <Badge className={getPaymentBadgeStyle(row.original.paymentStatus)}>
                {row.original.paymentStatus}
            </Badge>
        ),
    },

    // 4. Delivery Status (Progress chip - using Badge for simplicity here)
    {
        accessorKey: "deliveryStatus",
        header: "Delivery Status",
        cell: ({ row }) => (
            <Badge variant="secondary" className="capitalize">
                {row.original.deliveryStatus}
            </Badge>
        ),
    },

    // 5. Total Amount (Currency formatted)
    {
        accessorKey: "totalAmount",
        header: "Total Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalAmount"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return <div className="font-medium">{formatted}</div>;
        },
    },

    // 6. Delivery Graph (Mini progress bar)
    {
        accessorKey: "deliveryPercentage",
        header: "Delivery %",
        cell: ({ row }) => (
            <Progress value={row.original.deliveryPercentage} className="w-[100px] h-2" />
        ),
    },

    // 7. Customer Feedback (Icon indicator)
    {
        accessorKey: "customerFeedback",
        header: "Feedback",
        cell: ({ row }) => (
            <FeedbackIcon feedback={row.original.customerFeedback} />
        ),
    },

    // New: Created At (Formatted timestamp)
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date: Date = row.getValue("createdAt");
            return <span>{date.toLocaleDateString()}</span>;
        },
    },

    // New: Actions (Edit/Delete)
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <OrderActions order={row.original} />,
    },
];
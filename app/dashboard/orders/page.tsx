// app/dashboard/orders/page.tsx
import { OrderOverview } from "@/components/layout/orders/order-overview";
import { OrdersTable } from "@/components/layout/orders/orders-table";


async function getOrderData() {
    const { mockOrders } = await import("@/lib/models/order");
    return mockOrders;
}

export default async function OrdersPage() {

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Order List Page</h1>

            {/* Charts on top of the table (overview cards) */}
            <OrderOverview />

            {/* TanStack Table with extended metrics */}
            <OrdersTable />
        </div>
    );
}
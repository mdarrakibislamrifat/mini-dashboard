// components/layout/orders/order-overview.tsx
import { Package, Truck, Clock, Smile } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
    { title: "Total Orders", value: 1250, icon: Package, color: "text-blue-500" },
    { title: "Delivered %", value: "85.4%", icon: Truck, color: "text-green-500" },
    { title: "Pending Deliveries", value: 184, icon: Clock, color: "text-yellow-500" },
    { title: "Avg. Client Satisfaction", value: "4.7/5", icon: Smile, color: "text-purple-500" },
];

export function OrderOverview() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {metrics.map((metric) => (
                <Card key={metric.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                        <metric.icon className={`h-4 w-4 ${metric.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metric.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
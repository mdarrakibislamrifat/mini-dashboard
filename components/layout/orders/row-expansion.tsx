// components/layout/orders/row-expansion.tsx
import { Order } from "@/lib/models/order"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface RowExpansionProps {
    order: Order
}

export function RowExpansion({ order }: RowExpansionProps) {
    return (
        <div className="p-4 bg-gray-50 border-t border-b">
            <h4 className="font-semibold mb-2">Product Details for Order {order.id}</h4>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-gray-50">
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {order.products.map((product) => (
                        <TableRow key={product.id} className="hover:bg-gray-100">
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell className="text-right">
                                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
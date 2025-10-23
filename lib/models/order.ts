// lib/models/order.ts

export type PaymentStatus = 'Paid' | 'Pending' | 'Failed';
export type DeliveryStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type Feedback = 'happy' | 'neutral' | 'unhappy';

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatarUrl: string | null; // For the Avatar component
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  totalAmount: number;
  deliveryPercentage: number; // 0-100 for the progress bar
  customerFeedback: Feedback;
  createdAt: Date;
  // For Row Expansion
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

// Example data (you would use a mock API or fetch real data)
export const mockOrders: Order[] = [
  {
    id: 'ORD-9876',
    clientId: 'C-001',
    clientName: 'Alice Johnson',
    clientAvatarUrl: null,
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    totalAmount: 1250.55,
    deliveryPercentage: 100,
    customerFeedback: 'happy',
    createdAt: new Date('2025-10-20T10:00:00Z'),
    products: [{ id: 'P-1', name: 'Laptop Pro', quantity: 1, price: 1200.00 }]
  },
  // ... more mock data
];
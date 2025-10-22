import { cn } from "@/lib/utils";

interface StockIndicatorProps {
  stock: number;
}

export function StockIndicator({ stock }: StockIndicatorProps) {
  const getColor = (stock: number) => {
    if (stock > 50) return "bg-green-100 text-green-800";
    if (stock < 10) return "bg-red-100 text-red-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-sm font-medium",
        getColor(stock)
      )}
    >
      {stock} units
    </div>
  );
}

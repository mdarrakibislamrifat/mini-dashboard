import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "inactive";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        status === "active"
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-100 text-gray-800"
      )}
    >
      <span
        className={cn(
          "mr-2 h-2 w-2 rounded-full",
          status === "active" ? "bg-blue-600" : "bg-gray-600"
        )}
      />
      {status === "active" ? "Active" : "Inactive"}
    </div>
  );
}

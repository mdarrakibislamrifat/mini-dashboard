"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-muted/30 border-r p-4">
      <div className="text-xl font-semibold mb-6">Mini Dashboard</div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-all",
                isActive ? "bg-accent" : "text-muted-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

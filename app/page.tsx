import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button className="p-5 text-lg font-medium">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}

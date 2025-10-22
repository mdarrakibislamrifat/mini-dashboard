"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b bg-background sticky top-0 z-10">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <h1>Toggle</h1>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/40" alt="user" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

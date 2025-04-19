"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Menu, Store, ChevronLeft } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DashboardSidebar({
  restaurantId,
  children,
}: {
  restaurantId: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const routes = [
    {
      href: `/dashboard/restaurant/${restaurantId}/orders`,
      label: "Orders",
      icon: ClipboardList,
      active: pathname?.includes(
        `/dashboard/restaurant/${restaurantId}/orders`,
      ),
    },
    {
      href: `/dashboard/restaurant/${restaurantId}/menu`,
      label: "Menu",
      icon: Menu,
      active: pathname?.includes(`/dashboard/restaurant/${restaurantId}/menu`),
    },
  ];

  return (
    <div className="flex h-screen">
      <div
        className={cn(
          "flex flex-col border-r bg-muted/40 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link
              href="/dashboard/restaurant"
              className="flex items-center gap-2 font-semibold"
            >
              <Store className="h-5 w-5" />
              <span className="truncate">Restaurant Dashboard</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/dashboard/restaurant" className="mx-auto">
              <Store className="h-6 w-6" />
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180",
              )}
            />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <div className="space-y-1 px-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn("w-full justify-start", collapsed && "px-2")}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className={cn("h-5 w-5", !collapsed && "mr-2")} />
                  {!collapsed && route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
}

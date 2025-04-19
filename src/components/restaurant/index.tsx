"use client";
import { MenuItemsList } from "@/components/menu-items-list";

export default function Restaurant({ restaurantId }: { restaurantId: string }) {
  
  return (
    <div className="grid gap-8 md:grid-cols-1">
      {/* <CreateMenuModal restaurantId={restaurantId} menuPresent={menuPresent} /> */}
      <MenuItemsList restaurantId={restaurantId} />
    </div>
  );
}

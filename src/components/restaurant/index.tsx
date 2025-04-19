"use client";
import { MenuItemsList } from "@/components/menu-items-list";
import { CreateMenuModal } from "@/components/create-menu-modal";

export default function Restaurant({ restaurantId }: { restaurantId: string }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <CreateMenuModal restaurantId={restaurantId} />
      <MenuItemsList restaurantId={restaurantId} />
    </div>
  );
}

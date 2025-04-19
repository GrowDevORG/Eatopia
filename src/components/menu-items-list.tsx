"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQueryData } from "@/hooks/useQueryData";
import { fetchMenus } from "@/actions";
import { MenuProps } from "@/lib/definitions";
import { MenuItemForm } from "@/components/menu-item-form";

export function MenuItemsList({ restaurantId }: { restaurantId: string }) {
  const { data, isFetching } = useQueryData(["restaurant-menu"], () =>
    fetchMenus(restaurantId),
  );

  const menus = data as MenuProps[];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  };

  if (isFetching) {
    return <p>Loading menu...</p>;
  }

  return (
    <div>
      {menus.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Menu Items</CardTitle>
            <CardDescription>Your current menu offerings</CardDescription>
            <MenuItemForm menuId={menus[0].id} />
          </CardHeader>
          <CardContent>
            {menus[0].menuItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border p-3"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  {/*<Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover"/>*/}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <p>no menu</p>
      )}
    </div>
  );
}

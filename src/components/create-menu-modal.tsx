"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createMenu } from "@/app/dashboard/restaurant/action";
import { useMutationData } from "@/hooks/useMutationData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function CreateMenuModal({ restaurantId }: { restaurantId: string }) {
  const { isPending, mutate } = useMutationData(
    ["create-menu"],
    () => createMenu(restaurantId),
    "restaurant-menu"
  );

  return (
    // <DialogContent
    //   className="sm:max-w-[425px]"
    //   onPointerDownOutside={(e) => e.preventDefault()}
    // >
    //   <DialogHeader>
    //     <DialogTitle>Create Restaurant Menu</DialogTitle>
    //     <DialogDescription>
    //       You need to create a menu for your restaurant before you can add menu items.
    //     </DialogDescription>
    //   </DialogHeader>
    //   <div className="py-4">
    //     <p>
    //       This will create a new menu for your restaurant with ID:{" "}
    //       <span className="font-mono text-sm">{restaurantId}</span>
    //     </p>
    //   </div>
    //   <DialogFooter>
    //     <Button onClick={mutate} disabled={isPending}>
    //       {isPending ? "Creating..." : "Create Menu"}
    //     </Button>
    //   </DialogFooter>
    // </DialogContent>

    <Card>
      <CardHeader>
        <CardTitle>Create Restaurant Menu</CardTitle>
        <CardDescription>
          You need to create a menu for your restaurant before you can add menu
          items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-4">
          <p>
            This will create a new menu for your restaurant with ID:{" "}
            <span className="font-mono text-sm">{restaurantId}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={mutate} disabled={isPending}>
          {isPending ? "Creating..." : "Create Menu"}
        </Button>
      </CardFooter>
    </Card>
  );
}

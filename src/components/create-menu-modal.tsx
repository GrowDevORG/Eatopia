"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createMenu } from "@/app/dashboard/restaurant/action";
import { useMutationData } from "@/hooks/useMutationData";

export function CreateMenuModal({ restaurantId }: { restaurantId: string }) {
  const { isPending, mutate } = useMutationData(
    ["create-menu"],
    () => createMenu(restaurantId),
    "restaurant-menu",
  );

  return (
    <Dialog>
      <DialogTrigger>create</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Restaurant Menu</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            This will create a new menu for your restaurant with ID:{" "}
            <span className="font-mono text-sm">{restaurantId}</span>
          </p>
        </div>
        <DialogFooter>
          <Button onClick={mutate} disabled={isPending}>
            {isPending ? "Creating..." : "Create Menu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

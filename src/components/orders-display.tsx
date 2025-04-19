"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { subscribeToOrders, markOrderAsReady } from "@/lib/order";

type Order = {
  id: string;
  items: {
    name: string;
    quantity: number;
  }[];
  status: "pending" | "ready";
  timestamp: string;
};

export function OrdersDisplay({ restaurantId }: { restaurantId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Subscribe to Redis pub/sub channel for orders
    const unsubscribe = subscribeToOrders(restaurantId, (newOrder) => {
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    });

    return () => {
      unsubscribe();
    };
  }, [restaurantId]);

  const handleMarkAsReady = async (orderId: string) => {
    await markOrderAsReady(orderId);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "ready" } : order,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Live Orders</h2>
        <Badge variant="outline" className="px-3 py-1">
          {orders.filter((order) => order.status === "pending").length} pending
        </Badge>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No orders yet. Waiting for new orders...
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <Card
              key={order.id}
              className={
                order.status === "ready" ? "border-green-200 bg-green-50" : ""
              }
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                  <Badge
                    variant={order.status === "ready" ? "default" : "secondary"}
                  >
                    {order.status}
                  </Badge>
                </div>
                <CardDescription>
                  {new Date(order.timestamp).toLocaleTimeString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">
                        x{item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {order.status === "pending" ? (
                  <Button
                    className="w-full"
                    onClick={() => handleMarkAsReady(order.id)}
                  >
                    Mark as Ready
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Completed
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

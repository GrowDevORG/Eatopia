// This is a mock implementation of Redis pub/sub for orders
// In a real application, you would use a Redis client

type OrderItem = {
  name: string;
  quantity: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  status: "pending" | "ready";
  timestamp: string;
  restaurantId: string;
};

type OrderCallback = (order: Order) => void;

// Mock subscribers
const subscribers: { restaurantId: string; callback: OrderCallback }[] = [];

// Mock function to subscribe to orders
export function subscribeToOrders(
  restaurantId: string,
  callback: OrderCallback,
) {
  subscribers.push({ restaurantId, callback });

  // For demo purposes, send a mock order after 2 seconds
  setTimeout(() => {
    const mockOrder: Order = {
      id: crypto.randomUUID(),
      restaurantId,
      items: [
        { name: "Cheeseburger", quantity: 2 },
        { name: "French Fries", quantity: 1 },
        { name: "Soda", quantity: 2 },
      ],
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    callback(mockOrder);
  }, 2000);

  // Send another mock order after 5 seconds
  setTimeout(() => {
    const mockOrder: Order = {
      id: crypto.randomUUID(),
      restaurantId,
      items: [
        { name: "Chicken Wings", quantity: 1 },
        { name: "Onion Rings", quantity: 1 },
      ],
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    callback(mockOrder);
  }, 5000);

  // Return unsubscribe function
  return () => {
    const index = subscribers.findIndex(
      (sub) => sub.restaurantId === restaurantId && sub.callback === callback,
    );
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  };
}

// Mock function to mark an order as ready
export async function markOrderAsReady(orderId: string): Promise<void> {
  // In a real application, this would update the order in Redis/database
  console.log(`Order ${orderId} marked as ready`);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return Promise.resolve();
}

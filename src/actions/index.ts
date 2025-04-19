"use server";

import { getCurrentSession, deleteSession } from "@/lib/cookie";
import { invalidateSessions } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export const logoutActions = async () => {
  const { session } = await getCurrentSession();

  if (session === null) {
    return {
      message: "Not authenticated",
    };
  }

  await invalidateSessions(session.id);
  await deleteSession();
  return redirect("/signin");
};

export const fetchRestaurantInfo = async (restaurantId: string) => {
  try {
    const { session } = await getCurrentSession();

    if (session === null) {
      return {
        message: "Not authenticated",
      };
    }

    const restaurantInfo = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    return restaurantInfo;
  } catch (e) {
    console.log(e);
  }
};

export const fetchMenus = async (restaurantId: string) => {
  try {
    const { session } = await getCurrentSession();

    if (session === null) {
      return {
        message: "Not authenticated",
      };
    }

    const menus = await prisma.menu.findMany({
      where: {
        restaurantId,
      },
      include: {
        menuItems: true,
      },
    });

    return menus;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const fetchOrders = async (restaurantId: string) => {
  try {
    const { session } = await getCurrentSession();

    if (session === null) {
      return {
        message: "Not authenticated",
      };
    }

    const orders = await prisma.order.findMany({
      where: {
        restaurantId,
      },
      include: {
        orderItems: true,
        user: {
          select: {
            name: true,
            address: true,
          },
        },
        rider: {
          select: {
            name: true,
            address: true,
          },
        },
      },
    });
    return orders;
  } catch (e) {
    console.log(e);
  }
};

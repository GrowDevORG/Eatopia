import { DashboardSidebar } from "@/components/dashboard-sidebar";
import type React from "react";

const Layout = async ({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { restaurantId: string };
}) => {
  const { restaurantId } = await params;

  return (
    <DashboardSidebar restaurantId={restaurantId}>{children}</DashboardSidebar>
  );
};

export default Layout;

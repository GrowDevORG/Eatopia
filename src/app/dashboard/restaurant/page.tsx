import { getCurrentSession } from "@/lib/cookie";
import { redirect } from "next/navigation";
import { getRestaurant } from "./action";
import CreateRestaurant from "@/components/create-restaurant";

export default async function DashboardPage() {
  const { user } = await getCurrentSession();
  if (!user) redirect("/signin");
  const findRestaurant = await getRestaurant(user.id);

  if (user?.role !== "RESTAURANT") redirect("/dashboard");
  if (!findRestaurant) return <CreateRestaurant />;

  redirect(`/dashboard/restaurant/${findRestaurant.id}/menu`);
}

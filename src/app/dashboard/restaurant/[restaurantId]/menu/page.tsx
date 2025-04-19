import { fetchMenus } from "@/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Restaurant from "@/components/restaurant";
import { CreateMenuModal } from "@/components/create-menu-modal";

const Page = async ({ params }: { params: { restaurantId: string } }) => {
  const { restaurantId } = await params;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["restaurant-menu"],
    queryFn: () => fetchMenus(restaurantId),
  });
  const menus = await fetchMenus( restaurantId ) 

  if(!menus.length) return  <CreateMenuModal restaurantId={restaurantId} />

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <Restaurant restaurantId={restaurantId}/>
    </HydrationBoundary>
  );
};

export default Page;

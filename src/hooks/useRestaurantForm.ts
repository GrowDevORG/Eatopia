import useZodForm from "@/hooks/useZodForm";
import { RestaurantFormSchema } from "@/lib/definitions";
import { CreateRestaurant } from "@/app/dashboard/restaurant/action";

export const useRestaurantForm = () => {
  const { onFormSubmit, control, reset, register, errors } = useZodForm(
    RestaurantFormSchema,
    CreateRestaurant,
  );
  return { onFormSubmit, control, register, reset, errors };
};

import { MenuItemFormSchema } from "@/lib/definitions";
import useZodForm2 from "./useZodForm2";
import { addMenuItems } from "@/app/dashboard/restaurant/action";
import { useMutationData } from "@/hooks/useMutationData";

export function useAddMenuItem() {
  const { isPending, mutate } = useMutationData(
    ["create-menu-item"],
    (data) => addMenuItems(data.name, data.price, data.imageUrl),
    "restaurant-menu",
  );

  const { errors, onFormSubmit, register } = useZodForm2(
    MenuItemFormSchema,
    mutate,
  ); //fix it chrollo
  return { errors, onFormSubmit, register, isPending };
}

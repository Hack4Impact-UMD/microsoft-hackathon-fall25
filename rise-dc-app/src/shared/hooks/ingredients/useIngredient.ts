import { useQuery } from "@tanstack/react-query";
import { getIngredient } from "../../../services/service";

export default function useIngredient(id: string) {
  return useQuery({
    queryKey: ["ingredient", id],
    queryFn: () => getIngredient(id),
  });
}
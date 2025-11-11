import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "../../services/service";

export default function useRecipe(id: string) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
  });
}

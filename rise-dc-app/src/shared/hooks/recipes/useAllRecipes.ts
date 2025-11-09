import { useQuery } from "@tanstack/react-query";
import { listRecipes } from "../../../services/service";

export default function useAllRecipes() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: listRecipes,
    staleTime: 5 * 60 * 1000,
  });
}

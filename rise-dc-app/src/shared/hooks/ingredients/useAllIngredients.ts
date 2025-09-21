import { useQuery } from "@tanstack/react-query";
import { listIngredients } from "../../../services/service";

export default function useAllIngredients() {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: listIngredients,
  });
}
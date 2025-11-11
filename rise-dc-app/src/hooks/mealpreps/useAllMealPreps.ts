import { useQuery } from "@tanstack/react-query";
import { listMealPreps } from "../../services/service";

export default function useAllMealPreps() {
  return useQuery({
    queryKey: ["mealpreps"],
    queryFn: listMealPreps,
  });
}

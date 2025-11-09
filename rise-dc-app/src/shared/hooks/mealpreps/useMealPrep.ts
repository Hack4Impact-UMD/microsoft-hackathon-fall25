import { useQuery } from "@tanstack/react-query";
import { getMealPrep } from "../../../services/service";

export default function useMealPrep(id: string) {
  return useQuery({
    queryKey: ["mealprep", id],
    queryFn: () => getMealPrep(id),
  });
}

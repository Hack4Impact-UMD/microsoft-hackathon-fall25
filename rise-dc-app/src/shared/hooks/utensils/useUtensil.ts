import { useQuery } from "@tanstack/react-query";
import { getUtensil } from "../../../services/service";

export default function useUtensil(id: string) {
  return useQuery({
    queryKey: ["utensil", id],
    queryFn: () => getUtensil(id),
  });
}

import { useQuery } from "@tanstack/react-query";
import { getGroceryList } from "../../../services/service";

export default function useGroceryList(id: string) {
  return useQuery({
    queryKey: ["grocerylist", id],
    queryFn: () => getGroceryList(id),
  });
}
import { useQuery } from "@tanstack/react-query";
import { listGroceryLists } from "../../services/service";

export default function useAllGroceryLists() {
  return useQuery({
    queryKey: ["grocerylists"],
    queryFn: listGroceryLists,
  });
}

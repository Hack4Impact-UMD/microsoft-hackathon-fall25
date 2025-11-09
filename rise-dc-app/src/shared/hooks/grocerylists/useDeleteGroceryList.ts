import { useMutation } from "@tanstack/react-query";
import { deleteGroceryList } from "../../../services/service";

export default function useDeleteGroceryList() {
  return useMutation({
    mutationFn: deleteGroceryList,
  });
}

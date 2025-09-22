import { useMutation } from "@tanstack/react-query";
import { createGroceryList } from "../../../services/service";

export default function useCreateGroceryList() {
  return useMutation({
    mutationFn: createGroceryList
  })
}
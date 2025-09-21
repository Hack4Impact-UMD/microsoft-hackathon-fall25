import { useMutation } from "@tanstack/react-query";
import { updateGroceryList } from "../../../services/service";
import { GroceryList } from "../../types";

export default function useUpdateGroceryList() {
  return useMutation({
    mutationFn: (payload: GroceryList) => updateGroceryList(payload.id, payload)
  })
}
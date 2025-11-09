import { useMutation } from "@tanstack/react-query";
import { Ingredient } from "../../types";
import { updateIngredient } from "../../../services/service";

export default function useUpdateIngredient() {
  return useMutation({
    mutationFn: (payload: Ingredient) => updateIngredient(payload.id, payload),
  });
}

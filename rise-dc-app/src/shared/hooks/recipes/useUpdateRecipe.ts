import { useMutation } from "@tanstack/react-query";
import { Recipe } from "../../types";
import { updateRecipe } from "../../../services/service";

export default function useUpdateRecipe() {
  return useMutation({
    mutationFn: (payload: Recipe) => updateRecipe(payload.id, payload)
  })
}
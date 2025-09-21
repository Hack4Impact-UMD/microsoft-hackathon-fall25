import { useMutation } from "@tanstack/react-query";
import { createRecipe } from "../../../services/service";

export default function useCreateRecipe() {
  return useMutation({
    mutationFn: createRecipe
  })
}
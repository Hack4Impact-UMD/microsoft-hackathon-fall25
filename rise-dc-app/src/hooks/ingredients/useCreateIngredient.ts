import { useMutation } from "@tanstack/react-query";
import { createIngredient } from "../../services/service";

export default function useCreateIngredient() {
  return useMutation({
    mutationFn: createIngredient,
  });
}

import { useMutation } from "@tanstack/react-query";
import { deleteIngredient } from "../../../services/service";

export default function useDeleteIngredient() {
  return useMutation({
    mutationFn: deleteIngredient,
  });
}

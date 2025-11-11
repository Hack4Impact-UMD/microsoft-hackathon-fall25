import { useMutation } from "@tanstack/react-query";
import { deleteRecipe } from "../../services/service";

export default function useDeleteRecipe() {
  return useMutation({
    mutationFn: deleteRecipe,
  });
}

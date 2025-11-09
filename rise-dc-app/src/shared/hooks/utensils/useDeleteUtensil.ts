import { useMutation } from "@tanstack/react-query";
import { deleteUtensil } from "../../../services/service";

export default function useDeleteUtensil() {
  return useMutation({
    mutationFn: deleteUtensil,
  });
}

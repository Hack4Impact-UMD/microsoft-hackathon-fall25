import { useMutation } from "@tanstack/react-query";
import { createUtensil } from "../../services/service";

export default function useCreateUtensil() {
  return useMutation({
    mutationFn: createUtensil,
  });
}

import { useMutation } from "@tanstack/react-query";
import { Utensil } from "../../types";
import { updateUtensil } from "../../../services/service";

export default function useUpdateUtensil() {
  return useMutation({
    mutationFn: (payload: Utensil) => updateUtensil(payload.id, payload),
  });
}

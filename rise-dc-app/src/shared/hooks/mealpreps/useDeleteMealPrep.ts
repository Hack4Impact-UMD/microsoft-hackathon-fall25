import { useMutation } from "@tanstack/react-query";
import { deleteMealPrep } from "../../../services/service";

export default function useDeleteMealPrep() {
  return useMutation({
    mutationFn: del\eteMealPrep
  })
}
import { useMutation } from "@tanstack/react-query";
import { MealPrep } from "../../types";
import { updateMealPrep } from "../../../services/service";

export default function useUpdateMealPrep() {
  return useMutation({
    mutationFn: (payload: MealPrep) => updateMealPrep(payload.id, payload)
  })
}
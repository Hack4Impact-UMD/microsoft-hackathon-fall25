import { useMutation } from "@tanstack/react-query";
import { createMealPrep } from "../../../services/service";

export default function useCreateMealPrep() {
  return useMutation({
    mutationFn: createMealPrep,
  });
}

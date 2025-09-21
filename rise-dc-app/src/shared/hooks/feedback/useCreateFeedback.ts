import { useMutation } from "@tanstack/react-query";
import { createFeedback } from "../../../services/service";

export default function useCreateFeedback() {
  return useMutation({
    mutationFn: createFeedback
  })
}
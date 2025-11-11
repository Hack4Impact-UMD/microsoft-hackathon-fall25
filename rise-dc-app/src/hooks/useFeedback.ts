import { useMutation } from "@tanstack/react-query";
import { createFeedback } from "../services/feedbackService";

export default function useCreateFeedback() {
  return useMutation({
    mutationFn: createFeedback,
  });
}

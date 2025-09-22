import { useMutation } from "@tanstack/react-query";
import { createEvent } from "../../services/service";

export default function useEvent() {
  return useMutation({
    mutationFn: createEvent
  });
}
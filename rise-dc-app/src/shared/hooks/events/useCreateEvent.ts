import { useMutation } from "@tanstack/react-query";
import { createEvent } from "../../../services/service";

export default function useCreateEvent() {
  return useMutation({
    mutationFn: createEvent
  })
}
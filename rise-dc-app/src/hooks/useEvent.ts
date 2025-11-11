import { useMutation, useQuery } from "@tanstack/react-query";
import { listEvents, createEvent } from "../services/eventService";

export function useAllEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: listEvents,
  });
}

export function useCreateEvent() {
  return useMutation({
    mutationFn: createEvent,
  });
}

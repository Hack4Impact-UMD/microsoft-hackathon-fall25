import { useQuery } from "@tanstack/react-query";
import { listEvents } from "../../../services/service";

export default function useAllEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: listEvents,
  });
}

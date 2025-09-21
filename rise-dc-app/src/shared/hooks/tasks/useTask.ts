import { useQuery } from "@tanstack/react-query";
import { getTask } from "../../../services/service";

export default function useTask(id: string) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
  });
}
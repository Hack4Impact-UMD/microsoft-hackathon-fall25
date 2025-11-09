import { useQuery } from "@tanstack/react-query";
import { getTool } from "../../../services/service";

export default function useTool(id: string) {
  return useQuery({
    queryKey: ["tool", id],
    queryFn: () => getTool(id),
  });
}

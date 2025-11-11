import { useQuery } from "@tanstack/react-query";
import { listTools } from "../../services/service";

export default function useAllTools() {
  return useQuery({
    queryKey: ["tools"],
    queryFn: listTools,
  });
}

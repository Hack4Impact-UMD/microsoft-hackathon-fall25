import { useQuery } from "@tanstack/react-query";
import { listTasks } from "../../../services/service";

export default function useAllTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: listTasks,
  });
}

import { useMutation } from "@tanstack/react-query";
import { createTask } from "../../../services/service";

export default function useCreateTask() {
  return useMutation({
    mutationFn: createTask,
  });
}

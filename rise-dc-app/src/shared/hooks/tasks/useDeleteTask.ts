import { useMutation } from "@tanstack/react-query";
import { deleteTask } from "../../../services/service";

export default function useDeleteTask() {
  return useMutation({
    mutationFn: deleteTask
  })
}
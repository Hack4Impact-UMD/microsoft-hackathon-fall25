import { useMutation, useQuery } from "@tanstack/react-query";
import { createTask, deleteTask, getTask, listTasks } from "../services/taskService";

export function useAllTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: listTasks,
  });
}

export function useCreateTask() {
  return useMutation({
    mutationFn: createTask,
  });
}

export function useDeleteTask() {
  return useMutation({
    mutationFn: deleteTask,
  });
}

export function useTask(id: string) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
  });
}

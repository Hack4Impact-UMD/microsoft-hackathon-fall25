import { Task } from "../shared/types";
import { delJSON, getJSON, postJSON } from "./service";

export interface TaskPayload {
  taskName: string;
  steps: string[];
}

export async function createTask(payload: TaskPayload): Promise<Task> {
  return postJSON<Task, TaskPayload>("/api/tasks", payload);
}

export async function getTask(id: string): Promise<Task> {
  return getJSON<Task>(`/api/tasks/${id}`);
}

export async function listTasks(): Promise<Task[]> {
  return getJSON<Task[]>("/api/tasks");
}

export async function deleteTask(
  id: string,
): Promise<{ message: string; id: string }> {
  return delJSON<{ message: string; id: string }>(`/api/tasks/${id}`);
}

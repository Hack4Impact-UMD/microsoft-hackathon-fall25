import { TaskCategory } from "../scheduling_components/quiet_hobbies/types";
import { Image, Task } from "../shared/types";
import { delJSON, getJSON, postJSON } from "./service";

export interface TaskPayload {
  userId: string;
  icon: string;
  name: string;
  image?: Image;
  startTime: string;
  endTime: string;
  category: TaskCategory;
}

export async function createTask(payload: TaskPayload): Promise<Task> {
  return postJSON<Task, TaskPayload>("/api/scheduler/tasks", payload);
}

export async function getTask(id: string): Promise<Task> {
  return getJSON<Task>(`/api/scheduler/tasks/${id}`);
}

export async function listTasks(): Promise<Task[]> {
  return getJSON<Task[]>("/api/scheduler/tasks");
}

export async function deleteTask(
  id: string,
): Promise<{ message: string; id: string }> {
  return delJSON<{ message: string; id: string }>(`/api/scheduler/tasks/${id}`);
}

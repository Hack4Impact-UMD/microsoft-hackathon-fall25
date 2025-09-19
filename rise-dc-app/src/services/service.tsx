import axios from "axios";
import { TaskAssignment, Image, Event, Feedback, Task, Assignment } from "../shared/types";

const API_URL = "http://localhost:3000"; // TODO: change this to be actual backend URL once deployed

export type EventPayload = {
  name: string;
  icon?: string;
  tasks?: TaskAssignment[];
  image?: Image;
};

export interface AssignmentPayload {
  complete?: boolean;
  date: string;
  startTime: string;
  endTime: string;
  event: Event;
}

export interface FeedbackPayload {
  taskAssignmentId: string;
  taskId: string;
  reaction: 'yes' | 'maybe' | 'no'; 
}

export interface TaskPayload {
  taskName: string;
  steps: string[];
}

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// todo: write this to support queries and add calls to query tasks and assignments
export async function getJSON<T>(url: string) {
  const { data } = await api.get<T>(url);
  return data;
}

export async function postJSON<TRes, TBody = unknown>(url: string, body?: TBody) {
  const { data } = await api.post<TRes>(url, body);
  return data;
}

export async function delJSON<TRes = { id: string }>(url: string) {
  const { data } = await api.delete<TRes>(url);
  return data;
}

// Tasks
export async function createTask(payload: TaskPayload): Promise<Task> {
  return postJSON<Task, TaskPayload>("/api/tasks", payload);
}

export async function getTask(id: string): Promise<Task> {
  return getJSON<Task>(`/api/tasks/${id}`);
}

export async function deleteTask(id: string): Promise<{ message: string; id: string }> {
  return delJSON<{ message: string; id: string }>(`/api/tasks/${id}`,);
}

// Events
export async function listEvents(): Promise<Event[]> {
  return getJSON<Event[]>("/api/events");
}

export async function createEvent(payload: EventPayload): Promise<Event> {
  return postJSON<Event, EventPayload>("/api/events", payload);
}

// Assignments
export async function createAssignment(payload: AssignmentPayload): Promise<Assignment> {
  return postJSON<Assignment, AssignmentPayload>("/api/assignments", payload);
}

// Feedback
export async function createFeedback(payload: FeedbackPayload): Promise<Feedback> {
  return postJSON<Feedback, FeedbackPayload>("/api/feedback", payload);
}
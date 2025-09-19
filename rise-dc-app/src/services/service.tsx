import axios from "axios";
import { TaskAssignment, Image, Event } from "../shared/types";

const API_URL = "http://localhost:3000"; // TODO: change this to be actual backend URL once deployed

export type EventPayload = {
  name: string;
  icon?: string;
  tasks?: TaskAssignment[];
  image?: Image;
};

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

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

export async function listEvents(): Promise<Event[]> {
  return getJSON<Event[]>("/api/events");
}

export async function createEvent(payload: EventPayload): Promise<Event> {
  return postJSON<Event, EventPayload>("/api/events", payload);
}

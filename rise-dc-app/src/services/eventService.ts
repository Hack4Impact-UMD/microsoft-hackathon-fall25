import { Image, TaskAssignment } from "../shared/types";
import { getJSON, postJSON } from "./service";

export type EventPayload = {
  name: string;
  icon?: string;
  tasks?: TaskAssignment[];
  image?: Image;
};

export async function listEvents(): Promise<Event[]> {
  return getJSON<Event[]>("/api/events");
}

export async function createEvent(payload: EventPayload): Promise<Event> {
  return postJSON<Event, EventPayload>("/api/events", payload);
}

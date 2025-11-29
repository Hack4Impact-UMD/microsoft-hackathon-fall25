import { Image } from "../shared/types";
import { getJSON, postJSON } from "./service";

// TODO fix these
export type EventPayload = {
  name: string;
  complete?: boolean;
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

import { Assignment } from "../shared/types";
import { postJSON } from "./service";

export interface AssignmentPayload {
  complete?: boolean;
  date: string;
  startTime: string;
  endTime: string;
  event: Event;
}

export async function createAssignment(
  payload: AssignmentPayload,
): Promise<Assignment> {
  return postJSON<Assignment, AssignmentPayload>("/api/assignments", payload);
}

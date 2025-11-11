import { Feedback } from "../shared/types";
import { postJSON } from "./service";

export interface FeedbackPayload {
  taskAssignmentId: string;
  taskId: string;
  reaction: "yes" | "maybe" | "no";
}

export async function createFeedback(
  payload: FeedbackPayload,
): Promise<Feedback> {
  return postJSON<Feedback, FeedbackPayload>("/api/feedback", payload);
}
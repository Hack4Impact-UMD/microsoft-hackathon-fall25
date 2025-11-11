import { useMutation } from "@tanstack/react-query";
import { createAssignment } from "../services/assignmentService";

export default function useCreateAssignment() {
  return useMutation({
    mutationFn: createAssignment,
  });
}

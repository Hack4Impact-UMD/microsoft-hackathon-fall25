import { useMutation } from "@tanstack/react-query";
import { createAssignment } from "../../../services/service";

export default function useCreateAssignment() {
  return useMutation({
    mutationFn: createAssignment,
  });
}

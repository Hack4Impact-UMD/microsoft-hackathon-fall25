import { useMutation } from "@tanstack/react-query";
import { Tool } from "../../shared/types";
import { updateTool } from "../../services/service";

export default function useUpdateTool() {
  return useMutation({
    mutationFn: (payload: Tool) => updateTool(payload.id, payload),
  });
}

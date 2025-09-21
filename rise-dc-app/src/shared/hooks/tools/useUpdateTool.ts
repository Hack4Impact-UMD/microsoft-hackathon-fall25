import { useMutation } from "@tanstack/react-query";
import { Tool } from "../../types";
import { updateTool } from "../../../services/service";

export default function useUpdateTool() {
  return useMutation({
    mutationFn: (payload: Tool) => updateTool(payload.id, payload)
  })
}
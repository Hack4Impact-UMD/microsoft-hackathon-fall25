import { useMutation } from "@tanstack/react-query";
import { createTool } from "../../../services/service";

export default function useCreateTool() {
  return useMutation({
    mutationFn: createTool,
  })
}
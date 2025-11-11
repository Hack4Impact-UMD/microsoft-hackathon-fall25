import { useMutation } from "@tanstack/react-query";
import { deleteTool } from "../../services/service";

export default function useDeleteTool() {
  return useMutation({
    mutationFn: deleteTool,
  });
}

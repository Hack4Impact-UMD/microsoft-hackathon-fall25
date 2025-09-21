import { useQuery } from "@tanstack/react-query";
import { listUtensils } from "../../../services/service";

export default function useAllUtensils() {
  return useQuery({
    queryKey: ["utensils"],
    queryFn: listUtensils,
  });
}
import { listService } from "@/apis/list-api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useListUserRole = () => {
  return useQuery({
    queryKey: ["user-role-list"],
    queryFn: async () => await listService.fetchUserRole(),
    placeholderData: keepPreviousData,
  });
};

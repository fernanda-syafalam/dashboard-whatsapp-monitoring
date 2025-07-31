import { listService } from "@/apis/list-api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useListCorporate = () => {
  return useQuery({
    queryKey: ["corporate-list"],
    queryFn: async () => await listService.fetchCorporate(),
    placeholderData: keepPreviousData,
  });
};

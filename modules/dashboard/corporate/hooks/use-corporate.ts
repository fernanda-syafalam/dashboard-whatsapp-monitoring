import { useQuery } from '@tanstack/react-query';
import { useParamsTable } from '@/hooks/use-params-table';
import { corporatesService } from '../apis/corporates-api';
export const useUsers = () => {
  const { page, perPage, sort } = useParamsTable();
  return useQuery({
    queryKey: ['corporates', page, perPage, sort],
    queryFn: () =>
      corporatesService.fetchCorporates({
        page,
        perPage
      })
  });
};

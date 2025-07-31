import { useQuery } from '@tanstack/react-query';
import { usersService } from '../apis/users-api';
import { useParamsTable } from '@/hooks/use-params-table';
export const useUsers = () => {
  const { page, perPage, sort } = useParamsTable();
  return useQuery({
    queryKey: ['users', page, perPage, sort],
    queryFn: () =>
      usersService.fetchUsers({
        page,
        perPage
      })
  });
};

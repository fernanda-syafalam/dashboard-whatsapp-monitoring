import { useQuery } from '@tanstack/react-query';
import { usersService } from '../apis/usersApi';
export const useUsers = (page: number) => {
  return useQuery({
    queryKey: ['users', page],
    queryFn: () => usersService.fetchUsers(page)
  });
};

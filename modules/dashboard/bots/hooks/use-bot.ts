import { useQuery } from '@tanstack/react-query';
import { botService } from '../apis/bot-api';
import { useParamsTable } from '@/hooks/use-params-table';
export const useBots = () => {
  const { page, perPage, sort } = useParamsTable();
  return useQuery({
    queryKey: ['bots', page, perPage],
    queryFn: () => botService.getBots({ page, perPage})
  });
};

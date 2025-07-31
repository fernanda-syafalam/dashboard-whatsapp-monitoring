import { useQuery } from '@tanstack/react-query';
import { botService } from '../apis/bot-api';
export const useBots = (page: number, limit: number, corporateID: string) => {
  return useQuery({
    queryKey: ['bots', page, limit, corporateID],
    queryFn: () => botService.getBots({ page, limit, corporateID })
  });
};

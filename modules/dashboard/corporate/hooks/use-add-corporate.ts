import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { corporatesService } from '../apis/corporates-api';

export const useAddUser = () => {
  const queryClient = useQueryClient();
  const [dialog, setDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ name, alias }: any) => {
    setIsLoading(true);
    try {
      const { data } = await corporatesService.createCorporate({ name, alias });
      queryClient.invalidateQueries({ queryKey: ['corporates'] });
      setDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDialog = (open: boolean) => setDialog(open);

  return {
    dialog,
    isLoading,
    setDialog,
    toggleDialog,
    onSubmit
  };
};

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { corporatesService } from '../apis/corporates-api';

export const useActionUser = () => {
  const queryClient = useQueryClient();
  const [dialog, setDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteUser = async (uuid: string) => {
    setIsLoading(true);
    try {
      await corporatesService.deleteCorporate(uuid);
      queryClient.invalidateQueries({ queryKey: ['corporates'] });
    } catch (error) {}
  };

  return {
    dialog,
    isLoading,
    setDialog,
    handleDeleteUser
  };
};

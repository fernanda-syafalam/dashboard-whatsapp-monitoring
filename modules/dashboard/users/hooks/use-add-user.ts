import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usersService } from '../apis/users-api';

export const useAddUser = () => {
  const queryClient = useQueryClient();
  const [dialog, setDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ name, email, role, password }: any) => {
    setIsLoading(true);
    try {
      const { data } = await usersService.createUser({ name, email, role, password });
      queryClient.invalidateQueries({ queryKey: ['users'] });
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

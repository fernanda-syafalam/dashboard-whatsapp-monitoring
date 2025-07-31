import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { usersService } from '../apis/users-api';

export const useActionUser = () => {
  const queryClient = useQueryClient();
  const [dialog, setDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteUser = async (userId: string) => {
    setIsLoading(true);
    try {
      await usersService.deleteUser(userId);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    } catch (error) {}
  };

  return {
    dialog,
    isLoading,
    setDialog,
    handleDeleteUser
  };
};

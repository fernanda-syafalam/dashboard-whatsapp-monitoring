import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { botService } from '../apis/bot-api';

export const useActionBot = () => {
  const queryClient = useQueryClient();
  const [dialog, setDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitCreate = async ({ name, description, corporateID }: any) => {
    setIsLoading(true);
    try {
      const { data } = await botService.create({ name, description, corporateID });
      queryClient.invalidateQueries({ queryKey: ['bots'] });
      setDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitDelete = async (botId: string) => {
    setIsLoading(true);
    try {
      await botService.delete(botId);
      queryClient.invalidateQueries({ queryKey: ['bots'] });
    } catch (error) {
      console.error('Error deleting bot:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmitUpdate = async (botId: string, { name, description, corporateID }: any) => {
    setIsLoading(true);
    try {
      await botService.update(botId, { name, description, corporateID });
      queryClient.invalidateQueries({ queryKey: ['bots'] });
      setDialog(false);
    } catch (error) {
      console.error('Error updating bot:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDisconnect = async (botId: string) => {
    setIsLoading(true);
    try {
      await botService.disconnect(botId); // Assuming this is the correct endpoint for disconnecting
      queryClient.invalidateQueries({ queryKey: ['bots'] });
    } catch (error) {
      console.error('Error disconnecting bot:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleDialog = (open: boolean) => setDialog(open);

  return {
    dialog,
    isLoading,
    setDialog,
    toggleDialog,
    handleSubmitCreate,
    handleSubmitDelete,
    handleSubmitUpdate,
    handleDisconnect
  };
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskApi } from '../api/taskApi';
import { toast } from 'react-toastify';
import { toastConfig } from 'apps/broccoli/src/services/toastConfig';

export const useTask = (taskApi: TaskApi) => {
  const queryClient = useQueryClient();

  const onSuccess = (toastMessage: string) => {
    toast.info(toastMessage, {
      ...toastConfig,
    });
  };

  const createTask = useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => {
      onSuccess('Task is created successfully!');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  const updateTask = useMutation({
    mutationFn: taskApi.update,
    onSuccess: () => {
      onSuccess('Task is updated successfully!');
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['board'] }),
        queryClient.invalidateQueries({ queryKey: ['audit'] }),
      ]);
    },
  });

  const deleteTask = useMutation({
    mutationFn: taskApi.delete,
    onSuccess: () => {
      onSuccess('Task is updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  return { createTask, updateTask, deleteTask };
};

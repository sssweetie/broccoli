import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskApi } from '../api/taskApi';
import { callSuccessToast } from 'apps/broccoli/src/utils';

export const useTask = (taskApi: TaskApi) => {
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => {
      callSuccessToast('Task is created successfully!');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  const updateTask = useMutation({
    mutationFn: taskApi.update,
    onSuccess: () => {
      callSuccessToast('Task is updated successfully!');
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['board'] }),
        queryClient.invalidateQueries({ queryKey: ['audit'] }),
      ]);
    },
  });

  const deleteTask = useMutation({
    mutationFn: taskApi.delete,
    onSuccess: () => {
      callSuccessToast('Task is deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  return { createTask, updateTask, deleteTask };
};

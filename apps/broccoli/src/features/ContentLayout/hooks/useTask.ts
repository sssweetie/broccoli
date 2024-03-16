import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskApi } from '../api/taskApi';
import { callSuccessToast } from 'apps/broccoli/src/utils';
import { callErrorToast } from 'apps/broccoli/src/utils';

export const useTask = (taskApi: TaskApi) => {
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
      callSuccessToast('Task is created successfully!');
    },
    onError: () => {
      callErrorToast('Oops! Something went wrong...');
    },
  });

  const updateTask = useMutation({
    mutationFn: taskApi.update,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['board'] }),
        queryClient.invalidateQueries({ queryKey: ['audit'] }),
      ]);
      callSuccessToast('Task is updated successfully!');
    },
    onError: () => {
      callErrorToast('Oops! Something went wrong...');
    },
  });

  const deleteTask = useMutation({
    mutationFn: taskApi.delete,
    onSuccess: () => {
      callSuccessToast('Task is deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError: () => {
      callErrorToast('Oops! Something went wrong...');
    },
  });

  return { createTask, updateTask, deleteTask };
};

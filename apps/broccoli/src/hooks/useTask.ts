import { useMutation, useQueryClient } from '@tanstack/react-query';
import { callSuccessToast } from 'apps/broccoli/src/utils';
import { callErrorToast } from 'apps/broccoli/src/utils';
import { ITaskAPI } from '../api/taskApi';

const ENTITY = 'Task';

export const useTask = (taskApi: ITaskAPI) => {
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
      callSuccessToast(ENTITY, 'created');
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
      callSuccessToast(ENTITY, 'updated');
    },
    onError: () => {
      callErrorToast('Oops! Something went wrong...');
    },
  });

  const deleteTask = useMutation({
    mutationFn: taskApi.delete,
    onSuccess: () => {
      callSuccessToast(ENTITY, 'deleted');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError: () => {
      callErrorToast('Oops! Something went wrong...');
    },
  });

  return { createTask, updateTask, deleteTask };
};

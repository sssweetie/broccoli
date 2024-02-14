import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskApi } from '../api/taskApi';
export const useTaskQueryMutations = (taskApi: TaskApi) => {
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  return { createTask };
};

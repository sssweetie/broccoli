import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { checkListApi } from '../features/CheckList/api/checkListApi';
import { callErrorToast, callSuccessToast } from '../utils';
import { toastActions } from '../services/toastConfig';

const ENTITY = 'Subtask';

export const useSubtasksMutations = (taskId: string) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['checklist'],
    queryFn: () => checkListApi.read(taskId),
  });

  const updateSubtaskMutation = useMutation({
    mutationFn: checkListApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist'] });
      callSuccessToast(ENTITY, toastActions.updated);
    },
    onError: () => callErrorToast('Oops! Something went wrong...'),
  });

  const createSubtaskMutation = useMutation({
    mutationFn: checkListApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist'] });
      callSuccessToast(ENTITY, toastActions.created);
    },
    onError: () => callErrorToast('Oops! Something went wrong...'),
  });

  const deleteSubtaskMutation = useMutation({
    mutationFn: checkListApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist'] });
      callSuccessToast(ENTITY, toastActions.deleted);
    },
    onError: () => callErrorToast('Oops! Something went wrong...'),
  });

  return {
    subTasks: data,
    updateSubtaskMutation: updateSubtaskMutation.mutate,
    createSubtaskMutation: createSubtaskMutation,
    deleteSubtaskMutation: deleteSubtaskMutation.mutate,
  };
};

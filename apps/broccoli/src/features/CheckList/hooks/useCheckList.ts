import { callErrorToast, callSuccessToast } from 'apps/broccoli/src/utils';
import { ICheckListAPI } from '../api/checkListApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCheckList = (checklistApi: ICheckListAPI, taskId: string) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['checklist'],
    queryFn: () => checklistApi.read(taskId),
  });

  const updateSubTask = useMutation({
    mutationFn: checklistApi.update,
    onSuccess: () => {
      callSuccessToast('Subtask is updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['checklist'] });
    },
    onError: () => callErrorToast('Oops! Something went wrong...'),
  });

  const createSubTask = useMutation({
    mutationFn: checklistApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist'] });
      callSuccessToast('Subtask is created successfully!');
    },
    onError: () => callErrorToast('Oops! Something went wrong...'),
  });

  return { updateSubTask, createSubTask, subTasks: data };
};

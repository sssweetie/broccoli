import { ICheckListApi } from '../api/checkListApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCheckList = (checklistApi: ICheckListApi, taskId: string) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['checklist'],
    queryFn: () => checklistApi.read(taskId),
  });

  const updateSubTask = useMutation({
    mutationFn: checklistApi.update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['checklist'] }),
  });

  const createSubTask = useMutation({
    mutationFn: checklistApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['checklist'] }),
  });

  return { updateSubTask, createSubTask, subTasks: data };
};

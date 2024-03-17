import { ICheckListApi } from '../api/checkListApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCheckList = (checklistApi: ICheckListApi, taskId: string) => {
  const { data } = useQuery({
    queryKey: ['checklist'],
    queryFn: () => checklistApi.read(taskId),
  });

  const updateSubTask = useMutation({
    mutationFn: checklistApi.update,
  });

  return { updateSubTask, subTasks: data };
};

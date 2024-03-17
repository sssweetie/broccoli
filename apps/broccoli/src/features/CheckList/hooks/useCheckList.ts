import { ICheckListApi } from '../api/checkListApi';
import { useMutation } from '@tanstack/react-query';

export const useCheckList = (checklistApi: ICheckListApi) => {
  const updateSubTask = useMutation({
    mutationFn: checklistApi.update,
  });

  return { updateSubTask };
};

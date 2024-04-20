import { callErrorToast, callSuccessToast } from 'apps/broccoli/src/utils';
import { ICheckListAPI } from '../api/checkListApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { toastActions } from 'apps/broccoli/src/constants/toastActions';

const ENTITY = 'Subtask';

export const useCheckList = (checklistApi: ICheckListAPI, taskId: string) => {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);

  const { data } = useQuery({
    queryKey: ['checklist'],
    queryFn: () => checklistApi.read(taskId),
  });

  const subTasks = data;

  const updateSubTask = useMutation({
    mutationFn: checklistApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist'] });
      callSuccessToast(ENTITY, toastActions.updated);
    },
    onError: () => callErrorToast('Oops! Something went wrong...'),
  });

  const createSubTask = useMutation({
    mutationFn: checklistApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist'] });
      callSuccessToast(ENTITY, toastActions.created);
    },
    onError: () => callErrorToast('Oops! Something went wrong...'),
  });

  const deleteSubTask = useMutation({
    mutationFn: checklistApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist'] });
      callSuccessToast(ENTITY, toastActions.deleted);
    },
    onError: () => callErrorToast('Oops! Something went wrong...'),
  });

  const countProgress = () => {
    if (!subTasks || subTasks.length === 0) {
      setProgress(0);
      return;
    }

    const completedTasksCount = subTasks.reduce(
      (acc, currVal) => acc + (currVal.isCompleted ? 1 : 0),
      0
    );
    const percent = (completedTasksCount / subTasks.length) * 100;
    setProgress(percent);
  };

  const mutateEntity = async (e: FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    createSubTask.mutate({
      taskId,
      subTask: {
        title,
        isCompleted: false,
      },
    });
  };

  return {
    deleteSubTask: deleteSubTask.mutate,
    updateSubTask: updateSubTask.mutate,
    countProgress,
    mutateEntity,
    progress,
    subTasks: data,
  };
};

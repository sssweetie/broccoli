import { useSubtasksMutations } from 'apps/broccoli/src/hooks/useSubtasksMutations';
import { FormEvent, useState } from 'react';

export const useCheckList = (taskId: string) => {
  const { subTasks, createSubtaskMutation } = useSubtasksMutations(taskId);

  const [progress, setProgress] = useState(0);

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
    createSubtaskMutation.mutate({
      taskId,
      subTask: {
        title,
        isCompleted: false,
      },
    });
  };

  return {
    progress,
    countProgress,
    mutateEntity,
  };
};

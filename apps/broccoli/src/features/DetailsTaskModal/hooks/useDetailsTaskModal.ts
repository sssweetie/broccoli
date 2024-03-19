import { useUser } from '@clerk/clerk-react';
import { taskApi } from 'apps/broccoli/src/api/taskApi';
import { useTask } from 'apps/broccoli/src/hooks/useTask';
import { httpClient } from 'apps/broccoli/src/services/httpClient';
import { createAuditLog } from 'apps/broccoli/src/utils';
import { ITask } from 'apps/libs/types/src';

interface IData {
  task: ITask;
}

export const useDetailsTaskModal = ({ task }: IData) => {
  const { updateTask, deleteTask } = useTask(taskApi(httpClient));
  const { user } = useUser();

  const updateTitle = async (title: string) => {
    const newTask = { ...task, title };
    const audit = createAuditLog(user, title);
    await updateTask.mutate({ task: newTask, audit });
  };

  const updateDescription = async (description: string) => {
    const newTask = { ...task, description };
    const audit = createAuditLog(user, undefined);
    await updateTask.mutate({ task: newTask, audit });
  };

  return {
    operations: {
      updateDescription,
      updateTitle,
      deleteTask: deleteTask.mutate,
    },
  };
};

import { useUser } from '@clerk/clerk-react';
import { useTask } from 'apps/broccoli/src/hooks/useTask';
import { createAuditLog } from 'apps/broccoli/src/utils';
import { Task as TaskType } from 'apps/libs/types/src';

export const useDetailsTaskModal = (task: TaskType) => {
  const { updateTask, deleteTask } = useTask();
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
    updateDescription,
    updateTitle,
    deleteTaskMutation: deleteTask.mutate,
  };
};

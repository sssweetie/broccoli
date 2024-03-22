import { FormEvent, useState } from 'react';
import { ISubTask } from 'apps/libs/types/src';
import { SubTask } from '../SubTask';
import { useCheckList } from './hooks/useCheckList';
import { checkListApi } from './api/checkListApi';
import { httpClient } from 'apps/broccoli/src/services/httpClient';
import { ProgressBar } from 'apps/broccoli/src/components/ProgressBar';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { AddForm } from 'apps/broccoli/src/components/AddForm';
interface IProps {
  taskId: string;
}

export const CheckList: React.FC<IProps> = ({ taskId }) => {
  const { updateSubTask, createSubTask, deleteSubTask, subTasks } =
    useCheckList(checkListApi(httpClient), taskId);

  const [progress, setProgress] = useState(0);

  const countProgress = () => {
    if (subTasks && subTasks.length) {
      const completedTasksCount = subTasks.reduce(
        (acc, currVal) => acc + (currVal.isCompleted ? 1 : 0),
        0
      );

      const percent = (completedTasksCount / subTasks.length) * 100;

      setProgress(percent);
      return;
    }

    setProgress(0);
    return;
  };

  const mutateTask = async (e: FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    const subTask = {
      title,
      isCompleted: false,
    };

    await createSubTask.mutate({ taskId, subTask });
  };

  const mutateSubTask = (subTask: ISubTask) => {
    updateSubTask.mutate(subTask);
  };

  const handleDeleteSubTask = (id: string) => {
    deleteSubTask.mutate(id);
  };

  if (subTasks) {
    const checkList = subTasks.map((subTask) => (
      <SubTask
        subTask={subTask}
        handleDeleteSubTask={handleDeleteSubTask}
        updateSubTask={mutateSubTask}
        countProgress={countProgress}
      />
    ));

    return (
      <div className="task__section">
        <ChecklistIcon />
        <div className="task__content">
          <h3>Subtasks</h3>
          <ProgressBar value={progress} />
          {checkList}
          <AddForm
            title="Create a subtask"
            mutate={mutateTask}
            formClassName="edit-table edit-table--independent"
            addButtonClassName="add-subtask"
            inputPlaceholder="Enter a subtask name..."
          />
        </div>
      </div>
    );
  }

  return null;
};

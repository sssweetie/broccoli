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
  const [progress, setProgress] = useState(0);
  const { updateSubTask, createSubTask, subTasks } = useCheckList(
    checkListApi(httpClient),
    taskId
  );

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

  if (subTasks) {
    const updateProgress = (checked: boolean) => {
      if (checked) {
        setProgress((prevState) => {
          return prevState + 100 / subTasks.length;
        });
      }

      if (!checked) {
        setProgress((prevState) => {
          return prevState - 100 / subTasks.length;
        });
      }
    };

    const checkList = subTasks.map((subTask) => (
      <SubTask
        subTask={subTask}
        updateSubTask={mutateSubTask}
        setProgress={updateProgress}
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
            formClassName="edit-table edit-table--subtask"
            addButtonClassName="add-subtask"
            inputPlaceholder="Enter a subtask name..."
          />
        </div>
      </div>
    );
  }

  return null;
};

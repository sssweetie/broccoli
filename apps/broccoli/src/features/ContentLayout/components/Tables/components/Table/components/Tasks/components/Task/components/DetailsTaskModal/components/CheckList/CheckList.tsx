import { FormEvent, useState } from 'react';
import { ISubTask } from 'apps/libs/types/src';
import { SubTask } from './components/SubTask';
import { useCheckList } from './hooks/useCheckList';
import { checkListApi } from './api/checkListApi';
import { httpClient } from 'apps/broccoli/src/services/httpClient';
import { ProgressBar } from 'apps/broccoli/src/components/ProgressBar';
import ChecklistIcon from '@mui/icons-material/Checklist';
// import { Link } from '@mui/material';
import { AddForm } from 'apps/broccoli/src/components/AddForm/AddForm';

interface IProps {
  taskId: string;
}

export const CheckList: React.FC<IProps> = ({ taskId }) => {
  const [progress, setProgress] = useState(0);
  const { updateSubTask, createSubTask, subTasks } = useCheckList(
    checkListApi(httpClient),
    taskId
  );

  // const onClick = () => {

  // };

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
          <AddForm title="Add a subtask" mutate={mutateTask} />
          {/* <Link
            onClick={onClick}
            sx={{ cursor: 'pointer', fontSize: '14px', fontStyle: 'italic' }}
          >
            Add item
          </Link> */}
        </div>
      </div>
    );
  }

  return null;
};

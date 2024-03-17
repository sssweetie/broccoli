import { useState } from 'react';
import { ISubTask } from 'apps/libs/types/src';
import { SubTask } from './components/SubTask';
import { useCheckList } from './hooks/useCheckList';
import { checkListApi } from './api/checkListApi';
import { httpClient } from 'apps/broccoli/src/services/httpClient';
import { ProgressBar } from 'apps/broccoli/src/components/ProgressBar';

interface IProps {
  taskId: string;
}

export const CheckList: React.FC<IProps> = ({ taskId }) => {
  const [progress, setProgress] = useState(0);
  const { updateSubTask, subTasks } = useCheckList(
    checkListApi(httpClient),
    taskId
  );

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
      <div>
        <ProgressBar value={progress} />
        {checkList}
      </div>
    );
  }

  return null;
};

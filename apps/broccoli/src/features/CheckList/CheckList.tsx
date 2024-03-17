import { useState } from 'react';
import { ProgressBar } from '../../components/ProgressBar';
import { ISubTask } from 'apps/libs/types/src';
import { SubTask } from './components/SubTask';
import { useCheckList } from './hooks/useCheckList';
import { httpClient } from '../../services/httpClient';
import { checkListApi } from './api/checkListApi';

interface IProps {
  subTasks: ISubTask[];
}

export const CheckList: React.FC<IProps> = ({ subTasks }) => {
  const [progress, setProgress] = useState(0);
  const { updateSubTask } = useCheckList(checkListApi(httpClient));

  const mutateSubTask = (subTask: ISubTask) => {
    updateSubTask.mutate(subTask);
  };

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
};

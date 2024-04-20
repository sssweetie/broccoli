import { SubTask } from '../SubTask';
import { useCheckList } from './hooks/useCheckList';
import { checkListApi } from './api/checkListApi';
import { httpClient } from 'apps/broccoli/src/services/httpClient';
import { ProgressBar } from 'apps/broccoli/src/components/ProgressBar';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { AddForm } from 'apps/broccoli/src/components/AddForm';
interface CheckListProps {
  taskId: string;
}

export const CheckList: React.FC<CheckListProps> = ({ taskId }) => {
  const {
    mutateEntity,
    updateSubTask,
    deleteSubTask,
    subTasks,
    progress,
    countProgress,
  } = useCheckList(checkListApi(httpClient), taskId);

  if (subTasks) {
    const checkList = subTasks.map((subTask) => (
      <SubTask
        subTask={subTask}
        deleteSubTask={deleteSubTask}
        updateSubTask={updateSubTask}
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
            mutateEntity={mutateEntity}
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

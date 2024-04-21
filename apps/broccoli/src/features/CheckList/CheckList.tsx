import { SubTask } from '../SubTask';
import { useCheckList } from './hooks/useCheckList';
import { ProgressBar } from 'apps/broccoli/src/components/ProgressBar';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { AddForm } from 'apps/broccoli/src/components/AddForm';
import { useSubtasksMutations } from '../../hooks/useSubtasksMutations';
interface CheckListProps {
  taskId: string;
}

export const CheckList: React.FC<CheckListProps> = ({ taskId }) => {
  const { progress, countProgress, mutateEntity } = useCheckList(taskId);
  const { subTasks, deleteSubtaskMutation, updateSubtaskMutation } =
    useSubtasksMutations(taskId);

  if (!subTasks) {
    return null;
  }

  const checkList = subTasks.map((subTask) => (
    <SubTask
      subTask={subTask}
      deleteSubTask={deleteSubtaskMutation}
      updateSubTask={updateSubtaskMutation}
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
};

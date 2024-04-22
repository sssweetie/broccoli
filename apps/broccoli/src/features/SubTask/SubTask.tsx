import { Checkbox } from '@mui/material';
import { SubTask as SubTaskType, VoidFunction } from 'apps/libs/types/src';
import { ChangeEvent, FocusEvent, MouseEvent } from 'react';
import { useModal } from '../../hooks/useModal';
import { SubtaskTitle } from './components/SubtaskTitle';
interface SubTaskProps {
  subTask: SubTaskType;
  updateSubTask: (subtask: SubTaskType) => void;
  deleteSubTask: (id: string) => void;
  countProgress: VoidFunction;
}

export const SubTask: React.FC<SubTaskProps> = ({
  subTask,
  updateSubTask,
  deleteSubTask,
  countProgress,
}) => {
  const { isOpen, closeModal, openModal } = useModal();

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    updateSubTask({ ...subTask, title: e.target.value });
    closeModal();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    updateSubTask({ ...subTask, isCompleted: checked });
    closeModal();
  };

  const deleteSubTaskOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteSubTask(subTask._id);
  };

  const updateSubTaskDate = (date: Date) => {
    updateSubTask({ ...subTask, date });
  };

  countProgress();

  return (
    <div className="subtask subtask--margin">
      <Checkbox
        checked={subTask.isCompleted}
        onChange={onChange}
        sx={{ padding: 0 }}
      />
      {isOpen ? (
        <input
          defaultValue={subTask.title}
          onBlur={onBlur}
          autoFocus
          className="input input--borderless"
        />
      ) : (
        <SubtaskTitle
          subTask={subTask}
          openModal={openModal}
          updateSubTask={updateSubTaskDate}
          deleteSubTask={deleteSubTaskOnClick}
        />
      )}
    </div>
  );
};

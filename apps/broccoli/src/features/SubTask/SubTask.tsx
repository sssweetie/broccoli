import { Checkbox } from '@mui/material';
import { SubTask as SubTaskType } from 'apps/libs/types/src';
import { ChangeEvent, FocusEvent, MouseEvent } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CalendarPicker } from '../../components/CalendarPicker';
import moment from 'moment';
import { useModal } from '../../hooks/useModal';
interface SubTaskProps {
  subTask: SubTaskType;
  updateSubTask: (subtask: SubTaskType) => void;
  deleteSubTask: (id: string) => void;
  countProgress: () => void;
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

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteSubTask(subTask._id);
  };

  const changeSubtaskDate = (date: Date) => {
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
        <h5
          className={`subtask__title ${
            subTask.isCompleted ? 'subtask__title--completed' : ''
          }`}
        >
          <span onClick={openModal}>{subTask.title}</span>
          <div className="subtask__icons">
            <CalendarPicker
              date={moment(subTask.date)}
              changeSubtaskDate={changeSubtaskDate}
            />
            <IconButton onClick={onClick}>
              <CloseIcon />
            </IconButton>
          </div>
        </h5>
      )}
    </div>
  );
};

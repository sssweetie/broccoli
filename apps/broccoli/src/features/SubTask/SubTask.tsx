import { Checkbox } from '@mui/material';
import { ISubTask } from 'apps/libs/types/src';
import { ChangeEvent, FocusEvent, MouseEvent, useState } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CalendarPicker } from '../../components/CalendarPicker';
import moment from 'moment';
interface SubTaskProps {
  subTask: ISubTask;
  updateSubTask: (subtask: ISubTask) => void;
  deleteSubTask: (id: string) => void;
  countProgress: () => void;
}

export const SubTask: React.FC<SubTaskProps> = ({
  subTask,
  updateSubTask,
  deleteSubTask,
  countProgress,
}) => {
  const [isEdit, setEdit] = useState(false);

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    updateSubTask({ ...subTask, title: e.target.value });
    setEdit(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    updateSubTask({ ...subTask, isCompleted: checked });
    setEdit(false);
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteSubTask(subTask._id);
  };

  const changeSubtaskDate = (date: Date) => {
    updateSubTask({ ...subTask, date });
  };

  const editSubTask = () => {
    setEdit(true);
  };

  countProgress();

  return (
    <div className="subtask subtask--margin">
      <Checkbox
        checked={subTask.isCompleted}
        onChange={onChange}
        sx={{ padding: 0 }}
      />
      {isEdit ? (
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
          <span onClick={editSubTask}>{subTask.title}</span>
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

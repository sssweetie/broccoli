import { Checkbox } from '@mui/material';
import { ISubTask } from 'apps/libs/types/src';
import { ChangeEvent, FocusEvent, MouseEvent, useState } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
interface IProps {
  subTask: ISubTask;
  updateSubTask: (subTask: ISubTask) => void;
  handleDeleteSubTask: (id: string) => void;
  setProgress: (checked: boolean) => void;
}

export const SubTask: React.FC<IProps> = ({
  subTask,
  updateSubTask,
  handleDeleteSubTask,
  setProgress,
}) => {
  const [isEdit, setEdit] = useState(false);

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    updateSubTask({ ...subTask, title: e.target.value });
    setEdit(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    updateSubTask({ ...subTask, isCompleted: checked });
    setProgress(checked);
    setEdit(false);
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleDeleteSubTask(subTask._id);
  };

  return (
    <div className="subtask subtask--margin">
      <Checkbox
        value={subTask.isCompleted}
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
          onClick={() => setEdit(true)}
          className={`subtask__title ${
            subTask.isCompleted ? 'subtask__title--completed' : ''
          }`}
        >
          <span>{subTask.title}</span>
          <IconButton onClick={onClick}>
            <CloseIcon />
          </IconButton>
        </h5>
      )}
    </div>
  );
};

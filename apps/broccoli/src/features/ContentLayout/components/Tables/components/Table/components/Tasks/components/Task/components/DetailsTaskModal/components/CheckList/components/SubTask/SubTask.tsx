import { Checkbox, TextField } from '@mui/material';
import { ISubTask } from 'apps/libs/types/src';
import { ChangeEvent, FocusEvent, useState } from 'react';

interface IProps {
  subTask: ISubTask;
  updateSubTask: (subTask: ISubTask) => void;
  setProgress: (checked: boolean) => void;
}

export const SubTask: React.FC<IProps> = ({
  subTask,
  updateSubTask,
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

  return (
    <div className="subtask subtask_margin">
      <Checkbox
        value={subTask.isCompleted}
        onChange={onChange}
        sx={{ padding: 0 }}
      />
      {isEdit ? (
        <TextField defaultValue={subTask.title} size="small" onBlur={onBlur} />
      ) : (
        <h5
          onClick={() => setEdit(true)}
          className={`subtask__title ${
            subTask.isCompleted ? 'subtask__title--completed' : ''
          }`}
        >
          {subTask.title}
        </h5>
      )}
    </div>
  );
};

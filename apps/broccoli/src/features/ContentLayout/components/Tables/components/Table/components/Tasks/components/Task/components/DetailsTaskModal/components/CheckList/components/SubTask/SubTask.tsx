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
    <div>
      <Checkbox value={subTask.isCompleted} onChange={onChange} />
      {isEdit ? (
        <TextField defaultValue="Small" size="small" onBlur={onBlur} />
      ) : (
        <h5 onClick={() => setEdit(true)}>{subTask.title}</h5>
      )}
    </div>
  );
};

import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

import { ChangeEvent, FormEvent, useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { UseMutateFunction } from '@tanstack/react-query';

interface Props {
  description: string | undefined;
  tableId: string;
  taskId: string;
  updateDescription: (description: string) => Promise<void>;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
  deleteTask: UseMutateFunction<void, Error, string, unknown>;
}

export const Description = ({
  description,
  tableId,
  taskId,
  updateDescription,
  deleteTable,
  deleteTask,
}: Props) => {
  const [isEdit, setEdit] = useState(false);
  const [value, setValue] = useState(description ? description : '');

  const disableEditMode = async () => {
    if (description !== value) {
      await updateDescription(value);
    }
    setEdit(false);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    disableEditMode();
  };
  const onBlur = async () => {
    disableEditMode();
  };
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const onClick = () => {
    setEdit(true);
  };

  const handleDeleteTable = async () => {
    await deleteTable(tableId);
  };

  const handleDeleteTask = async () => {
    await deleteTask(taskId);
  };

  return (
    <form onSubmit={onSubmit} className="task__section">
      <DescriptionIcon />
      <div className="task__content">
        <h3>Description</h3>
        {isEdit ? (
          <TextareaAutosize
            autoFocus
            className="task__description"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        ) : (
          <div onClick={onClick} className="task__description">
            {value}
          </div>
        )}
      </div>
      <section className="task__action">
        <h4>Actions</h4>
        <button className="button" onClick={handleDeleteTable}>
          <DeleteIcon />
          Delete table
        </button>
        <button className="button" onClick={handleDeleteTask}>
          <ClearIcon />
          Delete task
        </button>
      </section>
    </form>
  );
};

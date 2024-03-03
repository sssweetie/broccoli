import { Button, IconButton, TextField } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { ChangeEvent, FormEvent, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import { AddTask } from 'apps/libs/types/src';

interface Props {
  createTask: UseMutateFunction<void, Error, AddTask, unknown>;
  tableId: string;
  tasksCount: number;
}

export const AddNewTask = ({ createTask, tableId, tasksCount }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const turnOnEditMode = () => {
    setEditMode(true);
  };

  const turnOffEditMode = () => {
    setEditMode(false);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const task = {
        title: inputValue,
        order: tasksCount - 1,
      };
      await createTask({ tableId, task });
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return editMode ? (
    <form className="add-task-edit-mode" onSubmit={onSubmit}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={onChange}
      />
      <section className="add-task-edit-mode__buttons">
        <Button
          variant="contained"
          size="small"
          sx={{
            fontSize: '10px',
            padding: '6px 8px',
            fontWeight: '600',
          }}
          type="submit"
        >
          Create task
        </Button>
        <IconButton sx={{ padding: 0 }} onClick={turnOffEditMode}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </section>
    </form>
  ) : (
    <div className="add-task" onClick={turnOnEditMode}>
      <span className="add-task__plus">+</span>Create a task
    </div>
  );
};

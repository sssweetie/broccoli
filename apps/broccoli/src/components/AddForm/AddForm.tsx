import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
interface Props {
  mutate: (e: FormEvent<HTMLFormElement>, inputValue: string) => void;
  title: string;
}

export const AddForm = ({ mutate, title }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const isTask = title === 'Create a task' ? true : false;

  const turnEditModeOn = () => {
    setEditMode(true);
  };

  const turnEditModeOff = () => {
    setEditMode(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    await mutate(e, inputValue);
    setEditMode(false);
    setInputValue('');
  };

  return editMode ? (
    <form
      className={isTask ? `edit-table table__add-form` : `edit-table`}
      onSubmit={onSubmit}
    >
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={onChange}
      />
      <section className="edit-table__buttons">
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
          {title}
        </Button>
        <IconButton sx={{ padding: 0 }} onClick={turnEditModeOff}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </section>
    </form>
  ) : (
    <div className={isTask ? `add-task` : 'add-table'} onClick={turnEditModeOn}>
      <span className="add-task__plus">+</span>
      {title}
    </div>
  );
};

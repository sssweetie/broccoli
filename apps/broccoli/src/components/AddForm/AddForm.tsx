import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
interface Props {
  title: string;
  formClassName: string;
  inputPlaceholder: string;
  addButtonClassName: string;
  mutate: (e: FormEvent<HTMLFormElement>, inputValue: string) => void;
}

const sx = {
  fontSize: '10px',
  padding: '6px 8px',
  fontWeight: '600',
};

export const AddForm: React.FC<Props> = ({
  inputPlaceholder,
  addButtonClassName,
  formClassName,
  title,
  mutate,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

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
    <form className={formClassName} onSubmit={onSubmit}>
      <TextField
        id="outlined-basic"
        label={inputPlaceholder}
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={onChange}
      />
      <section className="edit-table__buttons">
        <Button variant="contained" size="small" sx={sx} type="submit">
          {title}
        </Button>
        <IconButton sx={{ padding: 0 }} onClick={turnEditModeOff}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </section>
    </form>
  ) : (
    <div className={addButtonClassName} onClick={turnEditModeOn}>
      <span className="add-task__plus">+</span>
      {title}
    </div>
  );
};

import { FormEvent } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useAddForm } from './hooks/useAddForm';

export type MutateForm = (
  e: FormEvent<HTMLFormElement>,
  inputValue: string
) => void;

interface AddFormProps {
  title: string;
  formClassName: string;
  inputPlaceholder: string;
  addButtonClassName: string;
  mutateEntity: MutateForm;
}

const sx = {
  fontSize: '10px',
  padding: '6px 8px',
  fontWeight: '600',
};

export const AddForm: React.FC<AddFormProps> = ({
  inputPlaceholder,
  addButtonClassName,
  formClassName,
  mutateEntity,
  title,
}) => {
  const {
    editMode,
    inputValue,
    onSubmit,
    onChange,
    turnEditModeOff,
    turnEditModeOn,
  } = useAddForm(mutateEntity);

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

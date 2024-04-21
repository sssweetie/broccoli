import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button, IconButton, TextField } from '@mui/material';
import { ChangeEvent, FC, FormEvent } from 'react';
import { AddFormLayoutProps } from '../../AddFormLayout';
import { VoidFunction } from 'apps/libs/types/src';

const sx = {
  fontSize: '10px',
  padding: '6px 8px',
  fontWeight: '600',
};

interface AddFormProps
  extends Omit<AddFormLayoutProps, 'mutateEntity' | 'addButtonClassName'> {
  inputValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  closeModal: VoidFunction;
}

export const AddForm: FC<AddFormProps> = ({
  formClassName,
  inputValue,
  inputPlaceholder,
  title,
  closeModal,
  onSubmit,
  onChange,
}) => {
  return (
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
        <IconButton sx={{ padding: 0 }} onClick={closeModal}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </section>
    </form>
  );
};

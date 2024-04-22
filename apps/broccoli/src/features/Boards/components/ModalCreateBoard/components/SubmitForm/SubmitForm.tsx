import { Button, TextField } from '@mui/material';
import { FC } from 'react';
import { ModalCreateBoardProps } from '../../ModalCreateBoard';

type SubmitFormProps = 'value' | 'onSubmit' | 'onChange';

export const SubmitForm: FC<Pick<ModalCreateBoardProps, SubmitFormProps>> = ({
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="pick-up-image-form">
      <TextField
        id="outlined-basic"
        label="Choose title"
        variant="outlined"
        value={value}
        size="small"
        onChange={onChange}
      />
      <Button type="submit" variant="contained">
        submit
      </Button>
    </form>
  );
};

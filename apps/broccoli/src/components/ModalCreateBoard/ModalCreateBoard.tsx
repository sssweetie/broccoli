import clsx from 'clsx';
import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
} from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { boxSX } from './constants';

interface ModalCreateBoardProps {
  isOpen: boolean;
  images: string[];
  value: string;
  selectedIndex: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchData: any;
  setSelectedIndex: Dispatch<SetStateAction<number | null>>;
  closeModal: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (index: number) => void;
}

export const ModalCreateBoard: React.FC<ModalCreateBoardProps> = ({
  isOpen,
  value,
  selectedIndex,
  images,
  onClick,
  fetchData,
  closeModal,
  onSubmit,
  onChange,
}) => {
  useEffect(() => fetchData(), [fetchData]);

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxSX}>
        <div className="pick-up-image-title">
          <h3>Choose your background</h3>
          <IconButton onClick={fetchData}>
            <RefreshIcon />
          </IconButton>
        </div>
        <section className="pick-up-image">
          {images.map((image, index) => (
            <img
              key={image}
              alt="background"
              src={image}
              className={clsx('pick-up-image__background', {
                'pick-up-image__background--with-border':
                  selectedIndex === index,
              })}
              onClick={() => onClick(index)}
            />
          ))}
        </section>
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
      </Box>
    </Modal>
  );
};

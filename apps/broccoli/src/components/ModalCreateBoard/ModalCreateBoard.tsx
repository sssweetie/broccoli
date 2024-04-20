import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getRandomBackgroundURL } from '../../features/Firebase';
import RefreshIcon from '@mui/icons-material/Refresh';
import { style } from '../../constants/TaskManager/styles/boardModal';

interface ModalCreateBoardProps {
  isOpen: boolean;
  value: string;
  selectedImage: HTMLElement | null;
  setSelectedImage: Dispatch<SetStateAction<HTMLImageElement | null>>;
  closeModal: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ModalCreateBoard: React.FC<ModalCreateBoardProps> = ({
  isOpen,
  value,
  selectedImage,
  setSelectedImage,
  closeModal,
  onSubmit,
  onChange,
}) => {
  const [images, setImages] = useState<string[]>([]);

  const fetchData = useCallback(() => {
    const getRandomIndex = () => Math.floor(Math.random() * 12) + 1;
    const indexes = new Set<number>();

    while (indexes.size < 6) {
      indexes.add(getRandomIndex());
    }

    Promise.all(Array.from(indexes, getRandomBackgroundURL)).then(setImages);
  }, []);

  //TODO: Нельзя мутировать state :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (e: any) => {
    if (e && e.target) {
      if (
        selectedImage &&
        selectedImage.classList.contains('pick-up-image__background_active')
      ) {
        selectedImage.classList.remove('pick-up-image__background_active');
      }
      e.target.classList.add('pick-up-image__background_active');
      setSelectedImage(e.target);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="pick-up-image-title">
          <h3>Choose your background</h3>
          <IconButton onClick={fetchData}>
            <RefreshIcon />
          </IconButton>
        </div>
        <section className="pick-up-image">
          {images.map((image) => (
            <img
              key={image}
              alt="background"
              src={image}
              className="pick-up-image__background"
              onClick={onClick}
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

import { Modal } from '@mui/material';
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
} from 'react';
import { SubmitForm } from './components/SubmitForm';
import { Images } from './components/Images';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { VoidFunction } from 'apps/libs/types/src';

export interface ModalCreateBoardProps {
  isOpen: boolean;
  images: string[];
  value: string;
  selectedIndex: number | null;
  fetchData: VoidFunction;
  closeModal: VoidFunction;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (index: number) => void;
  setSelectedIndex: Dispatch<SetStateAction<number | null>>;
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
      <Layout
        header={<Header fetchData={fetchData} />}
        images={
          <Images
            images={images}
            selectedIndex={selectedIndex}
            onClick={onClick}
          />
        }
        submitForm={
          <SubmitForm value={value} onChange={onChange} onSubmit={onSubmit} />
        }
      />
    </Modal>
  );
};

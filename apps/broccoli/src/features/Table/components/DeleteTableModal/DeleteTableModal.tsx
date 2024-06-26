import { Box, Button, Modal, Typography } from '@mui/material';
import { UseMutateFunction } from '@tanstack/react-query';
import { boxSX } from './constants';
import { VoidFunction } from 'apps/libs/types/src';
interface DeleteTableModal {
  isModalOpen: boolean;
  tableId: string;
  closeModal: VoidFunction;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const DeleteTableModal: React.FC<DeleteTableModal> = ({
  isModalOpen,
  tableId,
  closeModal,
  deleteTable,
}) => {
  const handleDeleteTable = async () => {
    await deleteTable(tableId);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxSX}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Do you want to delete this table?
        </Typography>
        <section className="modal__buttons">
          <Button variant="contained" onClick={handleDeleteTable}>
            Yes
          </Button>
          <Button variant="outlined" onClick={closeModal}>
            No
          </Button>
        </section>
      </Box>
    </Modal>
  );
};

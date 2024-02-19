import { Box, Button, Modal, Typography } from '@mui/material';
import { UseMutateFunction } from '@tanstack/react-query';

interface Props {
  isModalOpen: boolean;
  tableId: string;
  closeModal: () => void;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const DeleteTableModal = ({
  isModalOpen,
  closeModal,
  deleteTable,
  tableId,
}: Props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

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
      <Box sx={style}>
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

import BackupTableIcon from '@mui/icons-material/BackupTable';
import { useBoards } from './hooks/useBoards';
import { httpClient } from '../../services/httpClient';
import { boardsApi } from './api/boardsApi';
import { useNavigate } from 'react-router-dom';
import { Box, Modal } from '@mui/material';

export const Boards = () => {
  const { boards, isOpen, value, closeModal, openModal, onChange, onSubmit } =
    useBoards(boardsApi(httpClient));
  const navigate = useNavigate();

  const onClick = async () => {
    openModal();
    // await createBoard();
  };

  const redirect = (id: string) => {
    navigate(`/application/dragdrop/${id}`);
  };

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

  return (
    <>
      <h1 className="title">
        <BackupTableIcon />
        Your boards
      </h1>
      <div className="table-wrapper">
        {boards
          ? boards.map((board) => (
              <article onClick={() => redirect(board._id)} className="board">
                {board.title}
              </article>
            ))
          : null}
        <button onClick={onClick} className="board">
          Create a new board
        </button>
        <Modal
          open={isOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={onSubmit}>
              <input value={value} onChange={onChange} />
              <button>submit</button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

import BackupTableIcon from '@mui/icons-material/BackupTable';
import { useBoards } from './hooks/useBoards';
import { httpClient } from '../../services/httpClient';
import { boardsApi } from './api/boardsApi';
import { useNavigate } from 'react-router-dom';
import { ModalCreateBoard } from '../../components/ModalCreateBoard';
import { DropdownMenu } from '../../components/DropdownMenu';
import { MenuItem } from '@mui/material';

export const Boards: React.FC = () => {
  const {
    boards,
    isOpen,
    value,
    selectedImage,
    deleteBoard,
    setSelectedImage,
    closeModal,
    openModal,
    onChange,
    onSubmit,
  } = useBoards(boardsApi(httpClient));

  const navigate = useNavigate();

  const onClick = async () => {
    openModal();
  };

  const handleDeleteBoard = async (
    e: React.MouseEvent<HTMLLIElement>,
    id: string
  ) => {
    e.stopPropagation();
    await deleteBoard.mutate(id);
  };

  const redirect = (id: string) => {
    navigate(`/application/dragdrop/${id}`);
  };

  return (
    <>
      <h1 className="title">
        <BackupTableIcon />
        Your boards
      </h1>
      <div className="board-wrapper">
        {boards
          ? boards.map((board) => (
              <article
                onClick={() => redirect(board._id)}
                className="board"
                key={board._id}
              >
                {board.backgroundImage ? (
                  <img
                    src={board.backgroundImage}
                    className="board-background"
                    alt="board background"
                    key={board._id}
                  />
                ) : null}
                <section className="board__title">
                  <h4>{board.title}</h4>
                  <DropdownMenu
                    items={[
                      <MenuItem
                        onClick={(e) => handleDeleteBoard(e, board._id)}
                        key="delete-board"
                      >
                        Delete board
                      </MenuItem>,
                    ]}
                  />
                </section>
              </article>
            ))
          : null}
        <button onClick={onClick} className="board">
          Create a new board
        </button>
        <ModalCreateBoard
          isOpen={isOpen}
          value={value}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          closeModal={closeModal}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </div>
    </>
  );
};

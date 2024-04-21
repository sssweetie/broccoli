import BackupTableIcon from '@mui/icons-material/BackupTable';
import { useBoards } from './hooks/useBoards';
import { httpClient } from '../../services/httpClient';
import { boardsApi } from './api/boardsApi';
import { ModalCreateBoard } from '../../components/ModalCreateBoard';
import { Board } from './components/Board';

export const Boards: React.FC = () => {
  const {
    boards,
    isOpen,
    value,
    selectedImage,
    deleteBoard,
    setSelectedImage,
    closeModal,
    openModalOnClick,
    changeInputValue,
    createBoardOnSubmit,
    redirect,
  } = useBoards(boardsApi(httpClient));

  return (
    <>
      <h1 className="title">
        <BackupTableIcon />
        Your boards
      </h1>
      <div className="board-wrapper">
        {boards
          ? boards.map((board) => (
              <Board
                board={board}
                redirect={redirect}
                deleteBoard={deleteBoard}
              />
            ))
          : null}
        <button onClick={openModalOnClick} className="board">
          Create a new board
        </button>
        <ModalCreateBoard
          isOpen={isOpen}
          value={value}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          closeModal={closeModal}
          onSubmit={createBoardOnSubmit}
          onChange={changeInputValue}
        />
      </div>
    </>
  );
};

import BackupTableIcon from '@mui/icons-material/BackupTable';
import { useBoards } from '../../hooks/useBoards';
import { ModalCreateBoard } from '../../components/ModalCreateBoard';
import { Board } from './components/Board';
import { useBoardsMutations } from '../../hooks/useBoardsMutations';
import { useModal } from '../../hooks/useModal';

export const Boards: React.FC = () => {
  const {
    value,
    selectedImage,
    deleteBoard,
    setSelectedImage,
    changeInputValue,
    createBoard,
    redirect,
  } = useBoards();

  const { boards } = useBoardsMutations();
  const { isOpen, closeModal, openModal } = useModal();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await createBoard(e);
    closeModal();
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
              <Board
                board={board}
                redirect={redirect}
                deleteBoard={deleteBoard}
              />
            ))
          : null}
        <button onClick={openModal} className="board">
          Create a new board
        </button>
        <ModalCreateBoard
          isOpen={isOpen}
          value={value}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          closeModal={closeModal}
          onSubmit={onSubmit}
          onChange={changeInputValue}
        />
      </div>
    </>
  );
};

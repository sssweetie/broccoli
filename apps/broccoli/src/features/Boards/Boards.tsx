import BackupTableIcon from '@mui/icons-material/BackupTable';
import { useBoards } from '../../hooks/useBoards';
import { Board } from './components/Board';
import { useBoardsMutations } from '../../hooks/useBoardsMutations';
import { useModal } from '../../hooks/useModal';
import { BoardsLayout } from './components/BoardsLayout';
import { ModalCreateBoard } from './components/ModalCreateBoard';

export const Boards: React.FC = () => {
  const {
    value,
    images,
    selectedIndex,
    deleteBoard,
    createBoard,
    redirect,
    setSelectedIndex,
    changeInputValue,
    fetchData,
  } = useBoards();
  const { boards } = useBoardsMutations();
  const { isOpen, closeModal, openModal } = useModal();

  const createBoardOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await createBoard(e);
    closeModal();
  };

  const setActiveImageOnClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <h1 className="title">
        <BackupTableIcon />
        Your boards
      </h1>
      <BoardsLayout
        boardsComponent={boards?.map((board) => (
          <Board board={board} redirect={redirect} deleteBoard={deleteBoard} />
        ))}
        createBoardButton={
          <button onClick={openModal} className="board">
            Create a new board
          </button>
        }
        modalCreateBoard={
          <ModalCreateBoard
            isOpen={isOpen}
            images={images}
            value={value}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            closeModal={closeModal}
            onChange={changeInputValue}
            fetchData={fetchData}
            onSubmit={createBoardOnSubmit}
            onClick={setActiveImageOnClick}
          />
        }
      />
    </>
  );
};

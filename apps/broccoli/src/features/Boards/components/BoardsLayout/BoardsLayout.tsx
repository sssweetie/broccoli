import { FC, ReactNode } from 'react';

interface BoardsLayoutProps {
  boardsComponent: ReactNode;
  createBoardButton: ReactNode;
  modalCreateBoard: ReactNode;
}

export const BoardsLayout: FC<BoardsLayoutProps> = ({
  boardsComponent,
  createBoardButton,
  modalCreateBoard,
}) => {
  return (
    <div className="board-wrapper">
      {boardsComponent}
      {createBoardButton}
      {modalCreateBoard}
    </div>
  );
};

import { MenuItem } from '@mui/material';
import { DropdownMenu } from 'apps/broccoli/src/components/DropdownMenu';
import { IBoard } from 'apps/libs/types/src';
import { FC } from 'react';

interface BoardProps {
  board: IBoard;
  deleteBoard: (
    e: React.MouseEvent<HTMLLIElement>,
    id: string
  ) => Promise<void>;
  redirect: (id: string) => void;
}

export const Board: FC<BoardProps> = ({ board, redirect, deleteBoard }) => {
  const redirectToBoards = () => redirect(board._id);

  const backgroundImage = board.backgroundImage && (
    <img
      src={board.backgroundImage}
      className="board-background"
      alt="board background"
      key={board._id}
    />
  );

  return (
    <article onClick={redirectToBoards} className="board" key={board._id}>
      {backgroundImage}
      <section className="board__title">
        <h4>{board.title}</h4>
        <DropdownMenu
          items={[
            <MenuItem
              onClick={(e) => deleteBoard(e, board._id)}
              key="delete-board"
            >
              Delete board
            </MenuItem>,
          ]}
        />
      </section>
    </article>
  );
};

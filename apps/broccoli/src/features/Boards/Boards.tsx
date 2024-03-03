import React from 'react';
import { useBoards } from './hooks/useBoards';
import { httpClient } from '../../services/httpClient';
import { boardsApi } from './api/boardsApi';
import { useNavigate } from 'react-router-dom';

export const Boards = () => {
  const { boards, createBoard } = useBoards(boardsApi(httpClient));
  const navigate = useNavigate();
  const onClick = async () => {
    await createBoard();
  };

  const redirect = (id: string) => {
    navigate(`/application/dragdrop/${id}`);
  };

  return (
    <>
      <div>
        {boards
          ? boards.map((board) => (
              <article onClick={() => redirect(board._id)}>
                {board.title}
              </article>
            ))
          : null}
      </div>
      <button onClick={onClick}>create a board</button>
    </>
  );
};

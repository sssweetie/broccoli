import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Tables } from '../Tables';
import { useDragDrop } from '../../hooks/useDragDrop';
import { AddForm } from '../../components/AddForm/AddForm';
import { ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useBoards } from '../Boards/hooks/useBoards';
import { boardsApi } from '../Boards/api/boardsApi';
import { httpClient } from '../../services/httpClient';

export const ContentLayout = () => {
  const { id } = useParams();

  const {
    setEdit,
    onDragEnd,
    isEdit,
    createTable,
    board,
    isDragDisabled,
    deleteTable,
    boardInfo,
  } = useDragDrop(id!);

  const { updateBoard } = useBoards(boardsApi(httpClient));

  const mutateTable = async (e: FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    const table = { order: board?.length, tasks: [], title };
    await createTable.mutate({ table, boardId: id! });
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    updateBoard.mutate({ _id: id, title: e.target.value });
    setEdit(false);
  };

  const onClick = () => {
    setEdit(true);
  };

  return board ? (
    <>
      <section className="board-title">
        {!isEdit ? (
          <h4 onClick={onClick}>{boardInfo.title}</h4>
        ) : (
          <input
            className="board-title--input"
            defaultValue={boardInfo.title}
            onBlur={onBlur}
            autoFocus
          />
        )}
      </section>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tables" type="TABLE" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {boardInfo.backgroundImage ? (
                <img
                  alt="table background"
                  src={boardInfo.backgroundImage}
                  className="table-background"
                />
              ) : null}
              <div className="table-wrapper">
                <Tables
                  board={board}
                  isDragDisabled={isDragDisabled}
                  deleteTable={deleteTable.mutate}
                />
                {provided.placeholder}
                <AddForm mutate={mutateTable} title="Create a table" />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ToastContainer />
    </>
  ) : (
    <CircularProgress
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

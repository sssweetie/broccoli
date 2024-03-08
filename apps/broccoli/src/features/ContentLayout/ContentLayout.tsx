import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Tables } from './components/Tables';
import { useDragDrop } from './hooks/useDragDrop';
import { AddForm } from '../../components/AddForm/AddForm';
import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';

export const ContentLayout = () => {
  const { id } = useParams();

  const {
    onDragEnd,
    createTable,
    board,
    isDragDisabled,
    deleteTable,
    backgroundImage,
  } = useDragDrop(id!);

  const mutateTable = async (e: FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    const table = { order: board?.length, tasks: [], title };
    await createTable.mutate({ table, boardId: id! });
  };

  return board ? (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tables" type="TABLE" direction="horizontal">
          {(provided) => (
            <div
              className="table-wrapper"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {backgroundImage ? (
                <img
                  alt="table background"
                  src={backgroundImage}
                  className="table-background"
                />
              ) : null}
              <Tables
                board={board}
                isDragDisabled={isDragDisabled}
                deleteTable={deleteTable.mutate}
              />
              {provided.placeholder}
              <AddForm mutate={mutateTable} title="Create a table" />
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

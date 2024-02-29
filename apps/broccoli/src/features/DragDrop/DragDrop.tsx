import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Tables } from './components/Tables';
import { useDragDrop } from './hooks/useDragDrop';
import { ToastContainer } from 'react-toastify';
import { AddForm } from '../../components/AddForm';
import { FormEvent } from 'react';
export const DragDrop = () => {
  const { onDragEnd, createTable, board, isDragDisabled, deleteTable } =
    useDragDrop();

  const mutateTable = async (e: FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    await createTable.mutate({ order: board?.length, tasks: [], title });
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
    <div className="loader"></div>
  );
};

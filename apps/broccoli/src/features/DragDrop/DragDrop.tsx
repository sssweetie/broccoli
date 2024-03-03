import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Tables } from './components/Tables';
import { useDragDrop } from './hooks/useDragDrop';
import { ToastContainer } from 'react-toastify';
import { AddForm } from '../../components/AddForm';
import { FormEvent, createContext } from 'react';
import { useParams } from 'react-router-dom';
export const DragDrop = () => {
  const { id } = useParams();

  const { onDragEnd, createTable, board, isDragDisabled, deleteTable } =
    useDragDrop(id!);

  const mutateTable = async (e: FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    const table = { order: board?.length, tasks: [], title };
    await createTable.mutate({ table, boardId: id! });
  };

  const BoardContext = createContext('');

  return board ? (
    <BoardContext.Provider value={id!}>
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
    </BoardContext.Provider>
  ) : (
    <div className="loader"></div>
  );
};

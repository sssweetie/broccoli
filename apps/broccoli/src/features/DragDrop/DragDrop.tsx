import './dragDrop.scss';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Tables } from './components/Tables';
import { useDragDrop } from './hooks/useDragDrop';
import { ToastContainer } from 'react-toastify';
import { AddTable } from './components/AddTable';
export const DragDrop = () => {
  const { onDragEnd, board, isDragDisabled } = useDragDrop();

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
              <Tables board={board} isDragDisabled={isDragDisabled} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddTable />
      <ToastContainer />
    </>
  ) : (
    <div className="loader"></div>
  );
};

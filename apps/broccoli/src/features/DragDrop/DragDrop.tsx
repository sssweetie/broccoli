import {
  DragDropContext,
  Droppable,
} from '@hello-pangea/dnd';
import './dragDrop.scss';
import { Tables } from './components/Tables';
import { useDragDrop } from './hooks/useDragDrop';
import { dragDropApi } from './api/dragDropApi';
import { httpClient } from '../../services/httpClient';
import { ToastContainer } from 'react-toastify';
export const DragDrop = () => {
  const { onDragEnd, board, isDragDisabled } = useDragDrop(dragDropApi(httpClient));

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
              <Tables board={board} isDragDisabled={isDragDisabled}/>
              {provided.placeholder}
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

import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import './dragDrop.scss';
import { Tables } from './components/Tables';
import { useDragDrop } from './hooks/useDragDrop';
import { dragDropApi } from './api/dragDropApi';
import { httpClient } from '../../services/httpClient';

export const DragDrop = () => {
  const { onDragEnd, board } = useDragDrop(dragDropApi(httpClient));
  return board ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tables" type="TABLE" direction="horizontal">
        {(provided) => (
          <div
            className="table-wrapper"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Tables board={board} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
};

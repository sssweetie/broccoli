import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import './dragDrop.scss';
import { Tables } from './components/Tables';
import { useDragDrop } from './hooks/useDragDrop';

export const DragDrop = () => {
  const { onDragEnd, board } = useDragDrop();

  return (
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
  );
};

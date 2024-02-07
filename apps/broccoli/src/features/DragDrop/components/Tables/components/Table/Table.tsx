import { DraggableProvided, Droppable } from '@hello-pangea/dnd';
import { Tasks } from '../Tasks/Tasks';
import { ITable } from 'apps/libs/types/src';

interface Props {
  provided: DraggableProvided;
  table: ITable;
}

export const Table = ({ provided, table }: Props) => {
  return (
    <article
      className="table"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <h3 className="table__title">{table.title}</h3>
      <Droppable droppableId={table._id} type="TASK">
        {(provided) => (
          <div
            className="table__tasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Tasks table={table} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </article>
  );
};

import { Droppable } from '@hello-pangea/dnd';
import { FC } from 'react';
import { Tasks } from '../../../Tasks';
import { Table } from 'apps/libs/types/src';
import { UseMutateFunction } from '@tanstack/react-query';

interface DroppableArea {
  table: Table;
  isDragDisabled: boolean;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const DroppableArea: FC<DroppableArea> = ({
  table,
  isDragDisabled,
  deleteTable,
}) => {
  return (
    <Droppable droppableId={table._id} type="TASK">
      {(provided) => (
        <div
          className="table__tasks"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <Tasks
            table={table}
            isDragDisabled={isDragDisabled}
            deleteTable={deleteTable}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

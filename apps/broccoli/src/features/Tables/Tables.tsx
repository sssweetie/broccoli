import { Draggable } from '@hello-pangea/dnd';
import { Table } from '../Table';
import { Table as TableType } from 'apps/libs/types/src';
import { UseMutateFunction } from '@tanstack/react-query';

interface TablesProps {
  board: TableType[];
  isDragDisabled: boolean;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Tables: React.FC<TablesProps> = ({
  board,
  isDragDisabled,
  deleteTable,
}) => {
  return board.map((table, index) => (
    <Draggable
      draggableId={table._id}
      index={index}
      key={table._id}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <Table
          deleteTable={deleteTable}
          provided={provided}
          table={table}
          isDragDisabled={isDragDisabled}
        />
      )}
    </Draggable>
  ));
};

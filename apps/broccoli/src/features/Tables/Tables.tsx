import { Draggable } from '@hello-pangea/dnd';
import { Table } from '../Table/Table';
import { ITable } from 'apps/libs/types/src';
import { UseMutateFunction } from '@tanstack/react-query';

interface Props {
  board: ITable[];
  isDragDisabled: boolean;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Tables: React.FC<Props> = ({
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

import { Draggable } from '@hello-pangea/dnd';
import { Table } from './components/Table/Table';
import { ITable } from 'apps/libs/types/src';
import { UseMutateFunction } from '@tanstack/react-query';
import { UpdateTask } from '../../api/taskApi';

interface Props {
  board: ITable[];
  isDragDisabled: boolean;
  createTask: UseMutateFunction<void, Error, UpdateTask, unknown>;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Tables = ({
  board,
  isDragDisabled,
  createTask,
  deleteTable,
}: Props) => {
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
          createTask={createTask}
          provided={provided}
          table={table}
          isDragDisabled={isDragDisabled}
        />
      )}
    </Draggable>
  ));
};

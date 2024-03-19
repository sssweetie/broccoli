import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../Task/Task';
import { ITable } from 'apps/libs/types/src';
import { UseMutateFunction } from '@tanstack/react-query';

interface IProps {
  table: ITable;
  isDragDisabled: boolean;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Tasks: React.FC<IProps> = ({
  table,
  isDragDisabled,
  deleteTable,
}) => {
  return table.tasks.map((task, index) => (
    <Draggable
      draggableId={task._id}
      index={index}
      key={task._id}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <Task
          deleteTable={deleteTable}
          tableTitle={table.title}
          tableId={table._id}
          task={task}
          provided={provided}
        />
      )}
    </Draggable>
  ));
};

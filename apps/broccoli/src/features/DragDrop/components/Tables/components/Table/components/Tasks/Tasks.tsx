import { Draggable } from '@hello-pangea/dnd';
import { Task } from './components/Task/Task';
import { ITable, UpdateTask } from 'apps/libs/types/src';
import { UseMutateFunction } from '@tanstack/react-query';

interface Props {
  table: ITable;
  isDragDisabled: boolean;
  updateTask: UseMutateFunction<void, Error, UpdateTask, unknown>;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Tasks = ({
  table,
  isDragDisabled,
  updateTask,
  deleteTable,
}: Props) => {
  return table.tasks.map((task, index) => (
    <Draggable
      draggableId={task._id}
      index={index}
      key={task._id}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <Task
          updateTask={updateTask}
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

import { DraggableProvided, Droppable } from '@hello-pangea/dnd';
import { Tasks } from '../Tasks/Tasks';
import { ITable } from 'apps/libs/types/src';
import { AddNewTask } from './components/AddNewTask';
import { UseMutateFunction } from '@tanstack/react-query';
import { UpdateTask } from '../../../../api/taskApi';

interface Props {
  provided: DraggableProvided;
  table: ITable;
  isDragDisabled: boolean;
  createTask: UseMutateFunction<void, Error, UpdateTask, unknown>;
}

export const Table = ({
  provided,
  table,
  isDragDisabled,
  createTask,
}: Props) => {
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
            <Tasks table={table} isDragDisabled={isDragDisabled} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddNewTask
        createTask={createTask}
        tableId={table._id}
        tasksCount={table.tasks.length}
      />
    </article>
  );
};

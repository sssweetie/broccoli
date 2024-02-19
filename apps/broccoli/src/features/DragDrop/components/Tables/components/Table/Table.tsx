import './table.scss';

import { DraggableProvided, Droppable } from '@hello-pangea/dnd';
import { Tasks } from '../Tasks/Tasks';
import { ITable } from 'apps/libs/types/src';
import { AddNewTask } from './components/AddNewTask';
import { UseMutateFunction } from '@tanstack/react-query';
import { UpdateTask } from '../../../../api/taskApi';
import { DropdownMenu } from './components/DropdownMenu';
import { DeleteTableModal } from './components/DeleteTableModal';
import { useState } from 'react';
interface Props {
  provided: DraggableProvided;
  table: ITable;
  isDragDisabled: boolean;
  createTask: UseMutateFunction<void, Error, UpdateTask, unknown>;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Table = ({
  provided,
  table,
  isDragDisabled,
  createTask,
  deleteTable,
}: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <article
      className="table"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <section className="table__header">
        <h3 className="table__title">{table.title}</h3>
        <DropdownMenu openModal={openModal} />
      </section>

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
      <DeleteTableModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        deleteTable={deleteTable}
        tableId={table._id}
      />
    </article>
  );
};

import './table.scss';

import { DraggableProvided, Droppable } from '@hello-pangea/dnd';
import { ITable } from 'apps/libs/types/src';
import { AddNewTask } from './components/AddNewTask';
import { UseMutateFunction } from '@tanstack/react-query';
import { DropdownMenu } from './components/DropdownMenu';
import { DeleteTableModal } from './components/DeleteTableModal';
import { useState } from 'react';
import { useTask } from '../../../../hooks/useTask';
import { Tasks } from './components/Tasks/Tasks';
import { taskApi } from '../../../../api/taskApi';
import { httpClient } from 'apps/broccoli/src/services/httpClient';
interface Props {
  provided: DraggableProvided;
  table: ITable;
  isDragDisabled: boolean;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Table = ({
  provided,
  table,
  isDragDisabled,
  deleteTable,
}: Props) => {
  const { createTask } = useTask(taskApi(httpClient));
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
            <Tasks
              table={table}
              isDragDisabled={isDragDisabled}
              deleteTable={deleteTable}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddNewTask
        createTask={createTask.mutate}
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

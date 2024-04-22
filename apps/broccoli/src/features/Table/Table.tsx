import { DraggableProvided } from '@hello-pangea/dnd';
import { Table as TableType } from 'apps/libs/types/src';
import { UseMutateFunction } from '@tanstack/react-query';
import { DeleteTableModal } from './components/DeleteTableModal';
import { FormEvent } from 'react';
import { useTask } from '../../hooks/useTask';
import { MenuItem } from '@mui/material';
import { useModal } from '../../hooks/useModal';
import { AddFormLayout } from '../../components/AddFormLayout';
import { Provided } from '../../components/Provided/Provided';
import { DroppableArea } from './components/DroppableArea';
import { Header } from './components/Header';
interface TableProps {
  provided: DraggableProvided;
  table: TableType;
  isDragDisabled: boolean;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Table: React.FC<TableProps> = ({
  provided,
  table,
  isDragDisabled,
  deleteTable,
}) => {
  const { createTask } = useTask();
  const { isOpen, closeModal, openModal } = useModal();

  const mutateTask = async (e: FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    const task = {
      title,
      order: table.tasks.length - 1,
    };
    await createTask.mutate({ tableId: table._id, task });
  };

  const items = [
    <MenuItem onClick={openModal} key="delete-table">
      Delete table
    </MenuItem>,
  ];

  return (
    <Provided className="table" provided={provided}>
      <Header items={items} title={table.title} />

      <DroppableArea
        isDragDisabled={isDragDisabled}
        table={table}
        deleteTable={deleteTable}
      />

      <AddFormLayout
        mutateEntity={mutateTask}
        title="Create a task"
        formClassName="edit-table table__add-form"
        addButtonClassName="add-task"
        inputPlaceholder="Enter a task name..."
      />

      <DeleteTableModal
        isModalOpen={isOpen}
        closeModal={closeModal}
        deleteTable={deleteTable}
        tableId={table._id}
      />
    </Provided>
  );
};

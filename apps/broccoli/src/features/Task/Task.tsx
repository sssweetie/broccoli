import { DraggableProvided } from '@hello-pangea/dnd';
import { Task as TaskType } from 'apps/libs/types/src';
import { DetailsTaskModal } from '../DetailsTaskModal';
import { UseMutateFunction } from '@tanstack/react-query';
import { useModal } from '../../hooks/useModal';
import { Provided } from '../../components/Provided/Provided';

interface TaskProps {
  provided: DraggableProvided;
  tableTitle: string;
  tableId: string;
  task: TaskType;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export const Task: React.FC<TaskProps> = ({
  provided,
  task,
  tableTitle,
  tableId,
  deleteTable,
}) => {
  const { openModal, closeModal, isOpen } = useModal();

  return (
    <>
      <Provided provided={provided} onClick={openModal} className="table__task">
        {task.title}
      </Provided>
      <DetailsTaskModal
        isOpen={isOpen}
        closeModal={closeModal}
        deleteTableMutation={deleteTable}
        task={task}
        tableId={tableId}
        tableTitle={tableTitle}
      />
    </>
  );
};

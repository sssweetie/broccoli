import { Task } from 'apps/libs/types/src';

import { Box, Modal } from '@mui/material';
import { UseMutateFunction } from '@tanstack/react-query';

import { AuditLogs } from '../AuditLogs/AuditLogs';
import { Description } from './components/Description';
import { Title } from './components/Title';
import { useDetailsTaskModal } from './hooks/useDetailsTaskModal';
import { TASK_MODAL_STYLE } from 'apps/broccoli/src/constants/taskModal';
import { CheckList } from '../CheckList';

interface DetailsTaskModalProps {
  isOpen: boolean;
  task: Task;
  tableTitle: string;
  tableId: string;
  closeModal: () => void;
  deleteTableMutation: UseMutateFunction<void, Error, string, unknown>;
}

export interface Description {
  tableId: string;
  taskId: string;
  text?: string;
}

export const DetailsTaskModal: React.FC<DetailsTaskModalProps> = ({
  isOpen,
  task,
  tableTitle,
  tableId,
  closeModal,
  deleteTableMutation,
}) => {
  const { updateDescription, updateTitle, deleteTaskMutation } =
    useDetailsTaskModal(task);

  const description: Description = {
    tableId,
    taskId: task._id,
    text: task.description,
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={TASK_MODAL_STYLE.BOX} className="task">
        <Title
          tableTitle={tableTitle}
          title={task.title}
          updateTitle={updateTitle}
        />
        <Description
          description={description}
          updateDescription={updateDescription}
          deleteTableMutation={deleteTableMutation}
          deleteTaskMutation={deleteTaskMutation}
        />
        <CheckList taskId={task._id} />
        {task.audits ? <AuditLogs taskId={task._id} /> : null}
      </Box>
    </Modal>
  );
};

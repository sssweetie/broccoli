import { ITask } from 'apps/libs/types/src';

import { Box, Modal } from '@mui/material';
import { UseMutateFunction } from '@tanstack/react-query';

import { AuditLogs } from '../AuditLogs/AuditLogs';
import { Description } from './components/Description';
import { Title } from './components/Title';
import { useDetailsTaskModal } from './hooks/useDetailsTaskModal';
import { TASK_MODAL_STYLE } from 'apps/broccoli/src/constants/TaskManager/styles/taskModal';
import { CheckList } from '../CheckList';

interface IProps {
  isOpen: boolean;
  task: ITask;
  tableTitle: string;
  tableId: string;
  closeModal: () => void;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

export interface IDescription {
  tableId: string;
  taskId: string;
  text: string | undefined;
}

export const DetailsTaskModal: React.FC<IProps> = ({
  isOpen,
  task,
  tableTitle,
  tableId,
  closeModal,
  deleteTable,
}) => {
  const { operations } = useDetailsTaskModal({ task });

  const description: IDescription = {
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
          updateTitle={operations.updateTitle}
        />
        <Description
          description={description}
          updateDescription={operations.updateDescription}
          deleteTable={deleteTable}
          deleteTask={operations.deleteTask}
        />
        <CheckList taskId={task._id} />
        {task.audits ? <AuditLogs taskId={task._id} /> : null}
      </Box>
    </Modal>
  );
};

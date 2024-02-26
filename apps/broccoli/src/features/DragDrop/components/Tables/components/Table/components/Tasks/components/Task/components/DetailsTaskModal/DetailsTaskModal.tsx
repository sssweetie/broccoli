import './detailsTaskModal.scss';

import { Box, Modal } from '@mui/material';
import { UseMutateFunction } from '@tanstack/react-query';
import { ITask, UpdateTask } from 'apps/libs/types/src';
import { AuditLogs } from './components/AuditLogs/AuditLogs';
import { Title } from './components/Title';
import { Description } from './components/Description';
import { useUser } from '@clerk/clerk-react';

interface Props {
  isOpen: boolean;
  task: ITask;
  tableTitle: string;
  tableId: string;
  closeModal: () => void;
  updateTask: UseMutateFunction<void, Error, UpdateTask, unknown>;
  deleteTask: UseMutateFunction<void, Error, string, unknown>;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const DetailsTaskModal = ({
  isOpen,
  task,
  tableTitle,
  tableId,
  closeModal,
  updateTask,
  deleteTask,
  deleteTable,
}: Props) => {
  const { user } = useUser();

  const updateTitle = async (title: string) => {
    const newTask = { ...task, title };
    const params = {
      type: 'updateTitle',
      newName: title,
    };

    const audit = {
      userId: user?.id,
      userName: user?.username,
      userImg: user?.imageUrl,
      params: params,
      date: new Date(),
    };

    await updateTask({ task: newTask, audit });
  };

  const updateDescription = async (description: string) => {
    const newTask = { ...task, description };
    const params = {
      type: 'updateDescription',
    };

    const audit = {
      userId: user?.id,
      userName: user?.username,
      userImg: user?.imageUrl,
      params: params,
      date: new Date(),
    };

    await updateTask({ task: newTask, audit });
  };
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="task">
        <Title
          tableTitle={tableTitle}
          title={task.title}
          updateTitle={updateTitle}
        />
        <Description
          tableId={tableId}
          taskId={task._id}
          description={task.description}
          updateDescription={updateDescription}
          deleteTable={deleteTable}
          deleteTask={deleteTask}
        />
        {task.audits ? <AuditLogs taskId={task._id} /> : null}
      </Box>
    </Modal>
  );
};

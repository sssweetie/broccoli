import { IconButton } from '@mui/material';
import { CalendarPicker } from 'apps/broccoli/src/features/SubTask/components/CalendarPicker';
import moment from 'moment';
import clsx from 'clsx';
import { SubTask, VoidFunction } from 'apps/libs/types/src';
import { FC, MouseEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface SubtaskTitleProps {
  subTask: SubTask;
  openModal: VoidFunction;
  updateSubTask: (date: Date) => void;
  deleteSubTask: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const SubtaskTitle: FC<SubtaskTitleProps> = ({
  subTask,
  openModal,
  updateSubTask,
  deleteSubTask,
}) => {
  const { isCompleted, title, date } = subTask;
  return (
    <h5
      className={clsx('subtask__title', {
        'subtask__title--completed': isCompleted,
      })}
    >
      <span onClick={openModal}>{title}</span>
      <div className="subtask__icons">
        <CalendarPicker date={moment(date)} changeSubtaskDate={updateSubTask} />
        <IconButton onClick={deleteSubTask}>
          <CloseIcon />
        </IconButton>
      </div>
    </h5>
  );
};

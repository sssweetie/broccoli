import { SubTask } from 'apps/libs/types/src';
import React, { PropsWithChildren } from 'react';

interface DayProps {
  daySubtasks: SubTask[] | [];
  className?: string;
}

export const Day: React.FC<PropsWithChildren<DayProps>> = ({
  children,
  className,
  daySubtasks,
}) => {
  const dayClassName = className ?? 'day';
  const subtasks = daySubtasks.map((subtask) => (
    <div className="calendar-subtask">{subtask.title}</div>
  ));
  return (
    <div className={dayClassName}>
      {children}
      <div className="day__subtasks">{subtasks}</div>
    </div>
  );
};

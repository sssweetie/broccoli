import { ISubTask } from 'apps/libs/types/src';
import React from 'react';

type Children = string | JSX.Element | JSX.Element[];

interface Props {
  children: Children;
  daySubtasks: ISubTask[] | [];
  className?: string;
}

export const Day: React.FC<Props> = ({ children, className, daySubtasks }) => {
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

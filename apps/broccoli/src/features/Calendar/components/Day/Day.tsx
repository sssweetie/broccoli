import React from 'react';

type Children = string | JSX.Element | JSX.Element[];

interface Props {
  children: Children;
  className?: string;
}

export const Day: React.FC<Props> = ({ children, className }) => {
  const dayClassName = className ?? 'day';

  return <div className={dayClassName}>{children}</div>;
};

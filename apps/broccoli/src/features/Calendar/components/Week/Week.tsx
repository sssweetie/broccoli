import React from 'react';

type Children = string | JSX.Element | JSX.Element[];

interface Props {
  children: Children;
}

export const Week: React.FC<Props> = ({ children }) => {
  return <div className="week">{children}</div>;
};

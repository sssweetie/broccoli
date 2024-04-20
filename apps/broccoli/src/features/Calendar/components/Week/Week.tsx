import React, { PropsWithChildren } from 'react';

export const Week: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="week">{children}</div>;
};

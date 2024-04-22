import { DropdownMenu } from 'apps/broccoli/src/components/DropdownMenu';
import React, { FC } from 'react';

interface HeaderProps {
  title: string;
  items: JSX.Element[];
}

export const Header: FC<HeaderProps> = ({ title, items }) => {
  return (
    <section className="table__header">
      <h3 className="table__title">{title}</h3>
      <DropdownMenu items={items} />
    </section>
  );
};

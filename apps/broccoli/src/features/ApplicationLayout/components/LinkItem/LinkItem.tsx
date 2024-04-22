import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { LinkItemIcon } from '../Content/Content';

interface LinkItemProps {
  isOpen: boolean;
  title: string;
  Icon: LinkItemIcon;
}

export const LinkItem: React.FC<LinkItemProps> = ({ isOpen, title, Icon }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/application/${title.toLowerCase().trim()}`);
  };

  return (
    <div
      onClick={onClick}
      className={clsx('navigation__item', { 'navigation__item--open': isOpen })}
    >
      <Icon />
      <span>{title}</span>
    </div>
  );
};

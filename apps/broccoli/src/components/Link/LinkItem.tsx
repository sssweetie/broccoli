import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkItemIcon } from '../ApplicationLayout/ApplicationLayout';

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
      className={`${
        isOpen ? 'navigation__item navigation__item--open' : 'navigation__item'
      }`}
    >
      <Icon />
      <span>{title}</span>
    </div>
  );
};

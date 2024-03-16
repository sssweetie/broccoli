import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
}

export const LinkItem: React.FC<Props> = ({ isOpen, title, Icon }) => {
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

import { Outlet } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { LinkItem } from '../LinkItem';
import { FC } from 'react';

export type LinkItemIcon = typeof EditCalendarIcon;

interface ContentProps {
  className: string;
  isOpen: boolean;
  icon: JSX.Element;
  onClick: VoidFunction;
}

export const Content: FC<ContentProps> = ({
  className,
  isOpen,
  icon,
  onClick,
}) => {
  return (
    <div className="content-wrapper">
      <nav className={className}>
        <div className="burger" onClick={onClick}>
          {icon}
        </div>
        <LinkItem Icon={DashboardIcon} isOpen={isOpen} title={'Boards'} />
        <LinkItem Icon={EditCalendarIcon} isOpen={isOpen} title={'Calendar'} />
      </nav>
      <div className="outlet-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

import { Outlet } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { LinkItem } from '../LinkItem';
import { useApplicationLayout } from './hooks/useApplicationLayout';

export type LinkItemIcon = typeof EditCalendarIcon;

export const ApplicationLayout: React.FC = () => {
  const { isOpen, className, icon, onClick } = useApplicationLayout();

  return (
    <main className="app-wrapper">
      <Navigation />
      <div className="content-wrapper">
        <nav className={className}>
          <div className="burger" onClick={onClick}>
            {icon}
          </div>
          <LinkItem Icon={DashboardIcon} isOpen={isOpen} title={'Boards'} />
          <LinkItem
            Icon={EditCalendarIcon}
            isOpen={isOpen}
            title={'Calendar'}
          />
        </nav>
        <div className="outlet-wrapper">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

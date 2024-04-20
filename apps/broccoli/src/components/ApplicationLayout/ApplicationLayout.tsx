import { Outlet } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import NoFoodIcon from '@mui/icons-material/NoFood';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { LinkItem } from '../Link';
import { useApplicationLayout } from './hooks/useApplicationLayout';

export type LinkItemIcon = typeof EditCalendarIcon;

const sx = { color: '#2a4365' };

export const ApplicationLayout: React.FC = () => {
  const { isOpen, onClick } = useApplicationLayout();
  const className = isOpen ? 'navigation navigation--open' : 'navigation';
  const icon = isOpen ? <NoFoodIcon sx={sx} /> : <LunchDiningIcon sx={sx} />;
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

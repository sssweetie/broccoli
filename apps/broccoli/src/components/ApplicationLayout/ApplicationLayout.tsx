import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import NoFoodIcon from '@mui/icons-material/NoFood';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { LinkItem } from '../Link';

export const ApplicationLayout: React.FC = () => {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const onClick = () => setOpen((prevState) => !prevState);

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded, userId, navigate]);

  return (
    <main className="app-wrapper">
      <Navigation />
      <div className="content-wrapper">
        {isOpen ? (
          <nav className="navigation navigation--open">
            <div className="burger" onClick={onClick}>
              <NoFoodIcon sx={{ color: '#2a4365' }} />
            </div>
            <LinkItem Icon={DashboardIcon} isOpen={isOpen} title={'Boards'} />
            <LinkItem
              Icon={EditCalendarIcon}
              isOpen={isOpen}
              title={'Calendar'}
            />
          </nav>
        ) : (
          <nav className="navigation">
            <div className="burger" onClick={onClick}>
              <LunchDiningIcon sx={{ color: '#2a4365' }} />
            </div>
            <LinkItem Icon={DashboardIcon} isOpen={isOpen} title={'Boards'} />
            <LinkItem
              Icon={EditCalendarIcon}
              isOpen={isOpen}
              title={'Calendar'}
            />
          </nav>
        )}
        <div className="outlet-wrapper">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

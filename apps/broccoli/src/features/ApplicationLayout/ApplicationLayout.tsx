import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { NavBar } from '../NavBar';

export const ApplicationLayout = () => {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded]);

  return (
    <div className="app-wrapper">
      <NavBar />
      <div className="outlet-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

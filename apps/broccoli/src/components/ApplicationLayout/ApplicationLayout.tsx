import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';

export const ApplicationLayout = () => {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded]);

  return (
    <main className="app-wrapper">
      <Navigation />
      <div className="outlet-wrapper">
        <Outlet />
      </div>
    </main>
  );
};

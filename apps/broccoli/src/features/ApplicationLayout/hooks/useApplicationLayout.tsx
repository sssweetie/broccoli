import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoFoodIcon from '@mui/icons-material/NoFood';

import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { useModal } from 'apps/broccoli/src/hooks/useModal';

const sx = { color: '#2a4365' };

export const useApplicationLayout = () => {
  const { isLoaded, userId } = useAuth();
  const { isOpen, toggleModal } = useModal();
  const navigate = useNavigate();

  const className = isOpen ? 'navigation navigation--open' : 'navigation';
  const icon = isOpen ? <NoFoodIcon sx={sx} /> : <LunchDiningIcon sx={sx} />;

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded, userId, navigate]);

  return { icon, className, isOpen, onClick: toggleModal };
};

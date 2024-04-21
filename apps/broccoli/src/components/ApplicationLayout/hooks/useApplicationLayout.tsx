import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoFoodIcon from '@mui/icons-material/NoFood';

import LunchDiningIcon from '@mui/icons-material/LunchDining';

const sx = { color: '#2a4365' };

export const useApplicationLayout = () => {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const className = isOpen ? 'navigation navigation--open' : 'navigation';
  const icon = isOpen ? <NoFoodIcon sx={sx} /> : <LunchDiningIcon sx={sx} />;

  const onClick = () => setOpen((prevState) => !prevState);

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded, userId, navigate]);

  return { icon, className, isOpen, onClick };
};

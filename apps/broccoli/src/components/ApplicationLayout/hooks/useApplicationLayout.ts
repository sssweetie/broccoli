import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useApplicationLayout = () => {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const onClick = () => setOpen((prevState) => !prevState);

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded, userId, navigate]);

  return { isOpen, onClick };
};

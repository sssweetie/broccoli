import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthUser = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate('/application/boards');
    }
  }, [isLoaded, userId, navigate]);
};

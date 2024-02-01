import { SignIn, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignInPage = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoaded && userId) {
      navigate('/application');
    }
  }, [isLoaded, userId]);

  return (
    <>
      <SignIn afterSignInUrl={'/application'} />
      <Link to="/sign-up">Регистрация</Link>
    </>
  );
};

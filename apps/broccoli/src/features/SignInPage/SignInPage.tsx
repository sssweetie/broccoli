import { SignIn, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign-in-page.scss';

export const SignInPage = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate('/application');
    }
  }, [isLoaded, userId]);

  return (
    <article className="login">
      <SignIn afterSignInUrl='/application' signUpUrl="/sign-up" />
    </article>
  );
};

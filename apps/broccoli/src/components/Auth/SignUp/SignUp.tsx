import { SignUp as ClerkSignUp, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const SignUp = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate('/application');
    }
  }, [isLoaded, userId]);

  return (
    <article className="login">
      <ClerkSignUp afterSignUpUrl={'/application'} signInUrl="/sign-in" />
    </article>
  );
};

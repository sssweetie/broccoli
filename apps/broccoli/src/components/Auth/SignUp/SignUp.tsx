import { SignUp as ClerkSignUp, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const SignUp: React.FC = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate('/application/boards');
    }
  }, [isLoaded, userId, navigate]);

  return (
    <article className="login">
      <ClerkSignUp afterSignUpUrl={'/application'} signInUrl="/sign-in" />
    </article>
  );
};

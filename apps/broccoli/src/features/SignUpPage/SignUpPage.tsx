import { SignUp, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const SignUpPage = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate('/application');
    }
  }, [isLoaded, userId]);

  return (
    <article className="login">
      <SignUp afterSignUpUrl={'/application'} signInUrl="/sign-in" />
    </article>
  );
};

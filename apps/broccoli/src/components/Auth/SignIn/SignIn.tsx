import { SignIn as ClerkSignIn, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignIn: React.FC = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate('/application/boards');
    }
  }, [isLoaded, userId, navigate]);

  return (
    <article className="login">
      <ClerkSignIn afterSignInUrl="/application" signUpUrl="/sign-up" />
    </article>
  );
};

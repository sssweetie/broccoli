import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { useSignIn } from 'apps/broccoli/src/hooks/useSignIn';

export const SignUp: React.FC = () => {
  useSignIn();

  return (
    <article className="login">
      <ClerkSignUp afterSignUpUrl={'/application'} signInUrl="/sign-in" />
    </article>
  );
};

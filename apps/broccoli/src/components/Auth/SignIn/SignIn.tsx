import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { useSignIn } from 'apps/broccoli/src/hooks/useSignIn';
export const SignIn: React.FC = () => {
  useSignIn();

  return (
    <article className="login">
      <ClerkSignIn afterSignInUrl="/application" signUpUrl="/sign-up" />
    </article>
  );
};

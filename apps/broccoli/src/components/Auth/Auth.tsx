import { SignIn, SignUp } from '@clerk/clerk-react';
import { useAuthUser } from '../../hooks/useAuthUser';
import { FC } from 'react';

interface AuthProps {
  authType: 'sign-in' | 'sign-up';
}

export const Auth: FC<AuthProps> = ({ authType }) => {
  useAuthUser();

  return (
    <article className="login">
      {authType === 'sign-in' ? (
        <SignIn afterSignInUrl="/application" signUpUrl="/sign-up" />
      ) : (
        <SignUp afterSignUpUrl="/application" signInUrl="/sign-in" />
      )}
    </article>
  );
};

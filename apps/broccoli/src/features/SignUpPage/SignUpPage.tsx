import { SignUp } from '@clerk/clerk-react';

export const SignUpPage = () => {
  return <SignUp afterSignUpUrl={"/sign-in"}/>;
};

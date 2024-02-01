import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export const SignOut = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const onClick = () => signOut(() => navigate('/sign-in'));

  return <button onClick={onClick}>Sign out</button>;
};

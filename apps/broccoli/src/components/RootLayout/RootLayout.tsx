import { ClerkProvider } from '@clerk/clerk-react';
import { Outlet, useNavigate } from 'react-router-dom';

export const RootLayout = () => {
  const navigate = useNavigate();
  const PUBLISHABLE_KEY = process.env.NX_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error('Missing publishable Key');
  }

  return (
    <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
      <Outlet />
    </ClerkProvider>
  );
};

import { ClerkProvider } from '@clerk/clerk-react';
import { Outlet, useNavigate } from 'react-router-dom';

const PUBLISHABLE_KEY = process.env.NX_PUBLISHABLE_KEY;

export const RootLayout: React.FC = () => {
  const navigate = useNavigate();

  if (!PUBLISHABLE_KEY) {
    throw new Error('Missing publishable Key');
  }

  return (
    <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
      <Outlet />
    </ClerkProvider>
  );
};

import 'react-toastify/dist/ReactToastify.css';
import './sass/app.scss';

import * as ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './features/RootLayout';
import { DragDrop } from './features/DragDrop';
import { SignInPage } from './features/SignInPage';
import { SignUpPage } from './features/SignUpPage';
import { ApplicationLayout } from './features/ApplicationLayout';
import { NotFound } from './features/NotFound';
import { Welcome } from './features/Welcome';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Boards } from './features/Boards';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Welcome />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/application',
        element: <ApplicationLayout />,
        children: [
          {
            path: '/application/boards',
            element: <Boards />,
          },
          {
            path: '/application/dragdrop/:id',
            element: <DragDrop />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);

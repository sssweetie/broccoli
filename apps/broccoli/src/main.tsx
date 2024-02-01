import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './features/RootLayout';
import { Dashboard } from './features/Dashboard';
import { DragDrop } from './features/DragDrop';
import { DataTable } from './features/DataTable';
import { SignInPage } from './features/SignInPage';
import { SignUpPage } from './features/SignUpPage';
import { ApplicationLayout } from './features/ApplicationLayout';
import { NotFound } from './features/NotFound';
import './styles.scss'
import { Welcome } from './features/Welcome';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Welcome />
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
            path: '/application/dashboard',
            element: <Dashboard />,
          },
          {
            path: '/application/dragdrop',
            element: <DragDrop />,
          },
          {
            path: '/application/datatable',
            element: <DataTable />,
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
    <RouterProvider router={router} />
  </StrictMode>
);

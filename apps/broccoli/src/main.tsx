import 'react-toastify/dist/ReactToastify.css';
import './sass/app.scss';

import * as ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
import { ContentLayout } from './features/ContentLayout';
import { ApplicationLayout } from './components/ApplicationLayout';
import { PageNotFound } from './components/PageNotFound';
import { Hero } from './components/Hero';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Boards } from './features/Boards';
import { Calendar } from './features/Calendar/Calendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Auth } from './components/Auth';

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
        element: <Hero />,
      },
      {
        path: '/sign-in',
        element: <Auth authType="sign-in" />,
      },
      {
        path: '/sign-up',
        element: <Auth authType="sign-up" />,
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
            path: '/application/calendar',
            element: <Calendar />,
          },
          {
            path: '/application/dragdrop/:id',
            element: <ContentLayout />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </LocalizationProvider>
    </QueryClientProvider>
  </StrictMode>
);

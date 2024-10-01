import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Companies } from './components/companies/mobile';
import { ThemeProvider } from './contexts/theme/provider';
import { CompanyAssets } from './pages/company-assets';
import { Home } from './pages/home';
import { Layout } from './pages/layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/tree-view/',
        element: <Home />,
      },
      {
        path: '/tree-view/companies',
        element: <Companies />,
      },
      {
        path: '/tree-view/company-assets',
        element: <CompanyAssets />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

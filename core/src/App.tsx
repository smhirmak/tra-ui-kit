import './App.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { useEffect } from 'react';
import { printTraSignature } from './utilities/tra-signature';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  useEffect(() => {
    printTraSignature();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;

import { Outlet } from '@tanstack/react-router';
import { VersionProvider } from '@/contexts/version';
import Header from './Header';
import Footer from './Footer';

const Layout = () => (
  <VersionProvider>
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-9999 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  </VersionProvider>
);

export default Layout;

import { Outlet } from 'react-router-dom';
import { VersionProvider } from '@/contexts/version';
import Header from './Header';
import Footer from './Footer';

const Layout = () => (
  <VersionProvider>
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  </VersionProvider>
);

export default Layout;

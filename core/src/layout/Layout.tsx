import Container from '@/components/Container';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';

const Layout = () => (
  <div className="flex flex-row">
    <SideBar />
    <div className="flex min-h-screen w-full flex-col">
      <Container maxWidth="full" disableGutters className="px-0">
        <Header />
        <div className="grow px-2">
          <Outlet />
        </div>
      </Container>
    </div>
  </div>
);

export default Layout;

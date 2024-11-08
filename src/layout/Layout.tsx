import { Outlet } from 'react-router-dom/dist';
import Container from '@/components/Container';
import Header from './Header';
import SideBar from './SideBar';

const Layout = () => (
  <div className="flex flex-row">
    <SideBar />
    <div className="ml-36 flex min-h-screen w-full flex-col">
      <Header />
      <div className="grow pl-2">
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </div>
    </div>
  </div>
);

export default Layout;

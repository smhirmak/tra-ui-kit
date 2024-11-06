import { Link, Outlet, useLocation } from 'react-router-dom/dist';
import Container from '@/components/Container';
import Header from './Header';

const sidebarList = [
  // {
  //   label: 'Home',
  //   link: '/',
  // },
  {
    label: 'Syntax Highlighter Block',
    link: '/syntax-highlighter',
  },
  {
    label: 'Avatar',
    link: '/avatar',
  },
  {
    label: 'Badge',
    link: '/badge',
  },
  {
    label: 'Button',
    link: '/button',
  },
  {
    label: 'Checkbox',
    link: '/checkbox',
  },
  {
    label: 'Chip',
    link: '/chip',
  },
  {
    label: 'Information Status',
    link: '/information-status',
  },
  {
    label: 'Loader',
    link: '/loader',
  },
  {
    label: 'Text Field',
    link: '/text-field',
  },
  {
    label: 'Notification',
    link: '/notification',
  },
  {
    label: 'Radio Button',
    link: '/radio-button',
  },
  {
    label: 'Search Bar',
    link: '/search-bar',
  },
  {
    label: 'Skeleton',
    link: '/skeleton',
  },
  {
    label: 'Switch',
    link: '/switch',
  },
  {
    label: 'Tabs',
    link: '/tabs',
  },
  {
    label: 'Background Video',
    link: '/background-video',
  },
  {
    label: 'Image Hover Effect',
    link: '/image-hover-effect',
  },
];

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-row">
      <div className="fixed left-0 top-0 flex max-h-screen min-h-screen min-w-36 flex-col overflow-y-auto bg-tra-background p-4">
        {sidebarList.sort((a, b) => a.label.localeCompare(b.label)).map(e => (
          <>
            <Link to={e.link} className={`rounded-md  py-2 transition-colors duration-100  hover:bg-tra-primary-5 ${location.pathname === e.link && 'bg-tra-primary/10 text-tra-primary'}`}>{e.label}</Link>
            <span className="h-1 w-full border-b-2 border-tra-primary-15 last:border-b-0" />
          </>
        ))}
      </div>
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
};

export default Layout;

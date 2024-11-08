import { Link, useLocation } from 'react-router-dom';

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

const SideBar = () => {
  const location = useLocation();
  return (
<<<<<<< HEAD
    <div className="sticky left-0 top-0 flex max-h-screen min-h-screen min-w-36 flex-col overflow-y-auto bg-tra-background p-4">
      <p className="text-xl font-semibold underline underline-offset-auto">Components</p>
=======
    <div className="fixed left-0 top-0 flex max-h-screen min-h-screen min-w-36 flex-col overflow-y-auto bg-tra-background p-4">
>>>>>>> edit-notification-compoents
      {sidebarList.sort((a, b) => a.label.localeCompare(b.label)).map(e => (
        <>
          <Link to={e.link} className={`mt-1 rounded-t-md p-2 transition-colors duration-100  hover:bg-tra-primary-5 ${location.pathname === e.link && 'bg-tra-primary/10 text-tra-primary'}`}>
            {e.label}
          </Link>
          <span className="h-1 w-full border-b-2 border-tra-primary-15 last:border-b-0" />
        </>
      ))}
    </div>
  );
};

export default SideBar;

import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import Home from './pages/Home';
import BackToTopButton from './components/BackToTopButton';
import SyntaxHighlighterBlock from './pages/components/SyntaxHighlighterBlock';
import AvatarPage from './pages/components/AvatarPage';
import BadgePage from './pages/components/BadgePage';
import ButtonPage from './pages/components/ButtonPage';
import CheckboxPage from './pages/components/CheckBoxPage';
import ChipPage from './pages/components/ChipPage';
import InformationStatusPage from './pages/components/InformationStatusPage';
import LoaderPage from './pages/components/LoaderPage';
import TextFieldPage from './pages/components/TextFieldPage';
import NotificationPage from './pages/components/NotificationPage';
import RadioButtonPage from './pages/components/RadioButtonPage';
import SearchBarPage from './pages/components/SearchBarPage';
import SkeletonPage from './pages/components/SkeletonPage';
import SwitchPage from './pages/components/SwitchPage';
import TabsPage from './pages/components/TabsPage';
import BackgroundVideoPage from './pages/components/BackgroundVideoPage';
import ImageHoverEffectPage from './pages/components/ImageHoverEffectPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'syntax-highlighter',
        element: <SyntaxHighlighterBlock />,
      },
      {
        path: 'avatar',
        element: <AvatarPage />,
      },
      {
        path: 'badge',
        element: <BadgePage />,
      },
      {
        path: 'button',
        element: <ButtonPage />,
      },
      {
        path: 'checkbox',
        element: <CheckboxPage />,
      },
      {
        path: 'chip',
        element: <ChipPage />,
      },
      {
        path: 'information-status',
        element: <InformationStatusPage />,
      },
      {
        path: 'loader',
        element: <LoaderPage />,
      },
      {
        path: 'text-field',
        element: <TextFieldPage />,
      },
      {
        path: 'notification',
        element: <NotificationPage />,
      },
      {
        path: 'radio-button',
        element: <RadioButtonPage />,
      },
      {
        path: 'search-bar',
        element: <SearchBarPage />,
      },
      {
        path: 'skeleton',
        element: <SkeletonPage />,
      },
      {
        path: 'switch',
        element: <SwitchPage />,
      },
      {
        path: 'tabs',
        element: <TabsPage />,
      },
      {
        path: 'background-video',
        element: <BackgroundVideoPage />,
      },
      {
        path: 'image-hover-effect',
        element: <ImageHoverEffectPage />,
      },
    ],
  }]);

const App = () => (
  <div>
    {/* <ToastContainer newestOnTop toastClassName="rounded-lg" bodyStyle={{ fontSize: '.9rem' }} theme="colored" /> */}
    <RouterProvider router={router} />
    <BackToTopButton />
  </div>
);

export default App;

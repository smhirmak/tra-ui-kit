import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import BackToTopButton from './components/back-to-top-button';
import AvatarPage from './pages/components/AvatarPage';
import BadgePage from './pages/components/BadgePage';
import ButtonPage from './pages/components/ButtonPage';
import CheckboxPage from './pages/components/CheckboxPage';
import ChipPage from './pages/components/ChipPage';
import InformationStatusPage from './pages/components/InformationStatusPage';
import LoaderPage from './pages/components/LoaderPage';
import NotificationPage from './pages/components/NotificationPage';
import RadioButtonPage from './pages/components/RadioButtonPage';
import SearchFieldPage from './pages/components/SearchFieldPage';
import SkeletonPage from './pages/components/SkeletonPage';
import SwitchPage from './pages/components/SwitchPage';
import TabsPage from './pages/components/TabsPage';
import ImageHoverEffectPage from './pages/components/ImageHoverEffectPage';
import { NotificationProvider } from './contexts/notification/NotificationProvider';
import { useLocalizeContext } from './contexts/locale/LocalizeContext';
import { useAppContext } from './contexts/app/AppProvider';
import AccordionPage from './pages/components/AccordionPage';
import SelectPage from './pages/components/SelectPage';
import TextFieldFilledPage from './pages/components/TextFieldFilledPage';
import TextFieldOutlinedPage from './pages/components/TextFieldOutlinedPage';
import TextFieldUnderlinedPage from './pages/components/TextFieldUnderlinedPage';
import TextFieldFilledUnderlinedPage from './pages/components/TextFieldFilledUnderlinedPage';
import TooltipPage from './pages/components/TooltipPage';
import DatePickerPage from './pages/components/DatePickerPage';
import PopoverPage from './pages/components/PopoverPage';
import DialogPage from './pages/components/DialogPage';
import DrawerPage from './pages/components/DrawerPage';
import PaginationPage from './pages/components/PaginationPage';
import TablePage from './pages/components/TablePage';
import ProgressBarPage from './pages/components/ProgressBarPage';
import SidebarPage from './pages/components/SidebarPage';
import Installation from './pages/installation';
import DropdownPage from './pages/components/DropdownPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'installation',
        element: <Installation />,
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
        // element: <TextFieldPage />,
        children: [
          {
            path: 'filled',
            element: <TextFieldFilledPage />,
          },
          {
            path: 'outlined',
            element: <TextFieldOutlinedPage />,
          },
          {
            path: 'underlined',
            element: <TextFieldUnderlinedPage />,
          },
          {
            path: 'filled-underlined',
            element: <TextFieldFilledUnderlinedPage />,
          },
        ],
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
        path: 'search-field',
        element: <SearchFieldPage />,
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
        path: 'image-hover-effect',
        element: <ImageHoverEffectPage />,
      },
      {
        path: 'accordion',
        element: <AccordionPage />,
      },
      {
        path: 'select',
        element: <SelectPage />,
      },
      {
        path: 'tooltip',
        element: <TooltipPage />,
      },
      {
        path: 'date-picker',
        element: <DatePickerPage />,
      },
      {
        path: 'popover',
        element: <PopoverPage />,
      },
      {
        path: 'dialog',
        element: <DialogPage />,
      },
      {
        path: 'drawer',
        element: <DrawerPage />,
      },
      {
        path: 'pagination',
        element: <PaginationPage />,
      },
      {
        path: 'table',
        element: <TablePage />,
      },
      {
        path: 'progress-bar',
        element: <ProgressBarPage />,
      },
      {
        path: 'sidebar',
        element: <SidebarPage />,
      },
      {
        path: 'dropdown',
        element: <DropdownPage />,
      },
    ],
  }]);

const App = () => {
  const { t } = useLocalizeContext();
  const { notificationTheme, notificationMode, notificationAnimateMode, notificationPosition } = useAppContext();
  return (
    <NotificationProvider
      newestTop
      closeIcon
      translateFunction={t}
      theme={notificationTheme}
      mode={notificationMode}
      animationMode={notificationAnimateMode}
      position={notificationPosition}
    >
      <div>
        <RouterProvider router={router} />
        <BackToTopButton />
      </div>
    </NotificationProvider>
  );
};

export default App;

import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import VersionRedirect from './components/version-redirect';
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
import SearchFieldPage from './pages/components/SearchFieldPage';
import TabsPage from './pages/components/TabsPage';
import ImageHoverEffectPage from './pages/components/ImageHoverEffectPage';
import { NotificationProvider } from './contexts/notification/NotificationProvider';
import { useLocalizeContext } from './contexts/locale/LocalizeContext';
import { useAppContext } from './contexts/app/AppProvider';
import { TOCProvider } from './contexts/toc/TOCContext';
import AccordionPage from './pages/components/AccordionPage';
import TextFieldPage from './pages/components/TextFieldPage';
import DatePickerPage from './pages/components/DatePickerPage';
import PopoverPage from './pages/components/PopoverPage';
import DialogPage from './pages/components/DialogPage';
import DrawerPage from './pages/components/DrawerPage';
import PaginationPage from './pages/components/PaginationPage';
import SidebarPage from './pages/components/SidebarPage';
import Installation from './pages/installation';
import DropdownPage from './pages/components/DropdownPage';
import ComponentsOverview from './pages/ComponentsOverview';
import CalendarPage from './pages/components/CalendarPage';
import ProgressBarPage from './pages/components/ProgressBarPage';
import TablePage from './pages/components/TablePage';
import RadioButtonPage from './pages/components/RadioButtonPage';
import SkeletonPage from './pages/components/SkeletonPage';
import SwitchPage from './pages/components/SwitchPage';
import SelectPage from './pages/components/SelectPage';
import TooltipPage from './pages/components/TooltipPage';
import ComponentLayout from './layout/ComponentLayout';
import InputPage from './pages/components/InputPage';
import LabelPage from './pages/components/LabelPage';
import ContainerPage from './pages/components/ContainerPage';
import LoadingSpinnerPage from './pages/components/LoadingSpinnerPage';
import LoadingLinearPage from './pages/components/LoadingLinearPage';
import ThemeModeTogglePage from './pages/components/ThemeModeTogglePage';
import BackToTopButtonPage from './pages/components/BackToTopButtonPages';
import { useEffect } from 'react';
import { printTraSignature } from './utilities/tra-signature';

const router = createBrowserRouter([
  {
    path: '/', element: <VersionRedirect />,
  },
  {
    path: '/:version', element: <Layout />,
    children: [
      {
        index: true, element: <Home />,
      },
      {
        path: 'installation', element: <Installation />,
      },
      {
        path: 'components', element: <ComponentsOverview />,
      },
      {
        path: 'components', element: <ComponentLayout />,
        children: [
          {
            path: 'avatar', element: <AvatarPage />,
          },
          {
            path: 'badge', element: <BadgePage />,
          },
          {
            path: 'button', element: <ButtonPage />,
          },
          {
            path: 'checkbox', element: <CheckboxPage />,
          },
          {
            path: 'chip', element: <ChipPage />,
          },
          {
            path: 'calendar', element: <CalendarPage />,
          },
          {
            path: 'information-status', element: <InformationStatusPage />,
          },
          {
            path: 'loader', element: <LoaderPage />,
          },
          {
            path: 'loading-linear', element: <LoadingLinearPage />,
          },
          {
            path: 'loading-spinner', element: <LoadingSpinnerPage />,
          },
          {
            path: 'text-field', element: <TextFieldPage />,
          },
          {
            path: 'notification', element: <NotificationPage />,
          },
          {
            path: 'radio-button', element: <RadioButtonPage />,
          },
          {
            path: 'search-field', element: <SearchFieldPage />,
          },
          {
            path: 'skeleton', element: <SkeletonPage />,
          },
          {
            path: 'switch', element: <SwitchPage />,
          },
          {
            path: 'tabs', element: <TabsPage />,
          },
          {
            path: 'image-hover-effect', element: <ImageHoverEffectPage />,
          },
          {
            path: 'accordion', element: <AccordionPage />,
          },
          {
            path: 'select', element: <SelectPage />,
          },
          {
            path: 'input', element: <InputPage />,
          },
          {
            path: 'label', element: <LabelPage />,
          },
          {
            path: 'container', element: <ContainerPage />,
          },
          {
            path: 'tooltip', element: <TooltipPage />,
          },
          {
            path: 'date-picker', element: <DatePickerPage />,
          },
          {
            path: 'popover', element: <PopoverPage />,
          },
          {
            path: 'dialog', element: <DialogPage />,
          },
          {
            path: 'drawer', element: <DrawerPage />,
          },
          {
            path: 'pagination', element: <PaginationPage />,
          },
          {
            path: 'table', element: <TablePage />,
          },
          {
            path: 'progress-bar', element: <ProgressBarPage />,
          },
          {
            path: 'sidebar', element: <SidebarPage />,
          },
          {
            path: 'dropdown', element: <DropdownPage />,
          },
          {
            path: 'theme-mode-toggle', element: <ThemeModeTogglePage />,
          },
          {
            path: 'back-to-top-button', element: <BackToTopButtonPage />,
          },
        ]
      },
    ],
  }]);

const App = () => {
  const { t } = useLocalizeContext();
  const { notificationTheme, notificationMode, notificationAnimateMode, notificationPosition } = useAppContext();

  useEffect(() => {
    printTraSignature();
    // printMsiSignature();
  }, []);

  return (
    <TOCProvider>
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
    </TOCProvider>
  );
};

export default App;

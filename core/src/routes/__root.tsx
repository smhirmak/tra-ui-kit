import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { TOCProvider } from '@/contexts/toc/TOCContext';
import { NotificationProvider } from '@/contexts/notification/NotificationProvider';
import BackToTopButton from '@/components/ui/back-to-top-button';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useAppContext } from '@/contexts/app/AppProvider';

const RootComponent = () => {
  const { t } = useLocalizeContext();
  const { notificationTheme, notificationMode, notificationAnimateMode, notificationPosition } =
    useAppContext();

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
        <Outlet />
        <BackToTopButton />
        {import.meta.env.DEV && (
          <TanStackDevtools
            plugins={[
              {
                name: 'TanStack Router',
                render: <TanStackRouterDevtools />,
              },
            ]}
          />
        )}
      </NotificationProvider>
    </TOCProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});

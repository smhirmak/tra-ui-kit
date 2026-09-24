import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';

const siteName = 'TRA UI Kit';

const routeTitles: Record<string, string> = {
  'ui-base': 'TRA UI Base',
  i18n: 'i18n',
  signalr: 'SignalR',
  'radio-button': 'Radio Buttons',
  'text-field': 'TextField',
};

const formatRouteTitle = (slug: string) =>
  routeTitles[slug] ||
  slug
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');

const DynamicPageTitle = () => {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { locale, t } = useLocalizeContext();

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    const pageSlug = segments.length > 1 ? segments[segments.length - 1] : '';
    const pageTitle = pageSlug ? t(formatRouteTitle(pageSlug)) : '';

    document.title = pageTitle && pageTitle !== siteName ? `${pageTitle} | ${siteName}` : siteName;
  }, [locale, pathname, t]);

  return null;
};

export default DynamicPageTitle;

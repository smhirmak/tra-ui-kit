import { createFileRoute } from '@tanstack/react-router';
import I18nPluginPage from '@/pages/plugins/I18nPluginPage';

export const Route = createFileRoute('/$version/plugins/_sidebar/i18n')({
  component: I18nPluginPage,
});

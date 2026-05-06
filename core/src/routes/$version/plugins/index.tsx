import { createFileRoute } from '@tanstack/react-router';
import PluginsOverview from '@/pages/plugins/PluginsOverview';

export const Route = createFileRoute('/$version/plugins/')({
  component: PluginsOverview,
});

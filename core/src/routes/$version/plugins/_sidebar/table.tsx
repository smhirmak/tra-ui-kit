import { createFileRoute } from '@tanstack/react-router';
import TablePluginPage from '@/pages/plugins/TablePluginPage';

export const Route = createFileRoute('/$version/plugins/_sidebar/table')({
  component: TablePluginPage,
});

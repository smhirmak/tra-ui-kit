import { createFileRoute } from '@tanstack/react-router';
import AxiosPluginPage from '@/pages/plugins/AxiosPluginPage';

export const Route = createFileRoute('/$version/plugins/_sidebar/axios')({
  component: AxiosPluginPage,
});

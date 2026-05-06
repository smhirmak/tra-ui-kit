import { createFileRoute } from '@tanstack/react-router';
import FormsPluginPage from '@/pages/plugins/FormsPluginPage';

export const Route = createFileRoute('/$version/plugins/_sidebar/forms')({
  component: FormsPluginPage,
});

import { createFileRoute } from '@tanstack/react-router';
import TabsPage from '@/pages/components/TabsPage';

export const Route = createFileRoute('/$version/components/_sidebar/tabs')({
  component: TabsPage,
});

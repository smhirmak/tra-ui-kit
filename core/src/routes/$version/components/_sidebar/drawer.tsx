import { createFileRoute } from '@tanstack/react-router';
import DrawerPage from '@/pages/components/DrawerPage';

export const Route = createFileRoute('/$version/components/_sidebar/drawer')({
  component: DrawerPage,
});

import { createFileRoute } from '@tanstack/react-router';
import SidebarPage from '@/pages/components/SidebarPage';

export const Route = createFileRoute('/$version/components/_sidebar/sidebar')({
  component: SidebarPage,
});

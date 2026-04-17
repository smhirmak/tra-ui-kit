import { createFileRoute } from '@tanstack/react-router';
import SwitchPage from '@/pages/components/SwitchPage';

export const Route = createFileRoute('/$version/components/_sidebar/switch')({
  component: SwitchPage,
});

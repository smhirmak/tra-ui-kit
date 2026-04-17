import { createFileRoute } from '@tanstack/react-router';
import TooltipPage from '@/pages/components/TooltipPage';

export const Route = createFileRoute('/$version/components/_sidebar/tooltip')({
  component: TooltipPage,
});
